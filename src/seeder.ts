import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Triangle from './models/triangle.model';
import connectDB from './config/db';

// Load env variables
dotenv.config();

// Sample triangle data
const trianglesData = [
  {
    sideA: 3,
    sideB: 4,
    sideC: 5
  },
  {
    sideA: 5,
    sideB: 5,
    sideC: 5
  },
  {
    sideA: 7,
    sideB: 8,
    sideC: 9
  }
];

// Connect to DB
connectDB();

// Import data
const importData = async (): Promise<void> => {
  try {
    // Clear existing data
    await Triangle.deleteMany({});
    
    // Insert new data
    await Triangle.insertMany(trianglesData);

    console.log('Data Imported!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Delete data
const deleteData = async (): Promise<void> => {
  try {
    await Triangle.deleteMany({});

    console.log('Data Destroyed!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Process command line arguments
if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
} else {
  console.log('Please provide a valid command: -i (import) or -d (delete)');
  process.exit(1);
}
