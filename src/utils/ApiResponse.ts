import type { Response } from 'express';
import { CustomSuccess, Created, Success } from '../responses';

export function sendSuccess<T>(res: Response, success: CustomSuccess<T>) {
  return res.status(success.statusCode).json(success.toJSON());
}

export function success<T>(res: Response, messageKey: string, data?: T) {
  const localizedMessage = res.__(messageKey);
  const success = new Success(localizedMessage, data);
  return sendSuccess(res, success);
}

export function created<T>(res: Response, messageKey: string, data?: T) {
  const localizedMessage = res.__(messageKey);
  const created = new Created(localizedMessage, data);
  return sendSuccess(res, created);
}
