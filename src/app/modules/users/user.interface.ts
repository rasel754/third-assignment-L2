export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type IUser = {
  name: TUserName;
  email: string;
  password: string;
  role: 'admin' | 'user';
  isBlocked: boolean;
};
