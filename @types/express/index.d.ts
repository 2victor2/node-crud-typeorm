import * as express from "express";
import { IUserCreate } from "../../src/interfaces/user";

declare global {
  namespace Express {
    interface Request {
      userId: string;
      newUser: IUserCreate;
    }
  }
}
