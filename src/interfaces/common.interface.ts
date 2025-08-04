import { Request } from 'express';
import { HttpStatus } from '../constants/http.constant';

export interface CustomRequest extends Request {
  id?: string;
}

export interface ExtendedError extends Error {
  statusCode: HttpStatus;
  code?: string;
  errors?: Record<string, unknown>;
}

export interface ExceptionOptions {
  code?: string;
  errors?: Record<string, unknown>;
}

export type TypedRequest<
  Params = Record<string, unknown>,
  ResBody = unknown,
  ReqBody = unknown,
  ReqQuery = Record<string, unknown>
> = Request<Params, ResBody, ReqBody, ReqQuery>;

export type RequestEmpty = TypedRequest;

export type RequestWithBody<B> = TypedRequest<Record<string, never>, unknown, B>;

export type RequestWithParams<P> = TypedRequest<P>;

export type RequestWithQuery<Q> = TypedRequest<Record<string, never>, unknown, unknown, Q>;

export type RequestWithParamsAndBody<P, B> = TypedRequest<P, unknown, B>;

export type RequestWithParamsAndQuery<P, Q> = TypedRequest<P, unknown, unknown, Q>;

export type RequestWithBodyAndQuery<B, Q> = TypedRequest<Record<string, never>, unknown, B, Q>;

export type FullTypedRequest<P, B, Q> = TypedRequest<P, unknown, B, Q>;
