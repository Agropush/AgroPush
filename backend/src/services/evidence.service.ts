import axios from "axios";
import { PrismaClient } from "@prisma/client";
import { prisma as defaultPrisma } from "../lib/db";
import { IPFSService, ServiceUnavailableError } from "./ipfs.service";

export class EvidenceAccessDeniedError extends Error {
    status = 403;
    constructor() {
        super("Access denied: you are not a party to this trade");
        this.name = "EvidenceAccessDeniedError";
    }
}

export class EvidenceTradeNotFoundError extends Error {
    status = 404;
    constructor() {
        super("Trade not found");
        this.name = "EvidenceTradeNotFoundError";
    }
}

export class EvidenceValidationError extends Error {
    status = 400;
    constructor(message = "Invalid evidence file") {
        super(message);
        this.name = "EvidenceValidationError";
    }
}

export class EvidenceScanError extends Error {
    status = 503;
    constructor(message = "Evidence scan service unavailable") {
        super(message);
        this.name = "EvidenceScanError";
    }
}

export interface EvidenceScanResult {
    clean: boolean;
    reason?: string;
}

export interface EvidenceScanner {
    scan(file: Express.Multer.File): Promise<EvidenceScanResult>;
}

class NoopEvidenceScanner implements EvidenceScanner {
    async scan(): Promise<EvidenceScanResult> {
        return { clean: true };
    }
}

type EvidenceDatabase = {
    trade: Pick<PrismaClient["trade"], "findUnique">;
    tradeEvidence: Pick<PrismaClient["tradeEvidence"], "findMany" | "create">;
};

export class EvidenceService {
    private ipfs: IPFSService;
    private scanner: EvidenceScanner;
    /** In-process cache: CID → resolved gateway URL */
    private readonly urlCache = new Map<string, string>();

    constructor(
        private readonly prisma: EvidenceDatabase = defaultPrisma as unknown as EvidenceDatabase,
        ipfs?: IPFSService,
        scanner?: EvidenceScanner,
    ) {
        this.ipfs = ipfs ?? new IPFSService();
        this.scanner = scanner ?? new NoopEvidenceScanner();
    }

    /** Return all evidence records for a trade. Caller must be buyer or seller. */
    async getEvidenceByTradeId(tradeId: string, callerAddress: string) {
        const trade = await this.prisma.trade.findUnique({
            where: { tradeId },
        });

        if (!trade) throw new EvidenceTradeNotFoundError();

        const caller = callerAddress.toLowerCase();
        if (
            trade.buyerAddress.toLowerCase() !== caller &&
            trade.sellerAddress.toLowerCase() !== caller
        ) {
            throw new EvidenceAccessDeniedError();
        }

        const records = await this.prisma.tradeEvidence.findMany({
            where: { tradeId },
            orderBy: { createdAt: "asc" },
        });

        return records.map((r) => ({
            id: r.id,
            cid: r.cid,
            filename: r.filename,
            mimeType: r.mimeType,
            uploadedBy: r.uploadedBy,
            url: this.resolveGatewayUrl(r.cid),
            createdAt: r.createdAt,
        }));
    }

    /**
     * Upload a video file to IPFS and persist the evidence record.
     * Caller must be buyer or seller of the referenced trade.
     */
    async uploadVideoEvidence(
        tradeId: string,
        callerAddress: string,
        file: Express.Multer.File,
    ) {
        const trade = await this.prisma.trade.findUnique({ where: { tradeId } });
        if (!trade) throw new EvidenceTradeNotFoundError();

        const caller = callerAddress.toLowerCase();
        if (
            trade.buyerAddress.toLowerCase() !== caller &&
            trade.sellerAddress.toLowerCase() !== caller
        ) {
            throw new EvidenceAccessDeniedError();
        }

        // Validate declared mime type
        const allowed = ["video/mp4", "video/webm"];
        if (!allowed.includes(file.mimetype)) {
            throw new EvidenceValidationError("Unsupported file type");
        }

        // Validate mime by magic bytes to prevent spoofed content-type uploads.
        const sniffed = this.sniffMimeType(file.buffer);
        if (!sniffed || sniffed !== file.mimetype) {
            throw new EvidenceValidationError("File content does not match declared MIME type");
        }

        // Enforce configurable size limit (default 50MB)
        const size = (file as any).size ?? file.buffer.length;
        const MAX = parseInt(process.env.EVIDENCE_MAX_BYTES || "52428800", 10);
        if (size > MAX) {
            throw new EvidenceValidationError("File too large");
        }

        const scan = await this.runEvidenceScan(file);
        if (!scan.clean) {
            throw new EvidenceValidationError(scan.reason || "Evidence blocked by malware scanner");
        }

        const cid = await this.ipfs.uploadFile(file.buffer, file.originalname);

        const record = await this.prisma.tradeEvidence.create({
            data: {
                tradeId,
                cid,
                filename: file.originalname,
                mimeType: file.mimetype,
                uploadedBy: caller,
            },
        });

        return {
            evidenceId: record.id,
            cid,
            ipfsUrl: this.resolveGatewayUrl(cid),
        };
    }

    /**
     * Proxy-stream a file from the IPFS gateway with optional Range support.
     * Returns an axios response stream so the route can pipe it.
     */
    async streamFromIPFS(cid: string, range?: string) {
        // Build list of gateway base URLs to try. Prefer explicit env var list.
        const env = process.env.IPFS_GATEWAY_URLS;
        const urls: string[] = [];
        if (env) {
            for (const g of env.split(",")) {
                const base = g.trim();
                if (base) urls.push(`${base.replace(/\/$/, "")}/${cid}`);
            }
        } else {
            urls.push(this.resolveGatewayUrl(cid));
        }

        const headers: Record<string, string> = {};
        if (range) headers["Range"] = range;

        let lastError: any = null;
        for (const url of urls) {
            try {
                const response = await axios.get(url, {
                    responseType: "stream",
                    headers,
                    validateStatus: (s) => s < 500,
                });
                return response;
            } catch (err) {
                lastError = err;
            }
        }

        throw new ServiceUnavailableError();
    }

    /** Resolve and cache the public gateway URL for a CID. */
    private resolveGatewayUrl(cid: string): string {
        if (this.urlCache.has(cid)) {
            return this.urlCache.get(cid)!;
        }
        const url = this.ipfs.getFileUrl(cid);
        this.urlCache.set(cid, url);
        return url;
    }

    private sniffMimeType(buffer: Buffer): "video/mp4" | "video/webm" | null {
        // MP4: bytes 4-7 should contain 'ftyp' marker in ISO BMFF containers.
        if (buffer.length >= 12 && buffer.subarray(4, 8).toString("ascii") === "ftyp") {
            return "video/mp4";
        }

        // WebM: EBML header starts with 0x1A45DFA3.
        if (
            buffer.length >= 4 &&
            buffer[0] === 0x1a &&
            buffer[1] === 0x45 &&
            buffer[2] === 0xdf &&
            buffer[3] === 0xa3
        ) {
            return "video/webm";
        }

        return null;
    }

    private async runEvidenceScan(file: Express.Multer.File): Promise<EvidenceScanResult> {
        const required = String(process.env.EVIDENCE_SCAN_REQUIRED || "false").toLowerCase() === "true";
        try {
            return await this.scanner.scan(file);
        } catch (error) {
            if (!required) {
                return { clean: true };
            }
            throw new EvidenceScanError(
                error instanceof Error ? error.message : "Evidence scan service unavailable",
            );
        }
    }
}
