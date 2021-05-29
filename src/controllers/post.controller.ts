import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { PaginateOptions } from 'mongoose';
import { IPost, Post } from '../models/post.model';

export class PostController {
  /**
   * Método para obtener una lista con paginación de los registros
   *
   * @param req objeto que contiene información sobre la solicitud HTTP
   * @param res objeto que devuelve información sobre la respuesta HTTP
   */
  public static async findAll(req: Request, res: Response): Promise<void> {
    try {
      const sort = req.query.sort ? req.query.sort : '_id';
      const order = req.query.order ? req.query.order : 'desc';
      const options: PaginateOptions = {
        page: Number(req.query.page) ? Number(req.query.page) : 1,
        limit: Number(req.query.limit) ? Number(req.query.limit) : 5,
        sort: { [sort as string]: order },
      };
      console.log(options);

      const posts = await Post.paginate({}, options);
      res.status(StatusCodes.OK).send(posts);
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
  public static async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const post = await Post.findById(id);
      if (!post) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .send({ message: `No se encontró la publicación con id: ${id}` });
      }
      res.status(StatusCodes.OK).send(post);
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
      const { body } = req;
      const post: IPost = new Post(body);
      const doc = await post.save();
      res.status(StatusCodes.CREATED).send({ id: doc._id });
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
  public static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { body } = req;
      const post = {
        id: body.id,
        title: body.title,
        price: body.price,
        description: body.description,
        location: body.location,
        lat: body.lat,
        lng: body.lng,
      };
      const result = await Post.findByIdAndUpdate(
        id,
        { $set: post },
        { new: true }
      );
      if (!result) {
        return res
          .status(404)
          .send({ message: `No se encontró la publicación con id: ${id}` });
      }
      res.status(200).end();
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
  public static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const post = await Post.findByIdAndRemove(id);
      if (!post) {
        return res
          .status(404)
          .json({ message: `No se encontró la publicación con id: ${id}` });
      }
      res.status(204).end();
    } catch (err) {
      console.error(err);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ message: err.message });
    }
  }
}
