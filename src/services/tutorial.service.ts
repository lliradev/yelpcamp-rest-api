import { ITutorial } from '../models/interfaces/tutorial.interface';
import { TutorialRepository } from '../repository/tutorial.repository';

export class TutorialService {
  constructor(private readonly tutorialRepository: TutorialRepository) {}

  public async findAll(query?: any, options?: any): Promise<void> {
    return await this.tutorialRepository.findAll(query, options);
  }

  public async findById(id: string): Promise<ITutorial | null> {
    return await this.tutorialRepository.findById(id);
  }

  public async insert(tutorial: ITutorial): Promise<void> {
    await this.tutorialRepository.insert(tutorial);
  }

  public async update(id: string, tutorial: ITutorial): Promise<void> {
    await this.tutorialRepository.update(id, tutorial);
  }

  public async delete(id: string): Promise<void> {
    await this.tutorialRepository.delete(id);
  }

  public async deleteAll(): Promise<void> {
    await this.tutorialRepository.deleteAll();
  }
}
