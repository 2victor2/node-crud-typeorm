import { Request, Response } from "express";
import sessionsService from "../services/sessions.service";

export default class SessionController {
  async store(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const token = await sessionsService({ email, password });
      return res.status(200).send(token);
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
}
