import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";
import { IUserLogin } from "../interfaces/user";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const sessionsService = async ({ email, password }: IUserLogin) => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();

  const account = users.find((user) => user.email === email);

  if (!account) {
    throw new Error("Wrong email/password");
  }
  if (!bcrypt.compareSync(password, account.password)) {
    throw new Error("Wrong email/password");
  }

  const token = jwt.sign(
    { id: account.id, email: account.email },
    String(process.env.JWT_SECRET),
    { expiresIn: "12h" }
  );

  return { token };
};

export default sessionsService