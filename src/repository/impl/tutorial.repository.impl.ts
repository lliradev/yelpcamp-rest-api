import { ITutorial } from '../../models/interfaces/tutorial.interface';
import { TutorialRepository } from '../tutorial.repository';
import { TutorialModel } from '../../models/tutorial.model';

export class TutorialRepositoryImpl implements TutorialRepository {
  public async findAll(query?: any, options?: any): Promise<void> {
    await TutorialModel.paginate(query, options);
  }

  public async findById(id: string): Promise<ITutorial | null> {
    return await TutorialModel.findById(id);
  }

  public async insert(tutorial: ITutorial): Promise<void> {
    await TutorialModel.create(tutorial);
  }

  public async update(id: string, tutorial: ITutorial): Promise<void> {
    await TutorialModel.findByIdAndUpdate(
      id,
      { $set: tutorial },
      { new: true }
    );
  }

  public async delete(id: string): Promise<void> {
    await TutorialModel.findByIdAndRemove(id);
  }

  public async deleteAll(): Promise<void> {
    await TutorialModel.deleteMany({});
  }
}
