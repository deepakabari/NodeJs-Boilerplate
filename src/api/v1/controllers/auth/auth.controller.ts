import { NextFunction, Response } from 'express';
import MESSAGES from '../../../../constants/message.constant';
import { LoginBody, RegisterBody } from '../../../../interfaces/auth.interface';
import { created } from '../../../../utils/ApiResponse';
import { logWithContext } from '../../../../utils/logger';
import { loginUser, registerUser } from '../../services/auth.service';
import { RequestWithBody } from '../../../../interfaces/common.interface';
const logger = logWithContext('AuthController');

const register = async (req: RequestWithBody<RegisterBody>, res: Response, next: NextFunction) => {
  try {
    const user = await registerUser(req.body);
    logger.info('User Registered successfully', { userId: user.user._id });
    created(res, MESSAGES.USER_CREATED, user);
    return;
  } catch (error) {
    logger.error('Error while registering user', error as Error);
    next(error);
    return;
  }
};

const login = async (req: RequestWithBody<LoginBody>, res: Response, next: NextFunction) => {
  try {
    const result = await loginUser(req.body);
    logger.info('User logged in successfully', { userId: result.user._id });
    created(res, MESSAGES.USER_LOGGED_IN, result);
    return;
  } catch (error) {
    logger.error('Error while logging in user', error as Error);
    next(error);
    return;
  }
};

export default {
  register,
  login
};
