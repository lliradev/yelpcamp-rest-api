/**
 * Clase con las rutas
 *
 * @author llira
 * @version 1.0
 */
import { Router } from 'express';
import app from '../controllers/app.controller';

class AppRouting {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initConfig();
  }

  private initConfig(): void {
    this.router.get('/', app.welcome);
  }
}

export default new AppRouting().router;
