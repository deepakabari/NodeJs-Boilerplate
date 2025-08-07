import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Express, Request, Response } from 'express';
import { corsConfig } from './constants/constants';
import { errorHandler } from './middleware/error.middleware';
import { morganMiddleware } from './middleware/morgan.middleware';
import versionedRouteHandler from './middleware/versionRouting.middleware';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpecs } from './swagger/swagger.doc';
import i18nMiddleware from './middleware/i18n.middleware';

// Initialize express app
const app: Express = express();

// Parse request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Enable CORS
app.use(cors(corsConfig));

// Localization for en and ja
app.use(i18nMiddleware);

// Request logging
app.use(morganMiddleware);

app.get('/swagger/v1.json', (_req, res) => res.json(swaggerSpecs.v1));
app.get('/swagger/v2.json', (_req, res) => res.json(swaggerSpecs.v2));

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    explorer: true,
    swaggerOptions: {
      urls: [
        { url: '/swagger/v1.json', name: 'v1' },
        { url: '/swagger/v2.json', name: 'v2' }
      ],
      docExpansion: 'none'
    }
  })
);

// Define a health check route
app.get('/', (_req: Request, res: Response) => {
  res.send('API is working...');
});

app.use(versionedRouteHandler);

// Custom application/global error handler
app.use(errorHandler);

export default app;
