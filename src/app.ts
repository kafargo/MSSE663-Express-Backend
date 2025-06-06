// Load env vars before anything else
import dotenv from 'dotenv';
dotenv.config();

import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import connectDB from './config/db';
import triangleRoutes from './routes/triangle.routes';
import healthRoutes from './routes/health.routes';
import logger from './middleware/logger.middleware';
import errorHandler from './middleware/error.middleware';
import swaggerSpecs from './config/swagger';

// Import logger
import { info, error } from './utils/logger.utils';

// Log environment details on startup
info(`Starting app in ${process.env.NODE_ENV} environment`);

// Connect to MongoDB
connectDB();

// Initialize express app
const app: Express = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logger middleware
app.use(logger);

// Security middleware
app.use(cors({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(helmet({
  contentSecurityPolicy: false // Disable CSP for simplicity in development
}));

// Serve static files
app.use(express.static('public'));

// Mount routes
app.use('/api/triangles', triangleRoutes);
app.use('/api/health', healthRoutes);

// API Documentation with Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Triangle API Documentation'
}));

// Simple ping endpoint for basic health checking
app.get('/ping', (req, res) => {
  info('Ping endpoint called');
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Root route (will now serve index.html from public folder)
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: './public' });
});

// Error handling middleware
app.use(errorHandler);

// Define port
const PORT = process.env.PORT || 3000;

// Start server
const server = app.listen(PORT, () => {
  info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  error(`Unhandled Rejection: ${err.message}`, err);
  // Close server & exit process
  server.close(() => process.exit(1));
});

export default app;
