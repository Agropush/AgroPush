"use client";

import { useMemo, useState } from "react";
import {
  Address,
  BASE_FEE,
  Contract,
  Networks,
  TransactionBuilder,
  nativeToScVal,
  rpc,
} from "@stellar/stellar-sdk";
import { signTransaction } from "@stellar/freighter-api";

import { useFreighterIdentity } from "@/hooks/useFreighterIdentity";

type Props = { disputeId: string };

const DEFAULT_MEDIATOR_ADDRESSES = ["GEXAMPLEMEDIATORPUBLICKEY1"];

const PINATA_GATEWAYS = [
  process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL?.trim(),
  "https://gateway.pinata.cloud/ipfs",
  "https://ipfs.io/ipfs",
].filter((value): value is string => Boolean(value));

const DEFAULT_NETWORK_PASSPHRASE = Networks.TESTNET;

export default function MediatorPanelClient({ disputeId }: Props) {
  const { address, isAuthorized, isLoading, connectWallet } =
    useFreighterIdentity();
  const [execString, setExecString] = useState<string>("");
  const [txStatus, setTxStatus] = useState<string>("");
  const [isSubmittingTx, setIsSubmittingTx] = useState(false);
  const [activeGatewayIndex, setActiveGatewayIndex] = useState(0);

  const mediatorAddresses = useMemo(() => {
    const fromEnv = (process.env.NEXT_PUBLIC_MEDIATOR_WALLETS ?? "")
      .split(",")
      .map((entry) => entry.trim())
      .filter(Boolean);

    return fromEnv.length > 0 ? fromEnv : DEFAULT_MEDIATOR_ADDRESSES;
  }, []);

  const isMediator = Boolean(address && mediatorAddresses.includes(address));

  const cid = disputeId || "QmExampleCidForDemo";
  const pinataUrl = `${PINATA_GATEWAYS[activeGatewayIndex]}/${cid}`;

  function buildExec(split: string) {
    const s = `soroban://execute?cmd=resolve_dispute&split=${split}&dispute=${disputeId}`;
    setExecString(s);
  }

  async function executeResolution(sellerGetsBps: number) {
    if (!address) {
      setTxStatus("Connect Freighter first.");
      return;
    }

    const parsedTradeId = Number(disputeId);
    if (!Number.isInteger(parsedTradeId) || parsedTradeId < 0) {
      setTxStatus("Dispute ID must be a numeric on-chain trade_id.");
      return;
    }

    const contractId = process.env.NEXT_PUBLIC_CONTRACT_ID?.trim();
    const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL?.trim();

    if (!contractId || !rpcUrl) {
      setTxStatus("Missing NEXT_PUBLIC_CONTRACT_ID or NEXT_PUBLIC_RPC_URL.");
      return;
    }

    setIsSubmittingTx(true);
    setTxStatus("Preparing Soroban transaction...");

    try {
      const networkPassphrase =
        process.env.NEXT_PUBLIC_STELLAR_NETWORK === "public"
          ? Networks.PUBLIC
          : DEFAULT_NETWORK_PASSPHRASE;

      const rpcServer = new rpc.Server(rpcUrl);
      const source = await rpcServer.getAccount(address);
      const contract = new Contract(contractId);

      const tx = new TransactionBuilder(source, {
        fee: BASE_FEE,
        networkPassphrase,
      })
        .addOperation(
          contract.call(
            "resolve_dispute",
            nativeToScVal(BigInt(parsedTradeId), { type: "u64" }),
            Address.fromString(address).toScVal(),
            nativeToScVal(sellerGetsBps, { type: "u32" }),
          ),
        )
        .setTimeout(180)
        .build();

      const prepared = await rpcServer.prepareTransaction(tx);
      const signResult = await signTransaction(prepared.toXDR(), {
        networkPassphrase,
        address,
      });

      if (signResult.error) {
        throw new Error(signResult.error.message ?? "Freighter signing failed");
      }

      const signedTx = TransactionBuilder.fromXDR(
        signResult.signedTxXdr,
        networkPassphrase,
      );

      const sendResponse = await rpcServer.sendTransaction(signedTx);
      if (sendResponse.status === "ERROR") {
        throw new Error(
          typeof sendResponse.errorResult === "string"
            ? sendResponse.errorResult
            : JSON.stringify(
                sendResponse.errorResult ?? "Transaction rejected by RPC",
              ),
        );
      }

      setTxStatus(`Submitted. Hash: ${sendResponse.hash}`);
    } catch (error) {
      setTxStatus(
        error instanceof Error ? error.message : "Soroban execution failed",
      );
    } finally {
      setIsSubmittingTx(false);
    }
  }

  return (
    <div className="min-h-screen p-6 bg-bg-primary text-text-primary">
      <div className="max-w-6xl mx-auto grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-7">
          <div className="rounded-xl overflow-hidden shadow-modal bg-bg-card p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h4 className="text-xl font-semibold">Evidence</h4>
                <p className="text-sm text-text-secondary mt-1">
                  Video evidence supplied via IPFS / Pinata
                </p>
              </div>
              <div className="text-sm text-text-secondary text-right">
                <div>
                  Dispute ID: <span className="font-medium">{disputeId}</span>
                </div>
                <div className="mt-1">
                  Gateway:{" "}
                  <span className="font-medium">
                    {PINATA_GATEWAYS[activeGatewayIndex]}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 bg-black rounded-lg overflow-hidden aspect-video">
              <video
                controls
                className="w-full h-full object-contain bg-black"
                src={pinataUrl}
                onError={() => {
                  if (activeGatewayIndex < PINATA_GATEWAYS.length - 1) {
                    setActiveGatewayIndex((prev) => prev + 1);
                  }
                }}
              />
            </div>

            <div className="mt-3 flex items-center justify-between text-sm text-text-secondary">
              <div>
                Pinata CID:{" "}
                <span className="font-mono text-xs text-text-secondary">
                  {cid}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className={`px-2 py-1 rounded ${isMediator ? "bg-status-success text-text-inverse" : "bg-red-50 text-red-700"}`}
                >
                  {isMediator ? "Mediator access" : "Not a mediator"}
                </div>
                <button
                  onClick={() =>
                    setActiveGatewayIndex(
                      (prev) => (prev + 1) % PINATA_GATEWAYS.length,
                    )
                  }
                  className="px-3 py-1 bg-bg-elevated text-text-primary rounded text-sm"
                >
                  Switch Gateway
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-5">
          <div className="bg-bg-card rounded-xl shadow-md p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold">Mediator Resolution</h3>
                <p className="text-sm text-text-secondary mt-1">
                  Resolve dispute on-chain with a chosen payout split.
                </p>
              </div>
            </div>

            {!isAuthorized && (
              <button
                onClick={() => void connectWallet()}
                disabled={isLoading}
                className="w-full rounded-md bg-gold text-text-inverse py-2 font-medium"
              >
                {isLoading ? "Connecting..." : "Connect Freighter"}
              </button>
            )}

            {!isMediator && (
              <div className="rounded-md border border-border-default bg-red-50 text-red-700 text-sm p-3">
                Unauthorized wallet. Access is restricted to mediator addresses.
              </div>
            )}

            <div className="space-y-3">
              <div className="flex gap-3">
                <button
                  disabled={!isMediator || isSubmittingTx}
                  onClick={() => buildExec("50-50")}
                  className="flex-1 rounded-md border border-border-default px-3 py-2 text-sm disabled:opacity-50"
                >
                  Build 50/50
                </button>
                <button
                  disabled={!isMediator || isSubmittingTx}
                  onClick={() => buildExec("70-30")}
                  className="flex-1 rounded-md border border-border-default px-3 py-2 text-sm disabled:opacity-50"
                >
                  Build 70/30
                </button>
              </div>

              <div className="flex gap-3">
                <button
                  disabled={!isMediator || isSubmittingTx}
                  onClick={() => void executeResolution(5000)}
                  className="flex-1 rounded-md bg-gold text-text-inverse px-3 py-2 font-semibold disabled:opacity-50"
                >
                  Resolve 50/50 On‑Chain
                </button>
                <button
                  disabled={!isMediator || isSubmittingTx}
                  onClick={() => void executeResolution(7000)}
                  className="flex-1 rounded-md bg-emerald text-text-inverse px-3 py-2 font-semibold disabled:opacity-50"
                >
                  Resolve 70/30 On‑Chain
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary">
                Generated Execution String
              </label>
              <textarea
                readOnly
                value={execString}
                className="mt-2 block w-full rounded-md bg-bg-elevated border border-border-default shadow-sm h-28 p-3 text-sm text-text-primary font-mono"
              />
              <p className="mt-2 text-xs text-text-secondary">{txStatus}</p>
              <div className="mt-3 flex gap-2">
                <button
                  disabled={!execString}
                  onClick={() => navigator.clipboard?.writeText(execString)}
                  className="px-3 py-1 bg-bg-elevated border border-border-default text-text-primary rounded disabled:opacity-50"
                >
                  Copy
                </button>
                <a
                  href={execString || "#"}
                  onClick={(e) => {
                    if (!execString) e.preventDefault();
                  }}
                  className="px-3 py-1 bg-bg-elevated border border-border-default rounded text-sm text-text-primary"
                >
                  Preview
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
