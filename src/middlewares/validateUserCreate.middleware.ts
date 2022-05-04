import { NextFunction, Request, Response } from "express";
import { IUserCreate } from "../interfaces/user";
import { SchemaOf } from "yup";
import * as yup from "yup";

export const userCreateSchema: SchemaOf<IUserCreate> = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required(),
});

export const validateUserCreate = (schema: SchemaOf<IUserCreate>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      try {
        const validatedData = await schema.validate(req.body, {
          abortEarly: false,
          stripUnknown: true,
        });

        req.newUser = validatedData;
      } catch (err: any) {
        return res.status(400).json({
          error: err.errors?.join(", "),
        });
      }
      next();
    } catch (err) {
      return res.status(400).send({});
    }
  };
};
