import mongoose from 'mongoose';
import config, { envConfig } from '../config';
import { envOptions } from '../interfaces/config';
import { logWithContext } from '../utils/logger';
import MESSAGES from '../constants/message.constant';
const logger = logWithContext('db');

const cfg = envOptions.includes(envConfig.env) ? config[envConfig.env] : config.development;

if (!cfg) {
  const errorMessage = `Database configuration for environment "${envConfig.env}" is not defined.`;
  logger.error(errorMessage);
  process.exit(1);
}

const { mongodbUri } = cfg;

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongodbUri);
    const successMessage = MESSAGES.DB_CONNECTED;
    logger.info(successMessage);
  } catch (error) {
    const isError = error instanceof Error;
    const message = isError ? error.message : JSON.stringify(error);
    logger.info('Database connection failed', isError ? error : { raw: message });
    const errorMessage = `Unable to connect to the database: ${error instanceof Error ? error.message : JSON.stringify(error)}`;
    logger.error(errorMessage);
    process.exit(1);
  }
};

export const closeDatabaseConnection = async () => {
  try {
    await mongoose.connection.close();
    const successMessage = MESSAGES.DB_DISCONNECTED;
    logger.info(successMessage);
  } catch (error) {
    const errorMessage = `Error closing the database connection: ${error instanceof Error ? error.message : JSON.stringify(error)}`;
    logger.error(errorMessage);
  }
};
