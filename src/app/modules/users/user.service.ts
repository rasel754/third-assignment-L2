
import AppError from "../../errors/appError";
import { TUser } from "./user.interface";
import User from "./user.model";
import httpStatus from 'http-status';


const createUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);

  return result;
};

const blockUserByAdmin = async (userId: string) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (user.isBlocked) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User is already blocked');
  }

  user.isBlocked = true;
  await user.save();
};


export const UserServices = {
  createUserIntoDB,
  blockUserByAdmin,
};
