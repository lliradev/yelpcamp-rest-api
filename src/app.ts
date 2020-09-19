/**
 * Clase principal que contiene la configuracion del servidor, rutas y conexión a la base de datos
 *
 * @author llira
 * @version 1.0
 */
import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import helmet from "helmet";
import { config } from 'dotenv';
import AppRouting from './routing/app.routing';

export class App {
  private app: Application;

  /**
   * Constructor para la inicialización de la clase
   * @param port puerto para la aplicación
   */
  constructor(private port?: number | string) {
    // Condición para llamar el método config() si el ambiente es desarrollo
    if (process.env.NODE_ENV !== 'production') {
      config();
    }
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
    this.app.use(helmet());
    this.app.disable('x-powered-by');
    this.app.use(morgan('dev'));
    this.app.use(cors({
      origin: 'http://localhost:4200',
      methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE']
    }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  /**
   * Método que contiene las rutas del servidor
   */
  private routing(): void {
    this.app.use('/', AppRouting);
  }

  /**
   * Método para la conexion a la base de datos de MongoDB
   */
  private connectToDatabase(): void {
    mongoose.Promise = global.Promise;
    mongoose.connect(`${process.env.MONGODB_URI}`, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    mongoose.connection.once('open', () => console.log('Database connected.'));
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
