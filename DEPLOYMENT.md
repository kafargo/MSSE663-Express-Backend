# Deployment Guide for Railway

This document provides detailed instructions for deploying this application on Railway, with special focus on environment variables.

## Environment Variables Setup

Railway allows you to set environment variables through its dashboard. Here's how to properly set them up:

1. Go to your project in the [Railway dashboard](https://railway.app/dashboard)
2. Navigate to the "Variables" tab
3. Add the following required variables:
   - `MONGO_URI`: Your MongoDB connection string
   - `NODE_ENV`: Set to `production`
   - `FRONTEND_URL`: URL of your frontend application (for CORS)

## Troubleshooting Environment Variables

If your application isn't recognizing environment variables in Railway:

### Check Variable Scope

Make sure your variables are set at the correct scope:
- **Project level**: Variables available to all services
- **Service level**: Variables available only to a specific service

### Verify Variable Names

Double-check that variable names match exactly what your code is using:
- Variable names are case sensitive
- No extra spaces in names or values

### Restart After Changes

After adding or changing environment variables:
1. Go to the "Deployments" tab
2. Click "Deploy" to restart your service with the new variables

### Check Logs

Railway logs can help you diagnose issues:
1. Go to the "Deployments" tab
2. Select the latest deployment
3. Check the logs for any environment variable related errors

## Debugging Tips

The application includes two health endpoints for diagnosing issues:

```
GET /api/health
```

This endpoint provides detailed health information including environment variables status, MongoDB connection, and system information.

```
GET /ping
```

This is a simple healthcheck endpoint that returns a 200 status without requiring database connectivity. This endpoint is used by Railway for its healthcheck functionality.

## Manual Environment Variable Testing

To manually verify environment variables in the Railway environment:

1. Go to the "Deployments" tab
2. Open the shell for your service
3. Run: `env | grep -v PATH` to view all environment variables
4. To check a specific variable: `echo $VARIABLE_NAME`

### Using the Diagnostic Tool

This project includes a diagnostic tool specifically for troubleshooting environment variable issues:

1. Go to the "Deployments" tab in Railway
2. Open the shell for your service
3. Run: `npm run diagnose`

This will:
- List all critical environment variables (without showing sensitive values)
- Check for Railway-specific environment variables
- Test MongoDB connectivity if MONGO_URI is available

## Common Issues

1. **Variables not appearing**: Make sure they're set at the correct scope and the service has been redeployed
2. **Connection errors**: Check that the MONGO_URI is correct and accessible from Railway
3. **CORS errors**: Verify the FRONTEND_URL is set correctly if you're experiencing CORS issues

Remember that Railway automatically sets its own environment variables like `PORT` and `RAILWAY_STATIC_URL`. Your application should be flexible enough to work with these.
