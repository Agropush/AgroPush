import express, { type Application } from "express";
import request from "supertest";
import { createApp } from "../app";
import { errorHandler } from "../middleware/errorHandler";

describe("App Bootstrap", () => {
  let app: Application;

  beforeAll(() => {
    app = createApp();
  });

  it('should return 200 on /health', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      status: 'ok',
      service: 'amana-backend',
    });
    expect(res.body.timestamp).toBeDefined();
  });

  it("should handle errors with structured JSON", async () => {
    const testApp = express();
    testApp.get("/test-error", () => {
      const err = new Error("Test error");
      (err as Error & { status?: number }).status = 400;
      throw err;
    });
    testApp.use(errorHandler);

    const res = await request(testApp).get("/test-error");
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error", true);
    expect(res.body).toHaveProperty("status", 400);
    expect(res.body).toHaveProperty("message", "Test error");
  });
});

