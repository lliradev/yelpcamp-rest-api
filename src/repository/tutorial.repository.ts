import { ITutorial } from '../models/interfaces/tutorial.interface';

export interface TutorialRepository {
  findAll(query?: any, options?: any): Promise<void>;
  findById(id: string): Promise<ITutorial | null>;
  insert(tutorial: ITutorial): Promise<void>;
  update(id: string, tutorial: ITutorial): Promise<void>;
  delete(id: string): Promise<void>;
  deleteAll(): Promise<void>;
}
