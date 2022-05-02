import { Request, Response } from "express";
import createUserService from "../services/createUser.service";
import listUsersService from "../services/listUsers.service";

export default class UserController {
  async store(req: Request, res: Response) {
    const { email, name, password } = req.body;

    try {
      const newUser = await createUserService({ email, name, password });
      
      return res.status(201).json(newUser);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).send({
          error: err.name,
          message: err.message,
        });
      } else {
        return res.status(500);
      }
    }
  }
  async index(req: Request, res: Response) {
    try {
      const users = listUsersService();

      return res.status(200).send(users);
    } catch (err) {
      return res.status(500);
    }
  }
}
