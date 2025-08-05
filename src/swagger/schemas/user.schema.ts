import { OpenAPIV3 } from 'openapi-types';

export const userSchema: Record<string, OpenAPIV3.SchemaObject> = {
  User: {
    type: 'object',
    properties: {
      _id: { type: 'string', example: '68918d647a8dcc287fbbeb7b' },
      name: { type: 'string', example: 'John Doe' },
      email: { type: 'string', example: 'john@example.com' },
      role: { type: 'string', example: 'user' },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' }
    }
  },
  RegisterBody: {
    type: 'object',
    required: ['name', 'email', 'password'],
    properties: {
      name: { type: 'string', example: 'John Doe' },
      email: { type: 'string', example: 'john@example.com' },
      password: { type: 'string', example: 'StrongPassword123!' }
    }
  },
  LoginBody: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: { type: 'string', example: 'john@example.com' },
      password: { type: 'string', example: 'StrongPassword123!' }
    }
  }
};
