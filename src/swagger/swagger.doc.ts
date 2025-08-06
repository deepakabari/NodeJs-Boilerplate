import swaggerJsdoc from 'swagger-jsdoc';
import { userSchema } from './schemas/user.schema';
import { errorSchema } from './schemas/error.schema';
import { errorResponse } from './responses/error.response';
import { userResponse } from './responses/user.response';

const commonDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'My API',
    description: 'Node.js API with versioning support via Swagger UI'
  },
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
};

const optionsV1 = {
  definition: {
    ...commonDefinition,
    info: {
      ...commonDefinition.info,
      version: 'v1'
    }
  },
  apis: ['src/api/v1/**/*.ts']
};

const optionsV2 = {
  definition: {
    ...commonDefinition,
    info: {
      ...commonDefinition.info,
      version: 'v2'
    }
  },
  apis: ['src/api/v2/**/*.ts']
};

export const swaggerSpecs = {
  v1: swaggerJsdoc(optionsV1),
  v2: swaggerJsdoc(optionsV2)
};
