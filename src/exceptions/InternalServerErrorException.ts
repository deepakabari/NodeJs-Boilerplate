import { HTTP_STATUS } from '../constants/http.constant';
import { ExceptionOptions } from '../interfaces/common.interface';
import { Translation } from '../interfaces/config';
import { HttpException } from './HttpException';

export class InternalServerErrorException extends HttpException {
  constructor(message: Translation, options?: ExceptionOptions) {
    super(HTTP_STATUS.INTERNAL_SERVER_ERROR, message, {
      code: options?.code ?? 'INTERNAL_SERVER_ERROR',
      errors: options?.errors
    });

    Object.setPrototypeOf(this, InternalServerErrorException.prototype);
  }
}
