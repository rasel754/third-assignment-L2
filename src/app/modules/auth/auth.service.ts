import AppError from '../../errors/appError';
import { TUser } from '../users/user.interface';
import User from '../users/user.model';
import bcrypt from 'bcrypt';
import { TLoginUser } from './auth.interface';
import httpStatus from 'http-status';
import config from '../../config';

const logingUser = async (payload: TLoginUser) => {
  console.log(payload);
  const user = await User.isUserExistsByEmail(payload.email);

  if (!user) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'this user does not exist in the database',
    );
  }

  const isBlocked = user?.isBlocked;
  if (isBlocked) {
    throw new AppError(httpStatus.FORBIDDEN, 'this user has been blocked');
  }

  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'password mismatch');
  }

  return {};
};


const registerUser = async (payload: TUser) => {

  const existingUser = await User.findOne({ email: payload.email });
  if (existingUser) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User already exists');
  }

  const hashedPassword = await bcrypt.hash(payload.password, config.bcrypt_salt_rounds as string);
  payload.password = hashedPassword;


  const newUser = await User.create(payload);

  return newUser;
};


export const AuthService = {
  logingUser,
  registerUser,
};