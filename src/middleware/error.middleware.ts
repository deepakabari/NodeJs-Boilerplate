import { ErrorRequestHandler, NextFunction, Response } from 'express';
import { HttpException } from '../exceptions/HttpException';
import { logWithContext } from '../utils/logger';
import { HTTP_STATUS, HttpStatus } from '../constants/http.constant';
import MESSAGES from '../constants/message.constant';
import { isCelebrateError } from 'celebrate';
import { ValidationError as JoiValidationError } from 'joi';
import { CustomRequest, ExtendedError } from '../interfaces/common.interface';
import { AxiosError } from 'axios';
const logger = logWithContext('ErrorMiddleware');

export class ApiError extends Error {
  public readonly statusCode: HttpStatus;
  public readonly errors?: Record<string, unknown>;
  public readonly success: boolean = false;

  constructor(
    message: string,
    statusCode: HttpStatus = HTTP_STATUS.INTERNAL_SERVER_ERROR,
    errors: Record<string, unknown> = {}
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler: ErrorRequestHandler = (
  err: unknown,
  req: CustomRequest,
  res: Response,
  _next: NextFunction
) => {
  let statusCode: HttpStatus = HTTP_STATUS.INTERNAL_SERVER_ERROR;
  let message: string = MESSAGES.SERVER_ERROR;
  let errors: Record<string, unknown> | undefined = undefined;
  let errorCode: string = MESSAGES.INTERNAL_SERVER_ERROR;
  const requestId = req.headers['x-request-id'] || req.id || undefined;

  if (isCelebrateError(err)) {
    statusCode = HTTP_STATUS.BAD_REQUEST;
    errorCode = MESSAGES.VALIDATION_ERROR;

    for (const [, joiError] of err.details.entries()) {
      const valitionMessage = joiError.details[0]?.message;
      if (valitionMessage) {
        message = `Validation failed. - ${valitionMessage}`;
        break;
      }
    }
  }

  // Custom JoiValidationError
  else if (err instanceof JoiValidationError) {
    statusCode = HTTP_STATUS.BAD_REQUEST;
    message = MESSAGES.VALIDATION_FAILED;
    errorCode = MESSAGES.VALIDATION_ERROR;
    errors = {
      validationErrors: err.details.map((detail) => detail.message)
    };
  } else if (err instanceof AxiosError) {
    statusCode = err.status as HttpStatus;
    message = err.message;
    errorCode = err.code || 'HTTP_ERROR';
  }

  // Custom HttpExceptions
  else if (err instanceof HttpException || err instanceof ApiError) {
    const error = err as ExtendedError;
    statusCode = error.statusCode;
    message = error.message;
    errorCode = error.code || 'HTTP_ERROR';
    errors = error.errors;
  } else if (err instanceof Error) {
    message = err.message;
  }

  logger.error('Error Handled', {
    message,
    stack: (err as Error).stack,
    errors,
    code: errorCode,
    requestId
  });

  res.status(statusCode).json({
    success: false,
    error: {
      code: errorCode,
      message,
      details: errors
    }
  });
  return;
};
