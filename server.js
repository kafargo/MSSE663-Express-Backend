// This file ensures environment variables are properly loaded in production
console.log('Starting server.js entry point');
console.log('Node version:', process.version);
console.log('Current directory:', __dirname);

// Load environment variables
require('dotenv').config();
console.log('Environment loaded, NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', process.env.PORT);

try {
  // Load the application
  console.log('Loading application...');
  require('./dist/app.js');
  console.log('Application loaded successfully');
} catch (error) {
  console.error('Failed to load application:', error);
  process.exit(1);
}
