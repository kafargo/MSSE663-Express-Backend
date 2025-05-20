import { Router } from 'express';
import { getHealthStatus } from '../controllers/health.controller';

const router = Router();

// Route for /api/health
router.route('/')
  .get(getHealthStatus);

export default router;
