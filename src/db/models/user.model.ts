import mongoose, { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser, UserRoles } from '../../interfaces/user.interface';
import { signToken } from '../../utils/jwt';

interface IUserMethods {
  signToken(): string;
}

const userSchema = new Schema<IUser, mongoose.Model<IUser, object, IUserMethods>, IUserMethods>(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: Object.values(UserRoles), default: UserRoles.User }
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret: Partial<IUser>) {
        if (ret.password) delete ret.password;
        return ret;
      }
    },
    toObject: {
      transform(_doc, ret: Partial<IUser>) {
        if (ret.password) delete ret.password;
        return ret;
      }
    }
  }
);

userSchema.pre<IUser>('save', async function (next) {
  if (this.isModified('password')) {
    const saltRounds = Number(process.env.SALT) || 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password as string);
};

userSchema.methods.signToken = function (): string {
  return signToken(this._id.toString(), this.role);
};

const User = model<IUser, mongoose.Model<IUser, object, IUserMethods>>('User', userSchema);

export { User, IUser, IUserMethods };
