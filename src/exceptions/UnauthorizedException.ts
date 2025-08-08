import { HTTP_STATUS } from '../constants/http.constant';
import { ExceptionOptions } from '../interfaces/common.interface';
import { Translation } from '../interfaces/config';
import { HttpException } from './HttpException';

export class UnauthorizedException extends HttpException {
  constructor(message: Translation, options?: ExceptionOptions) {
    super(HTTP_STATUS.UNAUTHORIZED, message, {
      code: options?.code ?? 'UNAUTHORIZED',
      errors: options?.errors
    });

    Object.setPrototypeOf(this, UnauthorizedException.prototype);
  }
}
