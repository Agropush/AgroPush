import { NextFunction, Request, Response } from 'express';
import { env } from '../config/env';
import { TracedRequest } from './correlationId.middleware';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  const status = (err as any).status || 500;
  const message = env.NODE_ENV === 'production' ? 'Internal server error' : err.message;

  const traced = req as TracedRequest;

  res.status(status).json({
    error: true,
    status,
    message,
    // Include tracing IDs so callers can correlate errors with backend logs.
    ...(traced.correlationId && { correlationId: traced.correlationId }),
    ...(traced.requestId && { requestId: traced.requestId }),
  });
}
