import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const authUserMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = /bearer /i.test(req.headers.authorization as string)
      ? req.headers.authorization
      : null;

      if (!token) {
      return res
        .status(403)
        .json({ message: "Missing headers authorization token" });
    }

    jwt.verify(
      token?.split(" ")[1] as string,
      process.env.JWT_SECRET as string,
      (err: any, decoded: any) => {
        req.userId = decoded.id;

        next();
      }
    );
  } catch (err) {
    return res.status(400).json({ message: "Invalid token" });
  }
};

export default authUserMiddleware;
