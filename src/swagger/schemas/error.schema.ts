import { OpenAPIV3 } from 'openapi-types';

export const errorSchema: Record<string, OpenAPIV3.SchemaObject> = {
  ErrorDetails: {
    type: 'object',
    properties: {
      validationErrors: {
        type: 'array',
        items: { type: 'string' },
        example: ['email is required', 'password must be strong']
      }
    }
  },
  ErrorResponse: {
    type: 'object',
    properties: {
      status: { type: 'number', example: 400 },
      success: { type: 'boolean', example: false },
      error: {
        type: 'object',
        properties: {
          code: { type: 'string', example: 'VALIDATION_ERROR' },
          message: { type: 'string', example: 'Validation failed. - email is required' },
          details: { $ref: '#/components/schemas/ErrorDetails' }
        }
      }
    }
  },
  UnauthorizedError: {
    allOf: [{ $ref: '#/components/schemas/ErrorResponse' }]
  },
  ValidationError: {
    allOf: [{ $ref: '#/components/schemas/ErrorResponse' }]
  },
  InternalServerError: {
    allOf: [{ $ref: '#/components/schemas/ErrorResponse' }],
    example: {
      status: 500,
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: '💥 Something went wrong on our end. Please try again later.'
      }
    }
  }
};
