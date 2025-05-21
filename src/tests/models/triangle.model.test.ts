import mongoose from 'mongoose';
import Triangle from '../../models/triangle.model';

describe('Triangle Model', () => {
  // Clean up after each test
  afterEach(async () => {
    await Triangle.deleteMany({});
  });

  it('should create a valid triangle', async () => {
    const triangleData = {
      sideA: 3,
      sideB: 4,
      sideC: 5
    };

    const triangle = await Triangle.create(triangleData);
    expect(triangle).toBeDefined();
    expect(triangle.sideA).toBe(3);
    expect(triangle.sideB).toBe(4);
    expect(triangle.sideC).toBe(5);
  });

  it('should correctly calculate area using virtual property', async () => {
    const triangleData = {
      sideA: 3,
      sideB: 4,
      sideC: 5
    };

    const triangle = await Triangle.create(triangleData);
    // Area of a 3-4-5 triangle should be 6
    expect(triangle.get('area')).toBe(6);
  });

  it('should correctly calculate perimeter using virtual property', async () => {
    const triangleData = {
      sideA: 3,
      sideB: 4,
      sideC: 5
    };

    const triangle = await Triangle.create(triangleData);
    expect(triangle.get('perimeter')).toBe(12);
  });

  it('should correctly identify triangle type', async () => {
    const equilateralTriangle = await Triangle.create({
      sideA: 5,
      sideB: 5,
      sideC: 5
    });
    
    const isoscelesTriangle = await Triangle.create({
      sideA: 5,
      sideB: 5,
      sideC: 8
    });
    
    const scaleneTriangle = await Triangle.create({
      sideA: 3,
      sideB: 4,
      sideC: 5
    });

    expect(equilateralTriangle.get('type')).toBe('Equilateral');
    expect(isoscelesTriangle.get('type')).toBe('Isosceles');
    expect(scaleneTriangle.get('type')).toBe('Scalene');
  });

  it('should reject invalid triangles', async () => {
    const invalidTriangleData = {
      sideA: 1,
      sideB: 1,
      sideC: 10 // Violates triangle inequality theorem
    };

    await expect(Triangle.create(invalidTriangleData)).rejects.toThrow();
  });
});
