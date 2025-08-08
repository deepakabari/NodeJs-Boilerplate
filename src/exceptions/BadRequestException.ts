import { HTTP_STATUS } from '../constants/http.constant';
import { ExceptionOptions } from '../interfaces/common.interface';
import { Translation } from '../interfaces/config';
import { HttpException } from './HttpException';

export class BadRequestException extends HttpException {
  constructor(message: Translation, options?: ExceptionOptions) {
    super(HTTP_STATUS.BAD_REQUEST, message, {
      code: options?.code || 'BAD_REQUEST',
      errors: options?.errors
    });

    Object.setPrototypeOf(this, BadRequestException.prototype);
  }
}
