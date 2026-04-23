# Amana Backend Reliability Layer

This document describes the reliability features implemented in the Amana API.

## 1. Schema Validation Coverage

All incoming requests (body, query, params) are validated using **Zod** schemas.

- **Schemas location**: `backend/src/schemas/`
- **Middleware**: `validateRequest(schema)`

### Usage Example
```typescript
router.post(
  "/", 
  authMiddleware, 
  validateRequest({ body: createTradeSchema }),
  tradeController.createTrade
);
```

## 2. Error Taxonomy

The API uses a structured error response format to ensure consistency and easier debugging.

### Error Response Format
```json
{
  "code": "VALIDATION_ERROR",
  "message": "Validation failed",
  "details": [
    { "path": "amountUsdc", "message": "Invalid amount format" }
  ]
}
```

### Standard Error Codes
- `VALIDATION_ERROR`: Input validation failed.
- `AUTH_ERROR`: Authentication or authorization issues.
- `DOMAIN_ERROR`: Business logic constraints violated.
- `INFRA_ERROR`: Database or external service issues.
- `INTERNAL_ERROR`: Unexpected server errors.

## 3. Configurable Token (cNGN)

The backend is configured to use a specific token metadata (defaulting to cNGN).

- **Config location**: `backend/src/config/token.ts`
- **Settings**:
  - `symbol`: "cNGN"
  - `decimals`: 7

All logic previously hardcoded for USDC now references this configuration.

## 4. Idempotency Support

Mutation endpoints support idempotency via the `Idempotency-Key` header.

- **Header**: `Idempotency-Key: <unique-uuid>`
- **Storage**: Redis (fallback to logging on failure)
- **TTL**: 24 hours
- **Supported Endpoints**:
  - `POST /trades` (Create)
  - `POST /trades/:id/deposit`
  - `POST /trades/:id/release`
  - `POST /trades/:id/dispute`
  - `POST /evidence/video` (Upload)

## 5. Observability

- **Request ID**: Every request is assigned a unique `X-Request-ID` header for correlation.
- **Logging**: Structured logging using **Pino**, including error codes and request IDs.
