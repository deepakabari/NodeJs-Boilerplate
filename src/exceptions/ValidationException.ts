import { HTTP_STATUS } from '../constants/http.constant';
import { ExceptionOptions } from '../interfaces/common.interface';
import { Translation } from '../interfaces/config';
import { HttpException } from './HttpException';

export class ValidationException extends HttpException {
  validation?: {
    keys: string[];
    message: string;
  };

  constructor(message: Translation, keys: string[] = [], options?: ExceptionOptions) {
    super(HTTP_STATUS.UNPROCESSABLE_CONTENT, message, {
      code: options?.code ?? 'VALIDATION_ERROR',
      errors: { keys }
    });

    this.validation = {
      keys,
      message
    };

    Object.setPrototypeOf(this, ValidationException.prototype);
  }
}
