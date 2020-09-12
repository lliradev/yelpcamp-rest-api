/**
 * Clase principal para la configuración del servidor
 *
 * @author llira
 * @version 1.0
 */
import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';

class App {
  public app: Application;

  /**
   * Constructor para la inicialización de la clase
   */
  constructor() {
    this.app = express();
    this.database();
    this.config();
    this.routes();
  }

  /**
   * Método para la configuración del servidor y middlewares
   */
  private config(): void {
    this.app.set('port', process.env.PORT || 3000);
    this.app.use(morgan('dev'));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  /**
   * Método que contiene las rutas que accederemos desde el servidor
   */
  public routes(): void {}

  /**
   * Método para la conexion a la base de datos de MongoDB
   */
  private database(): void {
    mongoose.Promise = global.Promise;
    mongoose.connect(`${process.env.MONGODB_URI}`, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    mongoose.connection.once('open', () =>
      console.log('Database client connected.'),
    );
    mongoose.connection.once('error', (err) => console.error(err));
  }
}

export default new App().app;
