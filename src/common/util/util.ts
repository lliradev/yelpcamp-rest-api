import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { environment } from '../environment/environment';
import { User } from '../../models/user.model';

export class Util {
  public static verifyJwtToken(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    let token;
    if ('authorization' in req.headers) {
      token = req.headers.authorization?.split(' ')[1];
    }
    if (!token) {
      return res
        .status(403)
        .send({ auth: false, message: 'No token provided.' });
    }
    jwt.verify(token, `${environment.jwtSecret}`, (err, decoded) => {
      if (err) {
        return res
          .status(500)
          .send({ auth: false, message: 'Token authentication failed.' });
      }
      req.params.id = (decoded as User)._id;
      next();
    });
  }
}
