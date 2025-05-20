import { Request, Response } from 'express';
import mongoose from 'mongoose';
import os from 'os';

/**
 * Get health status of the application
 * @route GET /api/health
 */
export const getHealthStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Health check endpoint called:', new Date().toISOString());
    console.log('Request URL:', req.originalUrl);
    console.log('Request headers:', req.headers);
    
    // Check MongoDB connection status
    const dbStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';
    
    // Get system info
    const uptime = process.uptime();
    const memoryUsage = process.memoryUsage();
    const freeMem = os.freemem() / (1024 * 1024); // Convert to MB
    const totalMem = os.totalmem() / (1024 * 1024); // Convert to MB
    
    // Get environment info
    const environment = process.env.NODE_ENV || 'development';
    
    // Check key environment variables
    const envStatus = {
      MONGO_URI: process.env.MONGO_URI ? 'Set' : 'Not Set',
      NODE_ENV: process.env.NODE_ENV || 'Not Set',
      PORT: process.env.PORT || 'Not Set',
      FRONTEND_URL: process.env.FRONTEND_URL || 'Not Set'
    };
    
    // Get application info
    const serverTime = new Date().toISOString();
    
    res.status(200).json({
      success: true,
      data: {
        status: 'OK',
        server: {
          uptime: `${Math.floor(uptime / 60)} minutes, ${Math.floor(uptime % 60)} seconds`,
          timestamp: serverTime,
          environment,
          environmentVariables: envStatus,
          memoryUsage: {
            rss: `${Math.round(memoryUsage.rss / (1024 * 1024))} MB`,
            heapTotal: `${Math.round(memoryUsage.heapTotal / (1024 * 1024))} MB`,
            heapUsed: `${Math.round(memoryUsage.heapUsed / (1024 * 1024))} MB`,
          },
          system: {
            freeMem: `${Math.round(freeMem)} MB`,
            totalMem: `${Math.round(totalMem)} MB`,
            cpus: os.cpus().length
          }
        },
        database: {
          status: dbStatus,
          name: 'MSSE663',
          host: mongoose.connection.host || 'Unknown',
        },
        api: {
          version: '1.0.0',
          endpoints: [
            'GET /api/triangles',
            'GET /api/triangles/:id',
            'GET /api/triangles/:id/area',
            'POST /api/triangles',
            'PUT /api/triangles/:id', 
            'DELETE /api/triangles/:id',
            'GET /api/health'
          ]
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Server Error'
    });
  }
};
