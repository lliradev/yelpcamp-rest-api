import { Schema, model, Document } from 'mongoose';
import { IUser } from './user.model';

export interface IReview extends Document {
  body: string;
  author: IUser;
}

const ReviewSchema = new Schema<IReview>({
  body: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

export default model<IReview>('Review', ReviewSchema);
