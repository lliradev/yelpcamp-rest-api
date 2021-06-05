import { Router } from 'express';
import { PostController } from '../controllers/post.controller';
import { Util } from '../common/util/util';
import multer from '../common/util/multer';

class PostRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initConfig();
  }

  private initConfig(): void {
    this.router.get('/', PostController.findAll);
    this.router.get('/:id', PostController.findById);
    this.router.post(
      '/',
      Util.verifyJwtToken,
      multer.single('image'),
      PostController.insert
    );
    this.router.put(
      '/:id',
      Util.verifyJwtToken,
      multer.single('image'),
      PostController.update
    );
    this.router.delete('/:id', Util.verifyJwtToken, PostController.delete);
  }
}

export default new PostRoutes().router;
