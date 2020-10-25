import { Document } from 'mongoose';

export interface ITutorial extends Document {
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
