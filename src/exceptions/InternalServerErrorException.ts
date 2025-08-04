import { HTTP_STATUS } from '../constants/http.constant';
import { ExceptionOptions } from '../interfaces/common.interface';
import { HttpException } from './HttpException';

export class InternalServerErrorException extends HttpException {
  constructor(message: string, options?: ExceptionOptions) {
    super(HTTP_STATUS.INTERNAL_SERVER_ERROR, message, {
      code: options?.code ?? 'INTERNAL_SERVER_ERROR',
      errors: options?.errors
    });

    Object.setPrototypeOf(this, InternalServerErrorException.prototype);
  }
}
