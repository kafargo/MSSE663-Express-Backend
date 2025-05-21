import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Triangle API',
      version: '1.0.0',
      description: 'API for managing triangles',
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
      contact: {
        name: 'API Support',
        email: 'support@example.com',
      },
    },
    servers: [
      {
        url: '/api',
        description: 'API server',
      },
    ],
    components: {
      schemas: {
        Triangle: {
          type: 'object',
          required: ['sideA', 'sideB', 'sideC'],
          properties: {
            _id: {
              type: 'string',
              description: 'Auto-generated MongoDB ObjectId',
            },
            sideA: {
              type: 'number',
              description: 'Length of side A',
            },
            sideB: {
              type: 'number',
              description: 'Length of side B',
            },
            sideC: {
              type: 'number',
              description: 'Length of side C',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Date triangle was created',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Date triangle was last updated',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false,
            },
            error: {
              type: 'string',
              example: 'Error message',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts', './src/models/*.ts'],
};

export default swaggerJsdoc(options);
