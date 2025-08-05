import { OpenAPIV3 } from 'openapi-types';

export const userResponse: Record<string, OpenAPIV3.ResponseObject> = {
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
  UserNotFound: {
    description: 'User not found',
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/ErrorResponse' },
        example: {
          status: 404,
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: '❌ User not found.'
          }
        }
      }
    }
  },
  UserDeleted: {
    description: 'User deleted successfully',
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/SuccessResponse' },
        example: {
          status: 200,
          success: true,
          message: '🗑️ User deleted successfully.'
        }
      }
    }
  }
};
