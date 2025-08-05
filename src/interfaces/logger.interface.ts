export type LogLevel = 'error' | 'warn' | 'info' | 'http' | 'debug';

export interface LogMeta {
  context?: string;
  errorCode?: number;
  stack?: string;
  [key: string]: any;
}
