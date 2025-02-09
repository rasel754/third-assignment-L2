import { Model } from 'mongoose';
import { USER_ROLE } from './user.constan';

export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TUser = {
  _id: string;
  name: TUserName;
  email: string;
  password: string;
  role: 'admin' | 'user';
  isBlocked: boolean;
};

export interface UserModel extends Model<TUser> {
  isUserExistsByEmail(email: string): Promise<TUser>;

  isPasswordMatched(
    plainTextPassword: string,
    hashPassword: string,
  ): Promise<boolean>;

  UserFindBy_Id(id: string): Promise<TUser | null>;
}

export type TUserRole = keyof typeof USER_ROLE;