import { Schema, model, Document, PaginateModel } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { ITutorial } from '../interfaces/tutorial.interface';

const CommentSchema = new Schema(
  {
    title: { type: String, trim: true },
    likes: Number,
    dislikes: Number,
  },
  { _id: false }
);
export const TutorialSchema = new Schema(
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

TutorialSchema.plugin(mongoosePaginate);
/* interface TutorialModel<T extends Document> extends PaginateModel<T> {}
export const TutorialModel: TutorialModel<ITutorial> = model<ITutorial>(
  'Tutorial',
  TutorialSchema
) as TutorialModel<ITutorial>;
 */