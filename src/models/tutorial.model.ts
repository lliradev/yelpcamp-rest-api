import { Document, model, PaginateModel, Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

// Schemas
const CommentSchema = new Schema(
  {
    title: { type: String, trim: true },
    likes: Number,
    dislikes: Number,
  },
  { _id: false }
);
const TutorialSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'El campo título no puede estar vacío.'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'El campo descripción no puede estar vacío.'],
      trim: true,
    },
    isPublished: Boolean,
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
