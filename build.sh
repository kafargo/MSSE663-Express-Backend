#!/bin/bash
# Build script for the project (works locally and in Railway)

echo "Building TypeScript project..."

# Create the dist directory if it doesn't exist
mkdir -p dist

# Run TypeScript compiler (using npx for better compatibility)
npx tsc -p .

# Check if compilation was successful
if [ $? -eq 0 ]; then
    echo "Build completed successfully!"
    
    # Copy any non-TypeScript files that might be needed
    echo "Copying additional files..."
    cp -r public dist/
    
    # Copy .env file for local testing if it exists (won't be used in Railway)
    if [ -f .env ]; then
        echo "Copying .env file for local testing..."
        cp .env dist/
    fi
    
    echo "Project is ready to run!"
else
    echo "Build failed. Please fix the errors and try again."
    exit 1
fi
