import { HTTP_STATUS, HttpStatus } from '../constants/http.constant';
import { CustomSuccess } from './CustomSuccess';

export class Created<T> extends CustomSuccess<T> {
  readonly statusCode: HttpStatus = HTTP_STATUS.CREATED;
  readonly message: string;
  readonly data: T;

  constructor(message: string, data: T) {
    super(message, data);
    this.data = data;
    this.message = message;
  }
}
