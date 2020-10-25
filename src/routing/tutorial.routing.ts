import { Router } from 'express';
import { TutorialController } from '../controllers/tutorial.controller';

class TutorialRouting {
  public router: Router;

  constructor() {
    this.router = Router();
    this.start();
  }

  private start(): void {
    this.router.get('/', TutorialController.findAll);
    this.router.get('/:id', TutorialController.findById);
    this.router.post('/', TutorialController.insert);
    this.router.patch('/:id', TutorialController.update);
    this.router.delete('/:id', TutorialController.delete);
    this.router.delete('/', TutorialController.deleteAll);
  }
}

export default new TutorialRouting().router;
