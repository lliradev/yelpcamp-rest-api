import { Router } from 'express';
import { ReviewController } from '../controllers/review.controller';

class ReviewRoutes {
  public router: Router;

  constructor() {
    this.router = Router({ mergeParams: true });
    this.initConfig();
  }

  private initConfig(): void {
    this.router.get('/', ReviewController.findAll);
    this.router.get('/:review_id', ReviewController.findById);
    this.router.post('/', ReviewController.insert);
    this.router.put('/:review_id', ReviewController.update);
    this.router.delete('/:review_id', ReviewController.delete);
  }
}

export default new ReviewRoutes().router;
