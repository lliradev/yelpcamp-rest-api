import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  fullname: string;
  email: string;
  password: string;
  image?: {
    secure_url: string;
    public_id: string;
  };
  resetPasswordToken?: String;
  resetPasswordExpires?: Date;

  encryptPassword(password: string): Promise<string>;
  comparePassword(password: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
  fullname: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  image: {
    secure_url: {
      type: String,
      default:
        'https://res.cloudinary.com/drv584gsz/image/upload/v1621381544/user-default_gx6h8w.png',
    },
    public_id: String,
  },
});

UserSchema.methods.encryptPassword = async (
  password: string
): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

UserSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

export default model<IUser>('User', UserSchema);
