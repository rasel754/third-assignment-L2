import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/appError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { TUserRole } from '../modules/users/user.interface';
import User from '../modules/users/user.model';
import config from '../config';




const authenticate = (...requiredRole: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, ' you are not authorized');
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { role, userId } = decoded;
  
    const user = await User.UserFindBy_Id(userId);

    if (!user) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        'this user does not exist in the database',
      );
    }

    
    const userStatus = user?.isBlocked;
    if (userStatus === true) {
      throw new AppError(httpStatus.FORBIDDEN, 'User has been blocked');
    }

    if (requiredRole && !requiredRole.includes(role)) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        'you are not authorized to access this resource',
      );
    }

    req.user = decoded;
    next();
  });
};

export default authenticate;
