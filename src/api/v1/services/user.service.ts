import MESSAGES from '../../../constants/message.constant';
import { User } from '../../../db/models/user.model';
import { NotFoundException } from '../../../exceptions';
import axios, { AxiosResponse } from 'axios';

interface Geo {
  lat: string;
  lng: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

// Error response interface
export interface ApiError {
  status: number;
  success: boolean;
  error: {
    code: string;
    message: string;
  };
}

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

export const getUsersFromThirdPartyService = async (): Promise<User | ApiError> => {
  const users: AxiosResponse<User[] | ApiError> = await axios.get(
    'http://localhost:3000/users/aasd',
    { validateStatus: () => true }
  );
  console.log('>>>>>>>>>', users.data);

  if (Array.isArray(users.data)) {
    const user = users.data[0];
    return {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      address: user.address,
      phone: user.phone,
      website: user.website,
      company: user.company
    };
  } else {
    return {
      status: users.data.status || 500,
      success: false,
      error: {
        code: users.data.error.code || 'Unknown error code',
        message: users.data.error.message || 'Unknown error message'
      }
    };
  }
};
