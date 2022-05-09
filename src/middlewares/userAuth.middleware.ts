import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/appError";

const authUserMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = /bearer /i.test(req.headers.authorization as string)
    ? req.headers.authorization
    : null;
  if (!token) {
    throw new AppError(401, "Missing authorization headers token");
  }
  try {
    jwt.verify(
      token?.split(" ")[1] as string,
      process.env.JWT_SECRET as string,
      (err: any, decoded: any) => {
        req.userId = decoded.id;

        next();
      }
    );
  } catch (err) {
    throw new AppError(400, "Invalid token");
  }
};

export default authUserMiddleware;
