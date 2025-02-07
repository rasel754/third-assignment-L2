import { model, Schema } from 'mongoose';
import { IUser, TUserName } from './user.interface';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'first name is required '],
    trim: true,
    minlength:[3 ,'min length is required'],
    maxlength: [25, 'name can not be more then 20'],
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
});

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: userNameSchema,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const User = model<IUser>('user', UserSchema);

export default User;
