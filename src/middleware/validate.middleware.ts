import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../utils/error.utils';

/**
 * Factory function to create a validator middleware for a specific resource
 * @param validator Function that validates the request body
 * @returns Middleware function
 */
export const validateRequest = (
  validator: (req: Request) => { isValid: boolean; message?: string }
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = validator(req);
    
    if (!result.isValid) {
      errorResponse(res, 400, result.message || 'Validation failed');
      return;
    }
    
    next();
  };
};

/**
 * Validator for triangle creation and update
 * @param req Express Request object 
 * @returns Validation result
 */
export const triangleValidator = (req: Request): { isValid: boolean; message?: string } => {
  const { sideA, sideB, sideC } = req.body;
  
  // For PUT requests, we don't require all sides, just check if at least one is provided
  if (req.method === 'PUT') {
    if (sideA === undefined && sideB === undefined && sideC === undefined) {
      return {
        isValid: false,
        message: 'Please provide at least one side to update (sideA, sideB, or sideC)'
      };
    }
    
    // Check if any provided side is negative
    if ((sideA !== undefined && sideA <= 0) || 
        (sideB !== undefined && sideB <= 0) || 
        (sideC !== undefined && sideC <= 0)) {
      return {
        isValid: false,
        message: 'All sides must be positive numbers'
      };
    }
    
    return { isValid: true };
  }
  
  // For POST requests, require all sides
  if (sideA === undefined || sideB === undefined || sideC === undefined) {
    return {
      isValid: false,
      message: 'Please provide all three sides (sideA, sideB, sideC)'
    };
  }
  
  // Check if sides are positive numbers
  if (sideA <= 0 || sideB <= 0 || sideC <= 0) {
    return {
      isValid: false,
      message: 'All sides must be positive numbers'
    };
  }
  
  return { isValid: true };
};
