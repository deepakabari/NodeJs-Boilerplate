import { HTTP_STATUS } from '../constants/http.constant';
import { ExceptionOptions } from '../interfaces/common.interface';
import { Translation } from '../interfaces/config';
import { HttpException } from './HttpException';

export class NotFoundException extends HttpException {
  constructor(message: Translation, options?: ExceptionOptions) {
    super(HTTP_STATUS.NOT_FOUND, message, {
      code: options?.code ?? 'NOT_FOUND',
      errors: options?.errors
    });

    Object.setPrototypeOf(this, NotFoundException.prototype);
  }
}
