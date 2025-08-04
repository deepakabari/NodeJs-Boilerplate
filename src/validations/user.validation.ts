import { Joi, Segments } from 'celebrate';
import { passwordRegex } from '../constants/constants';

export const registerValidator = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().trim().min(2).max(50).required().messages({
      'string.empty': 'Name is required',
      'string.min': 'Name must be at least 2 characters',
      'string.max': 'Name must be less than 50 characters'
    }),

    email: Joi.string().email().lowercase().required().messages({
      'string.empty': 'Email is required',
      'string.email': 'Please provide a valid email address'
    }),

    password: Joi.string().pattern(passwordRegex).required().messages({
      'string.empty': 'Password is required',
      'string.pattern.base':
        'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character'
    })
  }).strict()
};

export const loginValidator = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().lowercase().required().messages({
      'string.empty': 'Email is required',
      'string.email': 'Please provide a valid email address'
    }),

    password: Joi.string().required().messages({
      'string.empty': 'Password is required'
    })
  }).strict()
};

export const userIdValidator = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().required()
  }).strict()
};
