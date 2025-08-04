import morgan, { StreamOptions } from 'morgan';
import { logWithContext } from '../utils/logger';
import { envConfig } from '../config';
const logger = logWithContext('Morgan');

const stream: StreamOptions = {
  write: (message) => logger.http(message.trim())
};

const skip = () => envConfig.morgan.skip;

export const morganMiddleware = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  { stream, skip }
);
