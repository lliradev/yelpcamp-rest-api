/**
 * Middlewares globales para la aplicación
 *
 * @author llira
 * @version 1.0
 */
import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

/**
 * Función que contiene los middlewares que seran utilizados en la aplicación
 * @param app Application
 */
export const globalMiddleware = (app: Application) => {
  console.log('Set global middleware');

  // app.use(helmet());
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'"],
        },
      },
    })
  );
  app.disable('x-powered-by');
  app.use(morgan('dev'));
  app.use(
    cors({
      origin: ['http://localhost:4200', 'http://localhost:8080'],
      methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type'],
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
};
