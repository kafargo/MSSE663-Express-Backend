// This file provides a mock app for testing
import express from 'express';
import triangleRoutes from '../../routes/triangle.routes';
import errorHandler from '../../middleware/error.middleware';

// Create express app without connecting to database
const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Mount routes
app.use('/api/triangles', triangleRoutes);

// Error handling middleware
app.use(errorHandler);

// Export for testing
export default app;
