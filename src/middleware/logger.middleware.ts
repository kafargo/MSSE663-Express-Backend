import { Request, Response, NextFunction } from 'express';

/**
 * Logs information about incoming requests
 */
const logger = (req: Request, res: Response, next: NextFunction): void => {
  console.log(
    `${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl} - ${new Date().toISOString()}`
  );
  next();
};

export default logger;
