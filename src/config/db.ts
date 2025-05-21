import mongoose from 'mongoose';
import { info, error, debug } from '../utils/logger.utils';

const connectDB = async (): Promise<void> => {
  try {
    // Log environment information to help with debugging
    info(`Node Environment: ${process.env.NODE_ENV}`);
    info('Attempting to connect to MongoDB...');
    
    // Check for environment variables - only log critical ones
    const criticalVars = ['MONGO_URI', 'NODE_ENV', 'PORT'].filter(key => process.env[key]);
    debug(`Critical environment variables available: ${criticalVars.join(', ')}`);
    
    const mongoURI = process.env.MONGO_URI as string;
    if (!mongoURI) {
      throw new Error('MongoDB URI is not defined in environment variables');
    }
    
    // Set up options for the connection
    const options = {
      // Wait 5 seconds before timing out
      serverSelectionTimeoutMS: 5000
    };
    
    const conn = await mongoose.connect(mongoURI);
    info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    error(`MongoDB Connection Error: ${err instanceof Error ? err.message : String(err)}`, err);
    info('Check your MongoDB connection string and ensure the database server is accessible');
    // Don't exit the process in development mode, to allow fixing and restarting
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};

export default connectDB;
