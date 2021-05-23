import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user.model';
import { environment } from '../common/environment/environment';

export class AuthController {
  /**
   * Método para registrar un nuevo usuario
   *
   * @param req objeto que contiene información sobre la solicitud HTTP
   * @param res objeto que devuelve información sobre la respuesta HTTP
   * @returns un nuevo usuario
   */
  public static async register(req: Request, res: Response) {
    try {
      const { body } = req;
      if (!(body.fullname && body.email && body.password)) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send({ message: 'Los datos proporcionados no son válidos' });
      }
      const user: IUser = new User(body);
      user.password = await user.encryptPassword(user.password);
      const doc = await user.save();
      res.status(StatusCodes.CREATED).send(doc);
    } catch (err) {
      console.error(err);
      if (err.code === 11000) {
        res.status(StatusCodes.BAD_REQUEST).send({
          message: 'Se encontró una dirección de correo electrónico duplicada.',
        });
      } else {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send({ message: err.message });
      }
    }
  }

  /**
   * Método que realiza la autenticación de las credenciales
   *
   * @param req objeto que contiene información sobre la solicitud HTTP
   * @param res objeto que devuelve información sobre la respuesta HTTP
   * @returns jwt con las credenciales proporcionadas
   */
  public static async authenticate(req: Request, res: Response) {
    try {
      const { body } = req;
      const user = await User.findOne({ email: body.email });
      if (!user) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send({ message: 'El correo electrónico no está registrado' });
      }
      const matched = await user.comparePassword(body.password);
      if (!matched) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .send({ message: 'Credenciales invalidas' });
      }
      const token = jwt.sign({ _id: user._id }, `${environment.jwtSecret}`, {
        expiresIn: process.env.JWT_EXP,
      });
      return res.status(StatusCodes.CREATED).send({ token });
    } catch (err) {
      console.error(err);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ message: err.message });
    }
  }

  /**
   * Método que obtiene el perfil del usuario
   *
   * @param req objeto que contiene información sobre la solicitud HTTP
   * @param res objeto que devuelve información sobre la respuesta HTTP
   * @returns usuario que inicio sesión
   */
  public static async profile(req: Request, res: Response) {
    try {
      const user = await User.findById({ _id: req.userId });
      if (!user) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .send({ message: 'User record not found.' });
      }
      return res.status(StatusCodes.OK).send({
        user: {
          id: user._id,
          fullname: user.fullname,
          email: user.email,
          avatar: user.avatar,
        },
      });
    } catch (err) {
      console.error(err);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ message: err.message });
    }
  }

  /**
   * Método para cambiar la contraseña del usuario
   *
   * @param req objeto que contiene información sobre la solicitud HTTP
   * @param res objeto que devuelve información sobre la respuesta HTTP
   * @returns contraseña nueva
   */
  public static async changePassword(req: Request, res: Response) {
    try {
      const user = await User.findById({ _id: req.userId });
      const { oldPassword, newPassword } = req.body;
      if (!(oldPassword && newPassword)) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send({ message: 'Las contraseñas no coinciden' });
      }
      if (!user) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .send({ message: 'User record not found.' });
      }
      user.password = await user.encryptPassword(newPassword);
      await user.save();
      res
        .status(StatusCodes.CREATED)
        .send({ message: 'La contraseña se cambio con éxito' });
    } catch (err) {
      console.error(err);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ message: err.message });
    }
  }
}
