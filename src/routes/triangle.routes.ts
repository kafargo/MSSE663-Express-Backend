import { Router } from 'express';
import {
  getTriangles,
  getTriangleById,
  createTriangle,
  updateTriangle,
  deleteTriangle,
  calculateTriangleArea
} from '../controllers/triangle.controller';
import { validateRequest, triangleValidator } from '../middleware/validate.middleware';

const router = Router();

// Routes for /api/triangles
router.route('/')
  .get(getTriangles)
  .post(validateRequest(triangleValidator), createTriangle);

// Routes for /api/triangles/:id
router.route('/:id')
  .get(getTriangleById)
  .put(validateRequest(triangleValidator), updateTriangle)
  .delete(deleteTriangle);

// Routes for /api/triangles/:id/area
router.route('/:id/area')
  .get(calculateTriangleArea);

export default router;
