import { Request, Response } from 'express';
import Triangle from '../models/triangle.model';
import { errorResponse } from '../utils/error.utils';

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
