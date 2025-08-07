import { NextFunction, Request, Response } from 'express';
import { NotFoundException } from '../../../../exceptions';
import { success } from '../../../../utils/ApiResponse';
import { logWithContext } from '../../../../utils/logger';
import { deleteUser, findAllUsers, findUserById } from '../../services/user.service';
const logger = logWithContext('UserController');

const getUsers = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await findAllUsers();
    logger.info('Fetched all users', { count: users.length });
    success(res, 'USER_FETCHED', users);
    return;
  } catch (error) {
    logger.error('Failed to fetch users', error as Error);
    next(error);
    return;
  }
};

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await findUserById(req.params.id);
    if (!user) {
      logger.warn('User not found', { userId: req.params.id });
      return next(new NotFoundException('USER_NOT_FOUND'));
    }

    logger.info('Fetched user by ID', { userId: req.params.id });
    success(res, 'USER_FETCHED', user);
    return;
  } catch (error) {
    logger.error(`Failed to fetch user by ID: ${req.params.id}`, error as Error);
    next(error);
    return;
  }
};

const removeUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await deleteUser(req.params.id);
    logger.info('Deleted user successfully', { userId: req.params.id });
    success(res, 'USER_DELETED');
    return;
  } catch (error) {
    logger.error(`Failed to delete user with ID: ${req.params.id}`, error as Error);
    next(error);
    return;
  }
};

export default {
  getUsers,
  getUser,
  removeUser
};
