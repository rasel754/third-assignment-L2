import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from 'http-status';
import { AuthService } from "./auth.service";


const loginUser = catchAsync(async (req, res) => {
  const result = await AuthService.logingUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user is logged in successfully',
    data: result,
  });
});


export const registerUser = catchAsync(async (req, res) => {
  const user = await AuthService.registerUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User registered successfully',
    data: user,
  });
});


export const AuthController={
  loginUser,
  registerUser,
  
}