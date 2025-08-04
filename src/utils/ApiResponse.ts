import type { Response } from 'express';
import { CustomSuccess, Created, Success } from '../responses';

export function sendSuccess<T>(res: Response, success: CustomSuccess<T>) {
  return res.status(success.statusCode).json(success.toJSON());
}

export function success<T>(res: Response, message: string, data?: T) {
  const success = new Success(message, data);
  return sendSuccess(res, success);
}

export function created<T>(res: Response, message: string, data?: T) {
  const created = new Created(message, data);
  return sendSuccess(res, created);
}
