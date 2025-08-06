import { HttpStatus } from '../constants/http.constant';

export class HttpException extends Error {
  statusCode: HttpStatus;
  message: string;
  code?: string;
  errors?: Record<string, unknown>;

  constructor(
    statusCode: HttpStatus,
    message: string,
    options?: {
      code?: string;
      errors?: Record<string, unknown>;
    }
  ) {
    super(message);
    this.statusCode = statusCode;
    this.code = options?.code;
    this.errors = options?.errors;

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}
