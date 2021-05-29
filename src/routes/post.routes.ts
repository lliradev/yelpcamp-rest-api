import { Router } from 'express';
import { PostController } from '../controllers/post.controller';
import { Util } from '../common/util/util';

class PostRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initConfig();
  }

  private initConfig(): void {
    this.router.get('/', PostController.findAll);
    this.router.get('/:id', PostController.findById);
    this.router.post('/', Util.verifyJwtToken, PostController.insert);
    this.router.put('/:id', Util.verifyJwtToken, PostController.update);
    this.router.delete('/:id', Util.verifyJwtToken, PostController.delete);
  }
}

export default new PostRoutes().router;
