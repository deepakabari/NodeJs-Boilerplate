import { NextFunction, Request, Response } from 'express';
import { success } from '../../../../utils/ApiResponse';
import { logWithContext } from '../../../../utils/logger';
import { findAllUsers } from '../../services/user.service';
const logger = logWithContext('UserController');

const getUsers = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await findAllUsers();
    logger.info('Fetched all users from V2', { count: users.length });
    success(res, 'USER_FETCHED_V2', users);
    return;
  } catch (error) {
    logger.error('Failed to fetch users V2', error as Error);
    next(error);
    return;
  }
};

export default {
  getUsers
};
