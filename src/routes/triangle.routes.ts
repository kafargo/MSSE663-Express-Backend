import { Router } from 'express';
import {
  getTriangles,
  getTriangleById,
  createTriangle,
  updateTriangle,
  deleteTriangle
} from '../controllers/triangle.controller';
import { calculateTriangleArea } from '../controllers/area.controller';

const router = Router();

// Routes for /api/triangles
router.route('/')
  .get(getTriangles)
  .post(createTriangle);

// Routes for /api/triangles/:id
router.route('/:id')
  .get(getTriangleById)
  .put(updateTriangle)
  .delete(deleteTriangle);

// Routes for /api/triangles/:id/area
router.route('/:id/area')
  .get(calculateTriangleArea);

export default router;
