import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";
import { IUserAuth } from "../interfaces/user";
import jwt from "jsonwebtoken";

const listUserService = async ({ authorization }: IUserAuth) => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();

  if (!authorization) {
    throw new Error("Missing headers authorization token");
  }

  const token = authorization.split(" ")[1];

  const account = jwt.verify(
    token,
    String(process.env.JWT_SECRET),
    (err, decoded) => {
      if (!decoded) {
        throw new Error("Invalid token");
      }
      const user = users.find((user) => user.id === (<any>decoded).id);

      return user;
    }
  );

  const accountReturn = {
    id: (<any>account).id,
    name: (<any>account).name,
    email: (<any>account).email,
  };
  return accountReturn;
};

export default listUserService;
