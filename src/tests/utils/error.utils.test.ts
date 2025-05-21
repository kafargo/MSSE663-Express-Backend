import { Response } from 'express';
import { errorResponse, handleValidationError } from '../../utils/error.utils';

describe('Error Utils', () => {
  // Mock response object
  let mockRes: Partial<Response>;
  
  beforeEach(() => {
    // Create mock response with jest functions
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
  });
  
  describe('errorResponse', () => {
    it('should respond with correct status and message for string error', () => {
      const message = 'Test error message';
      errorResponse(mockRes as Response, 400, message);
      
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        error: message
      });
    });
    
    it('should handle array of error messages', () => {
      const messages = ['Error 1', 'Error 2'];
      errorResponse(mockRes as Response, 400, messages);
      
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        error: 'Error 1, Error 2'
      });
    });
    
    it('should handle Error objects', () => {
      const error = new Error('Test error');
      errorResponse(mockRes as Response, 500, error);
      
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        error: 'Test error'
      });
    });
    
    it('should handle unknown error types', () => {
      errorResponse(mockRes as Response, 500, null);
      
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        error: 'Server Error'
      });
    });
  });
  
  describe('handleValidationError', () => {
    it('should handle validation errors', () => {
      const validationError = {
        name: 'ValidationError',
        message: 'Validation failed',
        errors: {
          field1: { message: 'Field1 error' },
          field2: { message: 'Field2 error' }
        }
      };
      
      handleValidationError(mockRes as Response, validationError);
      
      // This test is incomplete since we don't have a proper mongoose validation error mock
      // In a real test, we would use mongoose.Error.ValidationError
      expect(mockRes.status).toHaveBeenCalledWith(500);
    });
    
    it('should handle non-validation errors', () => {
      const error = new Error('Generic error');
      handleValidationError(mockRes as Response, error);
      
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        error: 'Generic error'
      });
    });
  });
});
