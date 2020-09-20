import { Schema, model, Document, PaginateModel } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

// Schemas
const CommentSchema = new Schema(
  {
    title: String,
    likes: Number,
    dislikes: Number,
  },
  { _id: false }
);
const TutorialSchema = new Schema(
  {
    title: {
      type: String,
      required: 'El campo título no puede estar vacío.',
      trim: true,
    },
    description: {
      type: String,
      required: 'El campo descripción no puede estar vacío.',
      trim: true,
    },
    isPublished: {
      type: Boolean,
    },
    comments: [CommentSchema],
  },
  { versionKey: false, timestamps: true }
);

// Interfaces
interface ITutorial extends Document {
  title: string;
  description: string;
  isPublished: boolean;
  comments: IComment[];
}
interface IComment {
  title: string;
  likes: number;
  dislikes: number;
}

TutorialSchema.plugin(mongoosePaginate);
interface TutorialModel<T extends Document> extends PaginateModel<T> {}
export const TutorialModel: TutorialModel<ITutorial> = model<ITutorial>(
  'Tutorial',
  TutorialSchema
) as TutorialModel<ITutorial>;
