import en from '../locale/en.json';
import ja from '../locale/ja.json';

export interface DBConfig {
  mongodbUri: string;
}

export enum ENV {
  Development = 'development',
  Production = 'production'
}

export const envOptions = [ENV.Development, ENV.Production];

export type Translation = keyof typeof en & keyof typeof ja;
