import swaggerJsdoc from 'swagger-jsdoc';
import { OpenAPIV3 } from 'openapi-types';
import { userSchema } from './schemas/user.schema';
import { errorSchema } from './schemas/error.schema';
import { errorResponse } from './responses/error.response';
import { userResponse } from './responses/user.response';

export const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'NodeJs Boilerplate',
      version: '1.0.0',
      description:
        'A scalable, maintainable Node.js backend built with TypeScript, Express, MongoDB, and best practices for modern development.'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        ...userSchema,
        ...errorSchema
      },
      responses: {
        ...errorResponse,
        ...userResponse
      }
    }
  },
  apis: ['./src/api/v1/routes/*.ts', './src/api/v2/routes/*.ts']
};

export const swaggerSpec: OpenAPIV3.Document = swaggerJsdoc(swaggerOptions) as OpenAPIV3.Document;
