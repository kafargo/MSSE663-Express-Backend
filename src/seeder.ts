import _mongoose from 'mongoose'; // Prefix with underscore to indicate unused import
import dotenv from 'dotenv';
import Triangle from './models/triangle.model';
import connectDB from './config/db';

// Load env variables
dotenv.config();

// Sample triangle data
const trianglesData = [
  // Original triangles
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
  },
  // Additional triangles
  {
    sideA: 8,
    sideB: 15,
    sideC: 17
  },
  {
    sideA: 6,
    sideB: 8,
    sideC: 10
  },
  {
    sideA: 12,
    sideB: 12,
    sideC: 12
  },
  {
    sideA: 6,
    sideB: 6,
    sideC: 10
  },
  {
    sideA: 9,
    sideB: 12,
    sideC: 15
  },
  {
    sideA: 10,
    sideB: 10,
    sideC: 16
  },
  {
    sideA: 5,
    sideB: 12,
    sideC: 13
  },
  {
    sideA: 7,
    sideB: 24,
    sideC: 25
  },
  {
    sideA: 15,
    sideB: 20,
    sideC: 25
  },
  {
    sideA: 8,
    sideB: 8,
    sideC: 8
  },
  {
    sideA: 11,
    sideB: 60,
    sideC: 61
  },
  {
    sideA: 28,
    sideB: 45,
    sideC: 53
  },
  {
    sideA: 33,
    sideB: 56,
    sideC: 65
  },
  {
    sideA: 12,
    sideB: 35,
    sideC: 37
  },
  {
    sideA: 16,
    sideB: 16,
    sideC: 16
  },
  {
    sideA: 13,
    sideB: 14,
    sideC: 15
  },
  {
    sideA: 20,
    sideB: 20,
    sideC: 20
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
