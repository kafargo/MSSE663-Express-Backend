import { Request, Response, NextFunction } from 'express';
import { httpLogger } from '../utils/logger.utils';

/**
 * Middleware that logs HTTP requests using Winston
 */
const logger = (req: Request, res: Response, next: NextFunction): void => {
  const start = Date.now();
  
  res.on('finish', () => {
    const responseTime = Date.now() - start;
    httpLogger(
      req.method,
      `${req.protocol}://${req.get('host')}${req.originalUrl}`,
      res.statusCode,
      responseTime
    );
  });
  
  next();
};

export default logger;
