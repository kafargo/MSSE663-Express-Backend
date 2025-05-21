# MSSE663-Express-Backend

Express backend for the MSSE 663 class built with TypeScript and MongoDB

## Description

This is a RESTful API built with Express and TypeScript that connects to MongoDB. The application follows the MVC architecture with separate directories for routes, controllers, and models. It provides endpoints to interact with the 'triangle' collection in the MSSE663 database.

## Project Structure

```
├── src/
│   ├── app.ts                # Main application entry point
│   ├── config/               # Configuration files
│   │   ├── db.ts             # Database connection
│   │   └── swagger.ts        # Swagger API documentation
│   ├── controllers/          # Request handlers
│   │   ├── health.controller.ts
│   │   └── triangle.controller.ts
│   ├── middleware/           # Custom middleware
│   │   ├── error.middleware.ts
│   │   ├── logger.middleware.ts
│   │   └── validate.middleware.ts
│   ├── models/               # Database models
│   │   └── triangle.model.ts
│   ├── routes/               # API routes
│   │   ├── health.routes.ts
│   │   └── triangle.routes.ts
│   ├── tests/                # Test suites
│   │   ├── controllers/      # Controller tests
│   │   ├── middleware/       # Middleware tests
│   │   ├── models/           # Model tests
│   │   └── utils/            # Utility tests
│   ├── types/                # TypeScript type definitions
│   └── utils/                # Utility functions
│       ├── error.utils.ts    # Error handling utilities
│       ├── logger.utils.ts   # Winston logger setup
│       └── triangle.utils.ts # Triangle validation
```

## Installation

```bash
# Install dependencies
npm install
```

## Configuration

Create a `.env` file in the root directory with the following variables:

```
MONGO_URI={your MongoDB connection string}
PORT=3000
NODE_ENV=development
# Optional: URL of the frontend app that will access this API (for CORS)
# FRONTEND_URL=http://localhost:5173
```

## Running the Application

```bash
# Development mode
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Import seed data
npm run seed:import

# Delete all data
npm run seed:delete

# Run tests
npm test

# Run tests with watch mode
npm run test:watch

# Generate test coverage
npm run test:coverage

# Run ESLint
npm run lint

# Fix ESLint issues
npm run lint:fix

# Run diagnostics
npm run diagnose
```

## Testing

The application includes:

1. A simple HTML/JavaScript UI for testing the API available at the root URL (http://localhost:3000)
2. A Postman collection file (`MSSE663_Triangle_API.postman_collection.json`) that can be imported into Postman

## API Documentation

API documentation is available via Swagger UI at `/api-docs` when the server is running.

### Triangles

- `GET /api/triangles` - Get all triangles
- `GET /api/triangles/:id` - Get a specific triangle
- `GET /api/triangles/:id/area` - Calculate the area and other properties of a triangle
- `POST /api/triangles` - Create a new triangle with three sides (sideA, sideB, sideC)
- `PUT /api/triangles/:id` - Update an existing triangle
- `DELETE /api/triangles/:id` - Delete a triangle

### Health Endpoints

- `GET /api/health` - Get detailed health information about the application
- `GET /ping` - Simple healthcheck endpoint (returns 200 OK)

### Triangle Model

The Triangle model represents a 2D triangle with three sides:

```json
{
  "sideA": 3,
  "sideB": 4,
  "sideC": 5
}
```

The model provides the following virtual properties:

- `area` - Area of the triangle (calculated using Heron's formula)
- `perimeter` - Sum of all sides
- `type` - Type of triangle (Equilateral, Isosceles, or Scalene)
- `isValid` - Whether the triangle satisfies the triangle inequality theorem

The API validates that the triangle is valid using the triangle inequality theorem (the sum of the lengths of any two sides must be greater than the length of the remaining side).

## Deployment on Railway

This application is ready to be deployed on Railway.

For detailed deployment instructions including environment variable troubleshooting, see [DEPLOYMENT.md](DEPLOYMENT.md).

### Deployment Steps

1. Push the code to a GitHub repository
2. Log in to [Railway](https://railway.app/)
3. Click "New Project" and select "Deploy from GitHub repo"
4. Select the repository
5. Railway will automatically detect the Node.js project and set up the build
6. Add the following environment variables in the Railway dashboard:
   - `MONGO_URI` (your MongoDB connection string)
   - `NODE_ENV=production`
   - `FRONTEND_URL` (optional, for CORS configuration - e.g., https://yourfrontend.com)
   - Port will be automatically assigned by Railway

The application is configured with:

- A `Procfile` specifying the web process
- A `railway.json` configuration file
- Health check endpoint at `/api/health`
- Proper build scripts in package.json

### Monitoring

Once deployed, you can monitor the application status through:

- Railway's built-in logs and metrics
- The application's `/api/health` endpoint

### CORS Configuration

The application is configured with CORS (Cross-Origin Resource Sharing) to allow frontend applications to make requests to the API:

- In development mode, all origins are allowed (`*`)
- In production mode, only specified domains are allowed:
  - Update the origins list in `app.ts` with your frontend domain(s)
  - Example: `['https://yourappdomain.com', 'https://*.railway.app']`

To customize CORS settings for your specific use case, modify the CORS configuration in `src/app.ts`.

## License

This project is licensed under the ISC License.
