import { Router } from 'express';
import { PostController } from '../controllers/post.controller';

class PostRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initConfig();
  }

  private initConfig(): void {
    this.router.get('/', PostController.findAll);
    this.router.get('/:id', PostController.findById);
    this.router.post('/', PostController.insert);
    this.router.put('/:id', PostController.update);
    this.router.delete('/:id', PostController.delete);
  }
}

export default new PostRoutes().router;
