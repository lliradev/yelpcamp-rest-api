import { Request, Response, Router } from 'express';
import { TutorialModel } from '../models/tutorial.model';
import { StatusCodes } from 'http-status-codes';
import { TutorialService } from '../services/tutorial.service';

export class TutorialController {
  constructor(private tutorialService: TutorialService) {}

  /**
   * Método para obtener una lista con paginación de los registros
   *
   * @param req objeto que contiene información sobre la solicitud HTTP
   * @param res objeto que devuelve información sobre la respuesta HTTP
   */
  public static async findAll(req: Request, res: Response): Promise<void> {
    /* try {
      const orderBy = req.query.orderBy ? req.query.orderBy : '_id';
      const shape = req.query.shape ? req.query.shape : 'desc';
      const options = {
        page: Number(req.query.page) ? Number(req.query.page) : 1,
        limit: Number(req.query.limit) ? Number(req.query.limit) : 5,
        sort: { [orderBy as string]: shape },
      };
      console.log(options);
      const tutorials = await TutorialModel.paginate({}, options);
      res.status(StatusCodes.OK).json(tutorials);
    } catch (e) {
      console.error(e);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: e.message });
    } */
    try {
      const orderBy = req.query.orderBy ? req.query.orderBy : '_id';
      const shape = req.query.shape ? req.query.shape : 'desc';
      const options = {
        page: Number(req.query.page) ? Number(req.query.page) : 1,
        limit: Number(req.query.limit) ? Number(req.query.limit) : 5,
        sort: { [orderBy as string]: shape },
      };
      const tutorials = await this.tutorialService.findAll({}, options);
      res.status(StatusCodes.OK).json(tutorials);
    } catch (e) {
      console.error(e);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: e.message });
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
      const { id } = req.params;
      const tutorial = await TutorialModel.findById(id);
      if (tutorial) res.status(StatusCodes.OK).json(tutorial);
      else
        res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: `No se encontró el tutorial con id: ${id}` });
    } catch (e) {
      console.error(e);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: e.message });
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
      const newTutorial = new TutorialModel({
        title: req.body.title,
        description: req.body.description,
        isPublished: req.body.isPublished ? req.body.isPublished : false,
        comments: req.body.comments,
      });
      const errors: string[] = [];
      if (!req.body.title || req.body.title.trim() === '')
        errors.push('El campo título no puede estar vacío.');
      if (!req.body.description || req.body.description.trim() === '')
        errors.push('El campo descripción no puede estar vacío.');
      if (errors.length > 0) {
        res.status(StatusCodes.BAD_REQUEST).json({
          errors,
          message: 'Algunos campos no cumplen con la validación.',
        });
      } else {
        await newTutorial.save();
        res.status(StatusCodes.CREATED).end();
      }
    } catch (e) {
      console.error(e);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: e.message });
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
      const { id } = req.params;
      const tutorial = {
        id: req.body.id,
        title: req.body.title,
        description: req.body.description,
        isPublished: req.body.isPublished ? req.body.isPublished : false,
        comments: req.body.comments,
      };
      const result = await TutorialModel.findByIdAndUpdate(
        id,
        { $set: tutorial },
        { new: true }
      );
      if (id != tutorial.id)
        res.status(400).json({ message: 'La URI no coincide.' });
      else if (!result)
        res
          .status(404)
          .json({ message: `No se encontró el tutorial con id: ${id}` });
      else res.status(200).end();
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: e.message });
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
      const { id } = req.params;
      const tutorial = await TutorialModel.findByIdAndRemove(id);
      if (!tutorial)
        res
          .status(404)
          .json({ message: `No se encontró el tutorial con id: ${id}` });
      else res.status(204).end();
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: e.message });
    }
  }

  /**
   * Método para eliminar todos los registros
   *
   * @param req objeto que contiene información sobre la solicitud HTTP
   * @param res objeto que devuelve información sobre la respuesta HTTP
   */
  public static async deleteAll(req: Request, res: Response): Promise<void> {
    try {
      const tutorials = await TutorialModel.deleteMany({});
      res
        .status(200)
        .json({ message: `${tutorials.deletedCount} registros eliminados.` });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: e.message });
    }
  }
}
