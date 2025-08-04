import { HTTP_STATUS } from '../constants/http.constant';
import { ExceptionOptions } from '../interfaces/common.interface';
import { HttpException } from './HttpException';

export class BadRequestException extends HttpException {
  constructor(message: string, options?: ExceptionOptions) {
    super(HTTP_STATUS.BAD_REQUEST, message, {
      code: options?.code || 'BAD_REQUEST',
      errors: options?.errors
    });

    Object.setPrototypeOf(this, BadRequestException.prototype);
  }
}
