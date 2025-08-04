import { HTTP_STATUS } from '../constants/http.constant';
import { ExceptionOptions } from '../interfaces/common.interface';
import { HttpException } from './HttpException';

export class UnauthorizedException extends HttpException {
  constructor(message: string, options?: ExceptionOptions) {
    super(HTTP_STATUS.UNAUTHORIZED, message, {
      code: options?.code ?? 'UNAUTHORIZED',
      errors: options?.errors
    });

    Object.setPrototypeOf(this, UnauthorizedException.prototype);
  }
}
