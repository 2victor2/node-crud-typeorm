import { Request, Response } from "express";
import { AppError, handleError } from "../errors/appError";
import sessionsService from "../services/sessions.service";

export default class SessionController {
  async store(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const token = await sessionsService({ email, password });
      return res.status(200).send(token);
    } catch (err) {
      if (err instanceof AppError) {
        handleError(err, res)
      }
    }
  }
}
