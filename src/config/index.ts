import dotenv from 'dotenv';
import { get, getBool, getEnum, getNum, validateEnv } from '../utils/env';
import { DBConfig, ENV, envOptions } from '../interfaces/config';

dotenv.config({ quiet: true });

const NODE_ENV = getEnum('NODE_ENV', envOptions) ?? ENV.Development;
const PORT = getNum('PORT', 3000)!;
const MONGODB_URI = get('MONGODB_URI');
const JWT_SECRET = get('JWT_SECRET');
const JWT_EXPIRATION = get('JWT_EXPIRATION');
const LOG_LEVEL = get('LOG_LEVEL', false) || 'info';
const MORGAN_LOGGING = getBool('MORGAN_LOGGING');
const SALT_ROUNDS = getNum('SALT_ROUNDS', 10);

validateEnv();

export const dbConfig: DBConfig = {
  mongodbUri: MONGODB_URI
};

const config = envOptions.reduce(
  (acc, env) => {
    acc[env] = {
      ...dbConfig
    };
    return acc;
  },
  {} as Partial<Record<ENV, DBConfig>>
);

export const envConfig = <const>{
  env: NODE_ENV,
  port: PORT,
  isDevelopment: NODE_ENV === ENV.Development,
  db: dbConfig,
  jwt: {
    secret: JWT_SECRET,
    expiration: JWT_EXPIRATION
  },
  logger: {
    level: LOG_LEVEL
  },
  morgan: {
    skip: !MORGAN_LOGGING || NODE_ENV !== ENV.Development
  },
  bcrypt: {
    saltRounds: SALT_ROUNDS
  }
};

export default config;
