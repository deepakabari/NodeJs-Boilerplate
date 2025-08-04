import { User } from '../../../db/models/user.model';

export const findAllUsers = async () => {
  return await User.find();
};
