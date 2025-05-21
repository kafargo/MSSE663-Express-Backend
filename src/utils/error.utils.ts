import { Response } from 'express';

/**
 * Standardized error response format
 * @param res Express Response object
 * @param statusCode HTTP status code
 * @param message Error message or array of error messages
 */
export const errorResponse = (
  res: Response,
  statusCode: number,
  message: string | string[] | unknown
): void => {
  let errorMessage: string;
  
  if (Array.isArray(message)) {
    errorMessage = message.join(', ');
  } else if (message instanceof Error) {
    errorMessage = message.message;
  } else if (typeof message === 'string') {
    errorMessage = message;
  } else {
    errorMessage = 'Server Error';
  }
  
  res.status(statusCode).json({
    success: false,
    error: errorMessage
  });
};

/**
 * Handle validation errors
 * @param res Express Response object
 * @param error Error object
 */
export const handleValidationError = (
  res: Response,
  error: unknown
): void => {
  if (error instanceof Error && error.name === 'ValidationError') {
    const messages = Object.values(error).map(val => val.message);
    errorResponse(res, 400, messages);
  } else {
    errorResponse(res, 500, error);
  }
};
