// A simple diagnostic script to check environment variables in Railway
console.log('--- Environment Variable Diagnostic Tool ---');
console.log('Current timestamp:', new Date().toISOString());
console.log('Node version:', process.version);
console.log('OS:', process.platform);

// Check for critical environment variables
const criticalVars = ['MONGO_URI', 'NODE_ENV', 'PORT', 'FRONTEND_URL'];
console.log('\nChecking critical environment variables:');
criticalVars.forEach(varName => {
  const value = process.env[varName];
  // Don't show actual value for sensitive info
  const isSensitive = varName.includes('URI') || varName.includes('KEY') || varName.includes('SECRET');
  const displayValue = isSensitive && value ? '[SET]' : value || '[NOT SET]';
  console.log(`- ${varName}: ${displayValue}`);
});

// Check for Railway-specific variables
console.log('\nChecking Railway-specific variables:');
const railwayVars = Object.keys(process.env)
  .filter(key => key.startsWith('RAILWAY_'))
  .sort();

if (railwayVars.length === 0) {
  console.log('No Railway-specific variables found - are you running in Railway?');
} else {
  railwayVars.forEach(varName => {
    console.log(`- ${varName}: [SET]`);
  });
}

// Try to connect to MongoDB if URI is available
if (process.env.MONGO_URI) {
  console.log('\nTesting MongoDB connection...');
  const mongoose = require('mongoose');
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connection successful!'))
    .catch(err => console.error('MongoDB connection failed:', err.message))
    .finally(() => {
      console.log('\nDiagnostic complete.');
      process.exit(0);
    });
} else {
  console.log('\nSkipping MongoDB connection test (MONGO_URI not available)');
  console.log('\nDiagnostic complete.');
}
