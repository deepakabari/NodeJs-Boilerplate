import { HTTP_STATUS } from '../constants/http.constant';
import { ExceptionOptions } from '../interfaces/common.interface';
import { HttpException } from './HttpException';

export class ConflictError extends HttpException {
  constructor(message: string, options?: ExceptionOptions) {
    super(HTTP_STATUS.CONFLICT, message, {
      code: options?.code ?? 'CONFLICT_ERROR',
      errors: options?.errors
    });

    Object.setPrototypeOf(this, ConflictError.prototype);
  }
}
