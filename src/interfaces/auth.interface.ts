import { JwtPayload } from 'jsonwebtoken';
import { UserRoles } from './user.interface';

interface CustomJwtPayload extends JwtPayload {
  id: number;
  email: string;
  name: string;
}

interface RegisterBody {
  name: string;
  email: string;
  password: string;
}

interface LoginBody {
  email: string;
  password: string;
}

interface AuthResponse {
  user: object;
  token?: string;
}

export interface AuthJwtPayload extends JwtPayload {
  id: string;
  role: UserRoles;
}

export { CustomJwtPayload, RegisterBody, LoginBody, AuthResponse };
