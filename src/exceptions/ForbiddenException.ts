import { HTTP_STATUS } from '../constants/http.constant';
import { ExceptionOptions } from '../interfaces/common.interface';
import { HttpException } from './HttpException';

export class ForbiddenError extends HttpException {
  constructor(message: string, options?: ExceptionOptions) {
    super(HTTP_STATUS.ACCESS_FORBIDDEN, message, {
      code: options?.code ?? 'FORBIDDEN_ERROR',
      errors: options?.errors
    });

    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}
