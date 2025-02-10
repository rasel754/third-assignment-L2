import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.createUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user is created is successfully',
    data: result,
  });
});

const blockUser = catchAsync(async (req, res) => {
  const { userId } = req.params;

  const result = await UserServices.blockUserByAdmin(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User blocked successfully',
    data: result,
  });
});

export const UserController = {
  createUser,
  blockUser,
};
