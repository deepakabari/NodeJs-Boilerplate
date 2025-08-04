import { Document, Types } from 'mongoose';

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: UserRoles;
  comparePassword(password: string): Promise<boolean>;
  signToken(): string;
}

export enum UserRoles {
  User = 'user',
  Admin = 'admin',
  Bot = 'bot'
}

export const userRoles = <const>[UserRoles.User, UserRoles.Admin];
