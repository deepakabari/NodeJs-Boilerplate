import { CorsOptions } from 'cors';
import { ValidationOptions } from 'joi';

export const corsConfig: CorsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

export const joiOptions: ValidationOptions = {
  errors: {
    wrap: {
      label: ''
    }
  }
};

export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!#$%^&*])[A-Za-z\d@!#$%^&*]{8,20}$/;

export const LANGUAGE = <const>{
  ENGLISH: 'en',
  JAPANESE: 'ja'
};

export type LANGUAGE_TYPE = (typeof LANGUAGE)[keyof typeof LANGUAGE];
