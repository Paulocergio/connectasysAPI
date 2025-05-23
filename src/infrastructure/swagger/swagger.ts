import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ConnectaSys API ',
      version: '1.0.0',
    },
    servers: [
      {
      url: 'http://localhost:3000/api/v1',
      },
    ],
  },
  apis: ['./src/modules/**/api/routes/*.ts'],
});

export { swaggerSpec, swaggerUi };
