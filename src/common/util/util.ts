import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { environment } from '../environment/environment';
import { IPayload } from '../../models/payload.model';

export class Util {
  public static verifyJwtToken(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      let token;
      if ('authorization' in req.headers) {
        token = req.headers.authorization?.split(' ')[1];
      }
      if (!token) {
        return res.status(401).send({ message: 'Access denied' });
      }
      const decoded = jwt.verify(token, `${environment.jwtSecret}`) as IPayload;
      req.params.id = decoded._id;
      next();
    } catch (err) {
      console.error(err.message);
      // res.status(500).send({ message: 'Token authentication failed.' });
      res.status(500).send({ message: err.message });
    }
  }
}
