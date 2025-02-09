import { model, Schema } from 'mongoose';
import { TUser, TUserName, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';



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

const UserSchema = new Schema<TUser, UserModel>(
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


UserSchema.pre('save', async function (next) {
  const user = this;

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});
UserSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});




UserSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await User.findOne({ email }).select('+password');
};

UserSchema.statics.isPasswordMatched = async function (
  plainTextPassword: string,
  hashPassword: string,
) {
  return await bcrypt.compare(plainTextPassword, hashPassword);
};



const User = model<TUser, UserModel>('user', UserSchema);

export default User;
