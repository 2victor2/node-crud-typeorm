import { User } from "../entities/user.entity";
import { AppDataSource } from "../data-source";
import { IUserUpdate } from "../interfaces/user";
import * as bcrypt from "bcryptjs";

const changePasswordService = async ({ userId, password }: IUserUpdate) => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();

  const account = users.find((user) => user.id === userId);

  if (bcrypt.compareSync(password, account!.password)) {
    throw new Error("New password must be different!")
  }

  const newPassword = await bcrypt.hash(password, 10);

  await userRepository.update(account!.id, {password: newPassword})
  console.log("oi")
  return true;
};

export default changePasswordService;
