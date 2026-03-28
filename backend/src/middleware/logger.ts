import pinoHttp from 'pino-http';
import pino from 'pino';
import type { Request } from 'express';
import { env } from '../config/env';

export const appLogger =
  env.NODE_ENV === "test"
    ? pino({ level: "silent" })
    : pino({
        level: env.NODE_ENV === "production" ? "info" : "debug",
        transport: {
          target: "pino-pretty",
          options: {
            colorize: true,
          },
        },
      });

export default pinoHttp({
  logger: appLogger,
  serializers: {
    req: pino.stdSerializers.req,
    res: pino.stdSerializers.res,
  },
  autoLogging: {
    ignore: (req) => {
      const path = (req as Request).path ?? "";
      return /^\/health/.test(path) || /^\/api\/docs/.test(path);
    },
  },
});

