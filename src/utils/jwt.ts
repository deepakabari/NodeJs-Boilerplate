import { sign, SignOptions, verify } from 'jsonwebtoken';
import { UserRoles } from '../interfaces/user.interface';
import { AuthJwtPayload } from '../interfaces/auth.interface';
import { envConfig } from '../config';

export const signToken = (id: string, role: UserRoles): string => {
  const payload: AuthJwtPayload = { id, role };
  return sign(payload, envConfig.jwt.secret, {
    expiresIn: envConfig.jwt.expiration as SignOptions['expiresIn']
  });
};

export const verifyToken = (token: string) => verify(token, envConfig.jwt.secret) as AuthJwtPayload;
