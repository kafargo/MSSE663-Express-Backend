import { Request } from 'express';
import { triangleValidator } from '../../middleware/validate.middleware';

describe('Validation Middleware', () => {
  
  describe('triangleValidator', () => {
    // Helper to create mock request
    const createMockRequest = (
      method: string, 
      body: Record<string, unknown>
    ): Partial<Request> => ({
      method,
      body
    } as Partial<Request>);

    describe('POST request validation', () => {
      it('should validate complete triangle data', () => {
        const mockReq = createMockRequest('POST', {
          sideA: 3,
          sideB: 4,
          sideC: 5
        });
        
        const result = triangleValidator(mockReq as Request);
        expect(result.isValid).toBe(true);
      });

      it('should reject missing sides', () => {
        const mockReq = createMockRequest('POST', {
          sideA: 3,
          sideB: 4
          // Missing sideC
        });
        
        const result = triangleValidator(mockReq as Request);
        expect(result.isValid).toBe(false);
        expect(result.message).toContain('provide all three sides');
      });

      it('should reject non-positive sides', () => {
        const mockReq = createMockRequest('POST', {
          sideA: 3,
          sideB: 0, // Zero is not allowed
          sideC: 5
        });
        
        const result = triangleValidator(mockReq as Request);
        expect(result.isValid).toBe(false);
        expect(result.message).toContain('must be positive');
      });

      it('should reject negative sides', () => {
        const mockReq = createMockRequest('POST', {
          sideA: 3,
          sideB: 4,
          sideC: -5 // Negative not allowed
        });
        
        const result = triangleValidator(mockReq as Request);
        expect(result.isValid).toBe(false);
        expect(result.message).toContain('must be positive');
      });
    });

    describe('PUT request validation', () => {
      it('should validate partial triangle data', () => {
        const mockReq = createMockRequest('PUT', {
          sideA: 7 // Only updating one side
        });
        
        const result = triangleValidator(mockReq as Request);
        expect(result.isValid).toBe(true);
      });

      it('should reject empty update', () => {
        const mockReq = createMockRequest('PUT', {
          // No sides provided
        });
        
        const result = triangleValidator(mockReq as Request);
        expect(result.isValid).toBe(false);
        expect(result.message).toContain('at least one side');
      });

      it('should reject negative sides', () => {
        const mockReq = createMockRequest('PUT', {
          sideB: -4 // Negative not allowed
        });
        
        const result = triangleValidator(mockReq as Request);
        expect(result.isValid).toBe(false);
        expect(result.message).toContain('must be positive');
      });
    });
  });
});
