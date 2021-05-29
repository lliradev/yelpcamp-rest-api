import { Document, model, PaginateModel, Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { IReview } from './review.model';
import { IUser } from './user.model';

export interface IPost extends Document {
  title: string;
  price: string;
  description: string;
  images?: string[];
  location: string;
  lat: number;
  lng: number;
  author?: IUser;
  reviews?: IReview[];
}

const PostSchema = new Schema(
  {
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
  },
  { versionKey: false, timestamps: true }
);

PostSchema.plugin(mongoosePaginate);

interface PostModel<T extends Document> extends PaginateModel<T> {}

export const Post: PostModel<IPost> = model<IPost>(
  'Post',
  PostSchema
) as PostModel<IPost>;
