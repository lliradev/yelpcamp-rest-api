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
    this.router.patch(
      '/change-password',
      Util.verifyJwtToken,
      AuthController.changePassword
    );
    this.router.put('/forgot', AuthController.forgotPassword);
    this.router.put('/reset/:token', AuthController.resetPassword);
  }
}

export default new AuthRoutes().router;
