import winston from 'winston';
import { envConfig } from '../config';
import { ENV } from '../interfaces/config';
import { LogMeta } from '../interfaces/logger.interface';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4
};

const level = () =>
  envConfig.logger.level || (envConfig.env === ENV.Development ? 'http' : 'info').toLowerCase();

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white'
};

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.colorize({ all: true }),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.printf((info) => {
    const pid = process.pid;
    const ctx = typeof info.context === 'string' ? `[${info.context}]` : '';
    const level = typeof info.level === 'string' ? info.level : String(info.level);
    const timestamp = typeof info.timestamp === 'string' ? info.timestamp : String(info.timestamp);
    const message = typeof info.message === 'string' ? info.message : JSON.stringify(info.message);
    const stack = typeof info.stack === 'string' ? `\n${info.stack}` : '';

    return `[Node] ${pid}   - ${timestamp}   ${level.padEnd(5)} ${ctx} ${message}${stack}`;
  })
);

const transports = [
  new winston.transports.Console(),
  new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
  new winston.transports.File({ filename: 'logs/all.log' })
];

const baseLogger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports
});

export const logWithContext = (context: string) => {
  const wrap = (level: keyof typeof levels) => {
    return (message: string, meta?: LogMeta | Error) => {
      let finalMeta: LogMeta = { context };

      // If meta is an Error object, extract stack
      if (meta instanceof Error) {
        finalMeta.stack = meta.stack;
        finalMeta.message = meta.message;
      } else if (typeof meta === 'object') {
        finalMeta = { ...finalMeta, ...meta };
      }

      baseLogger.log({ level, message, ...finalMeta });
    };
  };

  return {
    error: wrap('error'),
    warn: wrap('warn'),
    info: wrap('info'),
    debug: wrap('debug'),
    http: wrap('http')
  };
};
