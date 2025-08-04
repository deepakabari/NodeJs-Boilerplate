import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Express, Request, Response } from 'express';
import { corsConfig } from './constants/constants';
import { HTTP_STATUS } from './constants/http.constant';
import MESSAGES from './constants/message.constant';
import { errorHandler } from './middleware/error.middleware';
import { morganMiddleware } from './middleware/morgan.middleware';
import versionedRouteHandler from './middleware/versionRouting.middleware';

// Initialize express app
const app: Express = express();

// Parse request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Enable CORS
app.use(cors(corsConfig));

// Request logging
app.use(morganMiddleware);

// Define a health check route
app.get('/', (_req: Request, res: Response) => {
  res.send('API is working...');
});

app.use(versionedRouteHandler);

app.use((_req: Request, res: Response) => {
  res.status(HTTP_STATUS.NOT_FOUND).json({
    success: false,
    message: MESSAGES.ROUTE_NOT_FOUND
  });
});

// Custom application/global error handler
app.use(errorHandler);

export default app;
