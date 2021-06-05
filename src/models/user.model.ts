import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IPost } from './post.model';
import { IImage } from './image.model';

export interface IUser extends Document {
  fullname: string;
  email: string;
  password: string;
  image?: IImage;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  posts: IPost[];

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
    url: {
      type: String,
      default:
        'https://res.cloudinary.com/drv584gsz/image/upload/v1621381544/user-default_gx6h8w.png',
    },
    public_id: String,
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
  ],
});

UserSchema.methods.encryptPassword = async (
  password: string
): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

UserSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

export default model<IUser>('User', UserSchema);
