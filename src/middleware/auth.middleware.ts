import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { logWithContext } from '../utils/logger';
import { CustomJwtPayload } from '../interfaces/auth.interface';
import MESSAGES from '../constants/message.constant';
import { HttpException, UnauthorizedException } from '../exceptions';
import { envConfig } from '../config';
const logger = logWithContext('AuthMiddleware');

const JWT_SECRET = envConfig.jwt.secret;

// Middleware for authenticating JWT tokens
export default (req: Request, _res: Response, next: NextFunction): void => {
  try {
    // Retrieve the Authorization header from the request
    const authHeader: string | undefined = req.get('Authorization');

    // If the Authorization header is missing, log the event and throw an error
    if (!authHeader) {
      logger.info(MESSAGES.HEADER_MISSING);
      throw new UnauthorizedException(MESSAGES.UNAUTHORIZED);
    }

    // Extract the token from the Authorization header
    const token = authHeader.split(' ')[1];

    // Decode the JWT token using the secret key
    const decodedToken = jwt.verify(token, JWT_SECRET) as CustomJwtPayload;

    // If the token could not be decoded, log the event and throw an error
    if (!decodedToken) {
      logger.warn(MESSAGES.INVALID_TOKEN);
      throw new UnauthorizedException(MESSAGES.UNAUTHORIZED);
    }
    // Attach the decoded token to the request object
    req.user = decodedToken;

    // Log the successful authorization of the user
    logger.info(MESSAGES.AUTHORIZED(req.user.id));

    // Proceed to the next middleware
    next();
  } catch (error) {
    if (error instanceof Error) {
      logger.error('An error occurred during authorization', error);
    } else {
      logger.error('An error occurred during authorization', { error: String(error) });
    }

    if (error instanceof HttpException) {
      throw error;
    }

    throw new UnauthorizedException(MESSAGES.UNAUTHORIZED);
  }
};
