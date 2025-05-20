import { Request, Response } from 'express';
import Triangle, { ITriangle } from '../models/triangle.model';

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
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Server Error'
    });
  }
};

// Get single triangle by ID
export const getTriangleById = async (req: Request, res: Response): Promise<void> => {
  try {
    const triangle = await Triangle.findById(req.params.id);
    
    if (!triangle) {
      res.status(404).json({
        success: false,
        error: 'Triangle not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: triangle
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Server Error'
    });
  }
};

// Create a new triangle
export const createTriangle = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sideA, sideB, sideC } = req.body;
    
    // Validate input
    if (sideA === undefined || sideB === undefined || sideC === undefined) {
      res.status(400).json({
        success: false,
        error: 'Please provide all three sides (sideA, sideB, sideC)'
      });
      return;
    }

    // Check if triangle is valid using triangle inequality theorem
    if (!(sideA + sideB > sideC && sideA + sideC > sideB && sideB + sideC > sideA)) {
      res.status(400).json({
        success: false,
        error: 'Invalid triangle: The sum of the lengths of any two sides must be greater than the length of the remaining side'
      });
      return;
    }
    
    const triangle = await Triangle.create(req.body);

    res.status(201).json({
      success: true,
      data: triangle
    });
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      const messages = Object.values(error).map(val => val.message);
      res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'Server Error'
      });
    }
  }
};

// Update triangle
export const updateTriangle = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sideA, sideB, sideC } = req.body;
    
    // Validate input
    if (sideA === undefined && sideB === undefined && sideC === undefined) {
      res.status(400).json({
        success: false,
        error: 'Please provide at least one side to update (sideA, sideB, or sideC)'
      });
      return;
    }
    
    let triangle = await Triangle.findById(req.params.id);
    
    if (!triangle) {
      res.status(404).json({
        success: false,
        error: 'Triangle not found'
      });
      return;
    }

    // Create a new object with the updated values
    const updatedTriangle = {
      sideA: sideA !== undefined ? sideA : triangle.sideA,
      sideB: sideB !== undefined ? sideB : triangle.sideB,
      sideC: sideC !== undefined ? sideC : triangle.sideC
    };
    
    // Check if triangle is valid using triangle inequality theorem
    if (!(updatedTriangle.sideA + updatedTriangle.sideB > updatedTriangle.sideC && 
          updatedTriangle.sideA + updatedTriangle.sideC > updatedTriangle.sideB && 
          updatedTriangle.sideB + updatedTriangle.sideC > updatedTriangle.sideA)) {
      res.status(400).json({
        success: false,
        error: 'Invalid triangle: The sum of the lengths of any two sides must be greater than the length of the remaining side'
      });
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
    if (error instanceof Error && error.name === 'ValidationError') {
      res.status(400).json({
        success: false,
        error: error.message
      });
    } else {
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'Server Error'
      });
    }
  }
};

// Delete triangle
export const deleteTriangle = async (req: Request, res: Response): Promise<void> => {
  try {
    const triangle = await Triangle.findById(req.params.id);
    
    if (!triangle) {
      res.status(404).json({
        success: false,
        error: 'Triangle not found'
      });
      return;
    }

    await triangle.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Server Error'
    });
  }
};
