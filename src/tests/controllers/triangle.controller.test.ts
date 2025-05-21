// Simple test for triangle controller
import * as triangleController from '../../controllers/triangle.controller';
import { Request, Response } from 'express';

// Mock the Triangle model and Response
jest.mock('../../models/triangle.model', () => ({
  __esModule: true,
  default: {
    find: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    deleteMany: jest.fn()
  }
}));

// Import the mocked model
import Triangle from '../../models/triangle.model';

describe('Triangle Controller', () => {
  // Sample triangle data for testing
  const sampleTriangle = {
    _id: '123456789012',
    sideA: 3,
    sideB: 4, 
    sideC: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
    get: jest.fn().mockImplementation((field) => {
      if (field === 'area') return 6;
      if (field === 'perimeter') return 12;
      if (field === 'type') return 'Scalene';
      return null;
    }),
    deleteOne: jest.fn().mockResolvedValue({})
  };

  // Mock request and response
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  
  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
    
    // Reset mocks
    jest.clearAllMocks();
  });

  describe('getTriangles', () => {
    it('should get all triangles', async () => {
      // Setup
      (Triangle.find as jest.Mock).mockResolvedValue([sampleTriangle]);
      
      // Execute
      await triangleController.getTriangles(mockRequest as Request, mockResponse as Response);
      
      // Verify
      expect(Triangle.find).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        count: 1,
        data: [sampleTriangle]
      });
    });

    it('should handle errors', async () => {
      // Setup
      const error = new Error('Database error');
      (Triangle.find as jest.Mock).mockRejectedValue(error);
      
      // Execute
      await triangleController.getTriangles(mockRequest as Request, mockResponse as Response);
      
      // Verify
      expect(Triangle.find).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        error: 'Database error'
      });
    });
  });

  describe('getTriangleById', () => {
    it('should get a triangle by id', async () => {
      // Setup
      mockRequest.params = { id: sampleTriangle._id };
      (Triangle.findById as jest.Mock).mockResolvedValue(sampleTriangle);
      
      // Execute
      await triangleController.getTriangleById(mockRequest as Request, mockResponse as Response);
      
      // Verify
      expect(Triangle.findById).toHaveBeenCalledWith(sampleTriangle._id);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        data: sampleTriangle
      });
    });

    it('should return 404 if triangle not found', async () => {
      // Setup
      mockRequest.params = { id: 'nonexistent-id' };
      (Triangle.findById as jest.Mock).mockResolvedValue(null);
      
      // Execute
      await triangleController.getTriangleById(mockRequest as Request, mockResponse as Response);
      
      // Verify
      expect(Triangle.findById).toHaveBeenCalledWith('nonexistent-id');
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        error: 'Triangle not found'
      });
    });
  });

  describe('createTriangle', () => {
    it('should create a new triangle', async () => {
      // Setup
      mockRequest.body = {
        sideA: 3,
        sideB: 4,
        sideC: 5
      };
      (Triangle.create as jest.Mock).mockResolvedValue(sampleTriangle);
      
      // Execute
      await triangleController.createTriangle(mockRequest as Request, mockResponse as Response);
      
      // Verify
      expect(Triangle.create).toHaveBeenCalledWith(mockRequest.body);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        data: sampleTriangle
      });
    });
  });

  describe('calculateTriangleArea', () => {
    it('should calculate triangle area', async () => {
      // Setup
      mockRequest.params = { id: sampleTriangle._id };
      (Triangle.findById as jest.Mock).mockResolvedValue(sampleTriangle);
      
      // Execute
      await triangleController.calculateTriangleArea(mockRequest as Request, mockResponse as Response);
      
      // Verify
      expect(Triangle.findById).toHaveBeenCalledWith(sampleTriangle._id);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        data: {
          triangleId: sampleTriangle._id,
          sideA: sampleTriangle.sideA,
          sideB: sampleTriangle.sideB,
          sideC: sampleTriangle.sideC,
          area: 6,
          perimeter: 12,
          type: 'Scalene'
        }
      });
    });
  });
});
