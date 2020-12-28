import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mind Courses API',
      version: '1.0.0',
      description: 'This is an API for Courses developed in mind',
      contact: {
        name: 'Pavel M',
        url: 'https://www.arkusnexus.com/',
        email: 'pmontoya@arkusnexus.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3030/api/v1',
        description: 'Development server v1',
      },
      {
        url: 'http://localhost:3030/api/v2',
        description: 'Development server v2',
      },
    ],
    paths: {
      '/user': {
        get: {
          summary: 'Retrieve all user',
          responses: {
            200: {
              description: 'All user',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.routes.js'],
};

export default swaggerJsdoc(options);
