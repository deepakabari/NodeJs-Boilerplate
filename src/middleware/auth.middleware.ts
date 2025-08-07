import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { logWithContext } from '../utils/logger';
import { CustomJwtPayload } from '../interfaces/auth.interface';
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
      logger.info('HEADER_MISSING');
      throw new UnauthorizedException('UNAUTHORIZED');
    }

    // Extract the token from the Authorization header
    const token = authHeader.split(' ')[1];

    // Decode the JWT token using the secret key
    const decodedToken = jwt.verify(token, JWT_SECRET) as CustomJwtPayload;

    // If the token could not be decoded, log the event and throw an error
    if (!decodedToken) {
      logger.warn('INVALID_TOKEN');
      throw new UnauthorizedException('UNAUTHORIZED');
    }
    // Attach the decoded token to the request object
    req.user = decodedToken;

    // Log the successful authorization of the user
    logger.info('AUTHORIZED');

    // Proceed to the next middleware
    next();
  } catch (error) {
    logger.error('An error occurred during authorization', error as Error);

    if (error instanceof HttpException) {
      throw error;
    }

    throw new UnauthorizedException('UNAUTHORIZED');
  }
};
