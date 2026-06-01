import request from "supertest";
import { createApp } from "../app";

var mockQueryRaw: jest.Mock;
var mockFindFirst: jest.Mock;

jest.mock("../lib/db", () => {
  mockQueryRaw = jest.fn();
  mockFindFirst = jest.fn();
  return {
    prisma: {
      $queryRaw: mockQueryRaw,
      processedLedger: {
        findFirst: mockFindFirst,
      },
    },
  };
});

describe("GET /health", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 200 with healthy status when DB is connected", async () => {
    mockQueryRaw.mockResolvedValue([{ "?column?": 1 }]);
    mockFindFirst.mockResolvedValue({
      ledgerSequence: 12345,
      processedAt: new Date(),
    });

    const app = createApp();
    const res = await request(app).get("/health");

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      status: "healthy",
      checks: {
        database: { status: "up" },
        indexer: { status: "up" },
      },
    });
    expect(res.body.timestamp).toBeDefined();
    expect(new Date(res.body.timestamp).toISOString()).toBe(res.body.timestamp);
  });

  it("should return 503 when DB is disconnected", async () => {
    mockQueryRaw.mockRejectedValue(new Error("connection failed"));
    mockFindFirst.mockResolvedValue({
      ledgerSequence: 12345,
      processedAt: new Date(),
    });

    const app = createApp();
    const res = await request(app).get("/health");

    expect(res.status).toBe(503);
    expect(res.body).toMatchObject({
      status: "unhealthy",
      checks: {
        database: { status: "down" },
      },
    });
    expect(res.body.timestamp).toBeDefined();
  });

  it("should include valid ISO timestamp", async () => {
    mockQueryRaw.mockRejectedValue(new Error("down"));
    mockFindFirst.mockResolvedValue({
      ledgerSequence: 12345,
      processedAt: new Date(),
    });

    const app = createApp();
    const res = await request(app).get("/health");

    expect(new Date(res.body.timestamp).toISOString()).toBe(res.body.timestamp);
  });

  const integrationDescribe = process.env.DATABASE_URL ? describe : describe.skip;
  integrationDescribe("integration with real database", () => {
    it("should return 200 with healthy status", async () => {
      const app = createApp();
      const res = await request(app).get("/health");

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({
        status: "healthy",
      });
      expect(res.body.timestamp).toBeDefined();
    });
  });
});
