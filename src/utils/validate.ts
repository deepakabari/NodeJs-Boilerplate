import { celebrate, Joi, CelebrateOptions } from 'celebrate';
import { joiOptions } from '../constants/constants';

export function makeValidator(schema: Record<string, Joi.Schema>, options?: CelebrateOptions) {
  return celebrate(schema, joiOptions, options);
}
