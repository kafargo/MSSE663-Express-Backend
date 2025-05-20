# MSSE663-Express-Backend

Express backend for the MSSE 663 class built with TypeScript and MongoDB

## Description

This is a RESTful API built with Express and TypeScript that connects to MongoDB. The application follows the MVC architecture with separate directories for routes, controllers, and models. It provides endpoints to interact with the 'triangle' collection in the MSSE663 database.

## Project Structure

```
├── src/
│   ├── app.ts                # Main application entry point
│   ├── config/               # Configuration files
│   │   └── db.ts             # Database connection
│   ├── controllers/          # Request handlers
│   │   └── triangle.controller.ts
│   ├── middleware/           # Custom middleware
│   │   └── error.middleware.ts
│   ├── models/               # Database models
│   │   └── triangle.model.ts
│   ├── routes/               # API routes
│   │   └── triangle.routes.ts
│   └── types/                # TypeScript type definitions
```

## Installation

```bash
# Install dependencies
npm install
```

## Configuration

Create a `.env` file in the root directory with the following variables:

```
MONGO_URI=mongodb://mongo:kPlPXeanRpHsLcnkWpMeOleSiTWdecXN@maglev.proxy.rlwy.net:15100/MSSE663
PORT=3000
NODE_ENV=development
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
```

## Testing

The application includes:

1. A simple HTML/JavaScript UI for testing the API available at the root URL (http://localhost:3000)
2. A Postman collection file (`MSSE663_Triangle_API.postman_collection.json`) that can be imported into Postman

## API Endpoints

### Triangles

- `GET /api/triangles` - Get all triangles
- `GET /api/triangles/:id` - Get a specific triangle
- `GET /api/triangles/:id/area` - Calculate the area of a triangle
- `POST /api/triangles` - Create a new triangle with three sides (sideA, sideB, sideC)
- `PUT /api/triangles/:id` - Update an existing triangle
- `DELETE /api/triangles/:id` - Delete a triangle

### Triangle Model

The Triangle model represents a 2D triangle with three sides:

```json
{
  "sideA": 3,
  "sideB": 4,
  "sideC": 5
}
```

The API validates that the triangle is valid using the triangle inequality theorem (the sum of the lengths of any two sides must be greater than the length of the remaining side).

## License

This project is licensed under the ISC License.
