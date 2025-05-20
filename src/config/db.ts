import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    // Log environment information to help with debugging
    console.log(`Node Environment: ${process.env.NODE_ENV}`);
    console.log(`Attempting to connect to MongoDB...`);
    
    // Check for environment variables
    const envKeys = Object.keys(process.env).filter(key => 
      !key.startsWith('npm_') && !key.startsWith('_')
    );
    console.log(`Available environment variables: ${envKeys.join(', ')}`);
    
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
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error instanceof Error ? error.message : String(error)}`);
    console.log('Check your MongoDB connection string and ensure the database server is accessible');
    // Don't exit the process in development mode, to allow fixing and restarting
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};

export default connectDB;
