import { isValidTriangle } from '../../utils/triangle.utils';

describe('Triangle Utilities', () => {
  it('should validate a proper triangle', () => {
    expect(isValidTriangle(3, 4, 5)).toBe(true);
    expect(isValidTriangle(5, 5, 5)).toBe(true);
    expect(isValidTriangle(7, 8, 9)).toBe(true);
  });

  it('should invalidate improper triangles', () => {
    // Violates triangle inequality
    expect(isValidTriangle(1, 1, 10)).toBe(false);
    expect(isValidTriangle(1, 10, 1)).toBe(false);
    expect(isValidTriangle(10, 1, 1)).toBe(false);
  });

  it('should handle edge cases', () => {
    // Degenerate triangle (sum of two sides equals the third)
    expect(isValidTriangle(1, 2, 3)).toBe(false);
    expect(isValidTriangle(0, 0, 0)).toBe(false);
  });
});
