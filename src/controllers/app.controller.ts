/**
 * Controlador para la aplicación
 *
 * @author llira
 * @version 1.0
 */
import { Request, Response } from 'express';

export class AppController {
  /**
   * Método de bienvenida en la aplicación
   *
   * @param req objeto que contiene información sobre la solicitud HTTP
   * @param res objeto que devuelve información sobre la respuesta HTTP
   */
  public static welcome(req: Request, res: Response): void {
    res.status(200).json({
      author: 'Luis Lira',
      message: 'Welcome to YelpCamp REST API',
      name: 'yelpcamp-rest-api',
      description:
        'Desarrollo de una rest api con typescript, nodejs, express y mongodb',
    });
  }
}
