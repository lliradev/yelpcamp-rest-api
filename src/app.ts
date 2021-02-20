/**
 * Clase principal que contiene la configuracion del servidor, rutas y conexión a la base de datos
 *
 * @author llira
 * @version 1.0
 */
import express, { Application } from 'express';
import mongoose from 'mongoose';
import { environment } from './common/environment/environment';
import { globalMiddleware } from './common/middlewares';
import { AppRouting, TutorialRouting } from './routing';

export class App {
  private app: Application;

  /**
   * Constructor para la inicialización de la clase
   * @param port puerto para la aplicación
   */
  constructor(private port?: number | string) {
    this.app = express();
    this.initConfig();
    this.middlewares();
    this.routing();
    this.connectToDatabase();
  }

  /**
   * Método para la configuración general del servidor
   */
  private initConfig(): void {
    this.app.set('port', this.port || process.env.PORT || 3000);
  }

  /**
   * Método que se ejecuta antes o después del manejo de una ruta
   */
  private middlewares(): void {
    globalMiddleware(this.app);
  }

  /**
   * Método que contiene las rutas del servidor
   */
  private routing(): void {
    this.app.use('/', AppRouting);
    this.app.use('/api/tutorials', TutorialRouting);
  }

  /**
   * Método para la conexion a la base de datos de MongoDB
   */
  private connectToDatabase(): void {
    mongoose.Promise = global.Promise;
    mongoose.connect(`${environment.databaseUrl}`, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    mongoose.connection.once('open', () => console.log('Database connected'));
    mongoose.connection.once('error', (err) => console.error('Error: ', err));
  }

  /**
   * Método para inicializar el servidor
   */
  public async listen(): Promise<void> {
    this.app.listen(this.app.get('port'));
    console.log('Server on port', this.app.get('port'));
    console.log('Enviroment:', process.env.NODE_ENV);
  }
}
