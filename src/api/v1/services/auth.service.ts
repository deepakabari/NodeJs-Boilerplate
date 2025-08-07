import { User } from '../../../db/models/user.model';
import { BadRequestException, UnauthorizedException } from '../../../exceptions';
import { LoginBody, RegisterBody } from '../../../interfaces/auth.interface';
import { logWithContext } from '../../../utils/logger';
const logger = logWithContext('AUTH_SERVICE');

export const registerUser = async (body: RegisterBody) => {
  const { email } = body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    logger.warn('Registration failed: user already exists', { email });
    throw new BadRequestException('USER_ALREADY_EXISTS', {
      code: 'USER_ALREADY_EXISTS'
    });
  }

  const user = await User.create(body);
  logger.info('User registered successfully', { email: user.email });
  return { user };
};

export const loginUser = async (body: LoginBody) => {
  const { email, password } = body;

  const user = await User.findOne({ email });
  if (!user) {
    logger.warn('Login failed: user not found', { email });
    throw new UnauthorizedException('INVALID_CREDENTIALS', {
      code: 'AUTH_INVALID_CREDENTIALS'
    });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    logger.warn('Login failed: password does not match', { email });
    throw new UnauthorizedException('PASSWORD_DOES_NOT_MATCH', {
      code: 'AUTH_PASSWORD_INCORRECT'
    });
  }

  const token = user.signToken();
  logger.info('User logged in successfully', { email: user.email });
  return { user, token };
};
