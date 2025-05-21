// Test setup file for Jest
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import dotenv from 'dotenv';

// Load test environment variables
dotenv.config({ path: '.env.test' });

// Set global variables
process.env.NODE_ENV = 'test';

// Reference to the MongoDB memory server instance
let mongoServer: MongoMemoryServer;

// Setup for tests
beforeAll(async () => {
  try {
    // Create an in-memory MongoDB instance
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    
    console.log(`Connecting to in-memory MongoDB at: ${mongoUri}`);
    
    // Connect to the in-memory database
    await mongoose.connect(mongoUri);
    
    console.log('Connected to in-memory MongoDB');
  } catch (error) {
    console.error('Error setting up MongoDB for tests:', error);
    throw error;
  }
});

// Clean up after tests
afterAll(async () => {
  try {
    // Clean database resources
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.dropDatabase();
      await mongoose.connection.close();
      console.log('Closed MongoDB connection');
    }
    
    // Stop the in-memory MongoDB instance
    if (mongoServer) {
      await mongoServer.stop();
      console.log('Stopped in-memory MongoDB server');
    }
  } catch (error) {
    console.error('Error cleaning up after tests:', error);
    throw error;
  }
});
