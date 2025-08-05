import { OpenAPIV3 } from 'openapi-types';

export const errorResponse: Record<string, OpenAPIV3.ResponseObject> = {
  UnauthorizedMissingToken: {
    description: 'Missing or Invalid JWT token',
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/UnauthorizedError' },
        example: {
          status: 401,
          success: false,
          error: {
            code: 'UNAUTHORIZED',
            message: '🔐 Unauthorized. Please log in.'
          }
        }
      }
    }
  },
  UnauthorizedInvalidCredentials: {
    description: 'Invalid email or password during login',
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/UnauthorizedError' },
        example: {
          status: 401,
          success: false,
          error: {
            code: 'AUTH_INVALID_CREDENTIALS',
            message: '🚫 Invalid email or password. Please try again.'
          }
        }
      }
    }
  },
  ValidationErrorMissingUserId: {
    description: 'Validation error',
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/ValidationError' },
        example: {
          status: 400,
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Validation failed. - id is required'
          }
        }
      }
    }
  },
  ValidationErrorMissingEmail: {
    description: 'Validation error',
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/ValidationError' },
        example: {
          status: 400,
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Validation failed. - email is required'
          }
        }
      }
    }
  },
  InternalServerError: {
    description: 'Internal server error',
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/InternalServerError' }
      }
    }
  }
};
