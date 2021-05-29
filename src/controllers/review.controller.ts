import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class ReviewController {
  /**
   * Método para obtener una lista con paginación de los registros
   *
   * @param req objeto que contiene información sobre la solicitud HTTP
   * @param res objeto que devuelve información sobre la respuesta HTTP
   */
  public static async findAll(req: Request, res: Response): Promise<void> {
    try {
      res.status(StatusCodes.OK).send({ message: 'findAll' });
    } catch (err) {
      console.error(err);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ message: err.message });
    }
  }

  /**
   * Método para obtener un registro en específico
   *
   * @param req objeto que contiene información sobre la solicitud HTTP
   * @param res objeto que devuelve información sobre la respuesta HTTP
   */
  public static async findById(req: Request, res: Response): Promise<void> {
    try {
      res.status(StatusCodes.OK).send({ message: 'findById' });
    } catch (err) {
      console.error(err);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ message: err.message });
    }
  }

  /**
   * Método para insertar un objeto
   *
   * @param req objeto que contiene información sobre la solicitud HTTP
   * @param res objeto que devuelve información sobre la respuesta HTTP
   */
  public static async insert(req: Request, res: Response): Promise<void> {
    try {
      res.status(StatusCodes.CREATED).send({ message: 'insert' });
    } catch (err) {
      console.error(err);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ message: err.message });
    }
  }

  /**
   * Método para editar un objeto con identificador
   *
   * @param req objeto que contiene información sobre la solicitud HTTP
   * @param res objeto que devuelve información sobre la respuesta HTTP
   */
  public static async update(req: Request, res: Response): Promise<void> {
    try {
      res.status(200).send({ message: 'update' });
    } catch (err) {
      console.error(err);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ message: err.message });
    }
  }

  /**
   * Método para eliminar un registro en específico
   *
   * @param req objeto que contiene información sobre la solicitud HTTP
   * @param res objeto que devuelve información sobre la respuesta HTTP
   */
  public static async delete(req: Request, res: Response): Promise<void> {
    try {
      res.status(204).end();
    } catch (err) {
      console.error(err);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ message: err.message });
    }
  }
}
