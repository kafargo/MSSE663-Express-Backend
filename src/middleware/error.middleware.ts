import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../utils/error.utils';
import { error as logError } from '../utils/logger.utils';

interface ErrorResponse extends Error {
  statusCode?: number;
}

const errorHandler = (err: ErrorResponse, req: Request, res: Response, next: NextFunction): void => {
  let error = { ...err };
  error.message = err.message;

  // Log error with Winston
  logError(`Error: ${err.name}`, err);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = new Error(message) as ErrorResponse;
    error.statusCode = 404;
  }

  // Mongoose duplicate key
  if (err.name === 'MongoServerError' && err.message.includes('duplicate key error')) {
    const message = 'Duplicate field value entered';
    error = new Error(message) as ErrorResponse;
    error.statusCode = 400;
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err).map(val => val.message).join(', ');
    error = new Error(message) as ErrorResponse;
    error.statusCode = 400;
  }

  errorResponse(res, error.statusCode || 500, error.message || 'Server Error');
};

export default errorHandler;
