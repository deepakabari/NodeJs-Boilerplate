import MESSAGES from '../../../constants/message.constant';
import { User } from '../../../db/models/user.model';
import { NotFoundException } from '../../../exceptions';

export const findAllUsers = async () => {
  return await User.find();
};

export const findUserById = async (id: string) => {
  const user = await User.findById(id);
  if (!user) throw new NotFoundException(MESSAGES.USER_NOT_FOUND);
  return user;
};

export const deleteUser = async (id: string) => {
  const deletedUser = await User.findByIdAndDelete(id);
  if (!deletedUser) throw new NotFoundException(MESSAGES.USER_NOT_FOUND);
  return deletedUser;
};
