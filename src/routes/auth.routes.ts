import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { Util } from '../common/util/util';

class AuthRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initConfig();
  }

  private initConfig(): void {
    this.router.post('/register', AuthController.register);
    this.router.post('/authenticate', AuthController.authenticate);
    this.router.get('/profile', Util.verifyJwtToken, AuthController.profile);
  }
}

export default new AuthRoutes().router;
