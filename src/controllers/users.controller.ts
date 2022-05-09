import { Request, Response } from "express";
import { AppError, handleError } from "../errors/appError";
import changePasswordService from "../services/changePassword.service";
import createUserService from "../services/createUser.service";
import deleteUserService from "../services/deleteUser.service";
import listUserService from "../services/listUser.service";
import listUsersService from "../services/listUsers.service";

export default class UserController {
  async store(req: Request, res: Response) {
    const { email, name, password } = req.newUser;

    try {
      const newUser = await createUserService({ email, name, password });

      return res.status(201).json(newUser);
    } catch (err) {
      if (err instanceof AppError) {
        handleError(err, res);
      }
    }
  }
  async index(req: Request, res: Response) {
    try {
      const users = await listUsersService();

      return res.status(200).send(users);
    } catch (err) {
      if (err instanceof AppError) {
        handleError(err, res);
      }
    }
  }
  async show(req: Request, res: Response) {
    try {
      const user = await listUserService({
        userId: req.userId,
      });

      return res.status(200).send(user);
    } catch (err) {
      if (err instanceof AppError) {
        handleError(err, res);
      }
    }
  }
  async update(req: Request, res: Response) {
    try {
      const { password } = req.body;

      if (!password) {
        throw new Error("Must have a password key!");
      }

      const updated = await changePasswordService({
        userId: req.userId,
        password,
      });

      if (updated) {
        return res
          .status(200)
          .send({ message: "Password updated with success!" });
      }
    } catch (err) {
      if (err instanceof AppError) {
        handleError(err, res);
      }
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const deleted = await deleteUserService({ userId: req.userId });
      if (deleted) {
        return res.status(200).json({ message: "User deleted with success" });
      }
    } catch (err) {
      if (err instanceof AppError) {
        handleError(err, res);
      }
    }
  }
}
