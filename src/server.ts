import app from './app';
import { envConfig } from './config';
import { connectToDatabase } from './db/db';
import { logWithContext } from './utils/logger';
const logger = logWithContext('Server');

const PORT = envConfig.port;

async function bootstrap() {
  try {
    await connectToDatabase();
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
      logger.info(`Swagger docs available at http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    logger.error('Error while starting server', error as Error);
    process.exit(1);
  }
}

void bootstrap();
