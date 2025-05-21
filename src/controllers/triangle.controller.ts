import { Request, Response } from 'express';
import Triangle, { ITriangle } from '../models/triangle.model';
import { errorResponse, handleValidationError } from '../utils/error.utils';
import { isValidTriangle } from '../utils/triangle.utils';

// Get all triangles
export const getTriangles = async (req: Request, res: Response): Promise<void> => {
  try {
    const triangles = await Triangle.find();
    res.status(200).json({
      success: true,
      count: triangles.length,
      data: triangles
    });
  } catch (error) {
    errorResponse(res, 500, error);
  }
};

// Get single triangle by ID
export const getTriangleById = async (req: Request, res: Response): Promise<void> => {
  try {
    const triangle = await Triangle.findById(req.params.id);
    
    if (!triangle) {
      errorResponse(res, 404, 'Triangle not found');
      return;
    }

    res.status(200).json({
      success: true,
      data: triangle
    });
  } catch (error) {
    errorResponse(res, 500, error);
  }
};

// Create a new triangle
export const createTriangle = async (req: Request, res: Response): Promise<void> => {
  try {
    // Input validation is handled by middleware
    // Triangle geometry validation is handled by model middleware
    
    const triangle = await Triangle.create(req.body);

    res.status(201).json({
      success: true,
      data: triangle
    });
  } catch (error) {
    handleValidationError(res, error);
  }
};

// Update triangle
export const updateTriangle = async (req: Request, res: Response): Promise<void> => {
  try {
    // Input validation is handled by middleware
    const { sideA, sideB, sideC } = req.body;
    
    let triangle = await Triangle.findById(req.params.id);
    
    if (!triangle) {
      errorResponse(res, 404, 'Triangle not found');
      return;
    }

    // Create a new object with the updated values
    const updatedTriangle = {
      sideA: sideA !== undefined ? sideA : triangle.sideA,
      sideB: sideB !== undefined ? sideB : triangle.sideB,
      sideC: sideC !== undefined ? sideC : triangle.sideC
    };
    
    // Validate triangle geometry
    if (!isValidTriangle(updatedTriangle.sideA, updatedTriangle.sideB, updatedTriangle.sideC)) {
      errorResponse(res, 400, 'Invalid triangle: The sum of the lengths of any two sides must be greater than the length of the remaining side');
      return;
    }

    triangle = await Triangle.findByIdAndUpdate(req.params.id, updatedTriangle, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: triangle
    });
  } catch (error) {
    handleValidationError(res, error);
  }
};

// Delete triangle
export const deleteTriangle = async (req: Request, res: Response): Promise<void> => {
  try {
    const triangle = await Triangle.findById(req.params.id);
    
    if (!triangle) {
      errorResponse(res, 404, 'Triangle not found');
      return;
    }

    await triangle.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    errorResponse(res, 500, error);
  }
};

/**
 * Calculate the area of a triangle
 * @route GET /api/triangles/:id/area
 */
export const calculateTriangleArea = async (req: Request, res: Response): Promise<void> => {
  try {
    const triangle = await Triangle.findById(req.params.id);
    
    if (!triangle) {
      errorResponse(res, 404, 'Triangle not found');
      return;
    }

    // Calculate area using Heron's formula
    // First, calculate the semi-perimeter
    const s = (triangle.sideA + triangle.sideB + triangle.sideC) / 2;
    // Then, calculate the area
    const area = Math.sqrt(s * (s - triangle.sideA) * (s - triangle.sideB) * (s - triangle.sideC));

    res.status(200).json({
      success: true,
      data: {
        triangleId: triangle._id,
        sideA: triangle.sideA,
        sideB: triangle.sideB,
        sideC: triangle.sideC,
        area,
        perimeter: triangle.sideA + triangle.sideB + triangle.sideC
      }
    });
  } catch (error) {
    errorResponse(res, 500, error);
  }
};
