import { Request, Response } from 'express';
import { TutorialModel } from '../models/tutorial.model';

export class TutorialController {
  public static async findAll(req: Request, res: Response): Promise<void> {
    try {
      const orderBy = req.query.orderBy ? req.query.orderBy : '_id';
      const shape = req.query.shape ? req.query.shape : 'desc';
      const optionsParams = {
        page: Number(req.query.page) ? Number(req.query.page) : 1,
        limit: Number(req.query.limit) ? Number(req.query.limit) : 5,
        sort: { [orderBy as string]: shape },
      };
      console.log(optionsParams);
      const tutorials = await TutorialModel.paginate({}, optionsParams);
      res.status(200).json(tutorials);
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: e.message });
    }
  }

  public static async findById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const tutorial = await TutorialModel.findById(id);
      if (tutorial) res.status(200).json(tutorial);
      else
        res
          .status(404)
          .json({ message: `No se encontró el tutorial con id: ${id}` });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: e.message });
    }
  }

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
        res.status(400).json({
          errors,
          message: 'Algunos campos no cumplen con la validación.',
        });
      } else {
        await newTutorial.save();
        res.status(201).end();
      }
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: e.message });
    }
  }

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
