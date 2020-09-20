import { Request, Response } from 'express';
import { TutorialModel } from '../models/tutorial.model';

export class TutorialController {
  public static async findAll(req: Request, res: Response): Promise<void> {
    try {
      const orderBy = req.query.orderBy ? req.query.orderBy : '_id';
      const shape = req.query.shape ? req.query.shape : 'desc';
      const options = {
        page: req.query.page ? req.query.page : 1,
        limit: req.query.limit ? req.query.limit : 5,
        sort: { [orderBy as any]: shape },
      };
      const tutorials = await TutorialModel.paginate(
        {},
        { page: 1, limit: 5, sort: { _id: 'desc' } }
      );
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
      if (tutorial) {
        res.status(200).json(tutorial);
      } else {
        res.status(404).json({ message: 'No se encontró el tutorial.' });
      }
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
      await newTutorial.save();
      res.status(201).json({ message: 'El tutorial se creó con éxito.' });
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
