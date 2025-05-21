import winston, { format } from 'winston';

/**
 * Creates a custom logger with Winston
 */
const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: 'triangle-api' },
  transports: [
    // Write all logs error (and below) to console
    new winston.transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(({ timestamp, level, message, ...meta }) => {
          return `${timestamp} [${level}]: ${message} ${
            Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''
          }`;
        })
      ),
    }),
  ],
});

// Export named methods
export const info = (message: string, meta = {}): void => {
  logger.info(message, meta);
};

export const debug = (message: string, meta = {}): void => {
  logger.debug(message, meta);
};

export const warn = (message: string, meta = {}): void => {
  logger.warn(message, meta);
};

export const error = (message: string, error?: unknown): void => {
  if (error instanceof Error) {
    logger.error(message, { error: error.message, stack: error.stack });
  } else {
    logger.error(message, { error });
  }
};

// Add a special HTTP request logger
export const httpLogger = (
  method: string,
  url: string,
  status: number,
  responseTime: number
): void => {
  logger.info(`${method} ${url} ${status} ${responseTime}ms`);
};

export default logger;
