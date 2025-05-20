import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import connectDB from './config/db';
import triangleRoutes from './routes/triangle.routes';
import healthRoutes from './routes/health.routes';
import logger from './middleware/logger.middleware';
import errorHandler from './middleware/error.middleware';

// Load env vars
dotenv.config();

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
app.use(cors());
app.use(helmet({
  contentSecurityPolicy: false // Disable CSP for simplicity in development
}));

// Serve static files
app.use(express.static('public'));

// Mount routes
app.use('/api/triangles', triangleRoutes);
app.use('/api/health', healthRoutes);

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
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  console.log(`Unhandled Rejection: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});

export default app;
