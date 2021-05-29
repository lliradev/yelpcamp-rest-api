import { Schema, model, Document } from 'mongoose';
import { IReview } from './review.model';
import { IUser } from './user.model';

export interface IPost extends Document {
  title: string;
  price: string;
  description: string;
  images: string[];
  location: string;
  lat: number;
  lng: number;
  author: IUser;
  reviews: IReview[];
}

const PostSchema = new Schema<IPost>({
  title: String,
  price: String,
  description: String,
  images: [String],
  location: String,
  lat: Number,
  lng: Number,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
});

export default model<IPost>('Post', PostSchema);
