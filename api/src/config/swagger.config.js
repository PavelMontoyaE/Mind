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
    host: 'localhost:3030',
    basePath: '/api',
    servers: [
      {
        url: 'http://localhost:3030',
        description: 'Development server'
      },
    ],
  },
  apis: ['./src/routes/*.routes.js'],
};

export default swaggerJsdoc(options);
