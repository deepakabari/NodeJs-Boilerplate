import { HttpStatus } from '../constants/http.constant';

export abstract class CustomSuccess<T = undefined> {
  readonly success: boolean = true;
  abstract readonly statusCode: HttpStatus;
  protected readonly message: string;
  readonly data?: T;

  constructor(message: string, data?: T) {
    this.data = data;
    this.message = message;
    Object.setPrototypeOf(this, new.target.prototype);
  }

  toJSON() {
    return {
      success: this.success,
      message: this.message,
      ...(this.data !== undefined && { data: this.data })
    };
  }
}
