import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    // Log what connection string we're using (without sensitive info)
    console.log(`Attempting to connect to MongoDB...`);
    
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
