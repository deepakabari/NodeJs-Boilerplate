export interface DBConfig {
  mongodbUri: string;
}

export enum ENV {
  Development = 'development',
  Production = 'production'
}

export const envOptions = [ENV.Development, ENV.Production];
