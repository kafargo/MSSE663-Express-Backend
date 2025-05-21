/**
 * Check if a triangle is valid using the triangle inequality theorem
 * @param sideA Length of side A
 * @param sideB Length of side B
 * @param sideC Length of side C
 * @returns True if the triangle is valid, false otherwise
 */
export const isValidTriangle = (sideA: number, sideB: number, sideC: number): boolean => {
  return (
    sideA + sideB > sideC &&
    sideA + sideC > sideB &&
    sideB + sideC > sideA
  );
};
