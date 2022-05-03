import { User } from "../entities/user.entity";
import { IUserCreate, IUser } from "../interfaces/user";
import * as bcrypt from "bcryptjs";
import { AppDataSource } from "../data-source";

const createUserService = async ({ email, name, password }: IUserCreate) => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();

  const emailAlreadyExists = users.find((user) => user.email === email);

  if (emailAlreadyExists) {
    throw new Error("Email already exists");
  }

  const hashedPassword: string = await bcrypt.hash(password, 10);

  const user = new User();
  user.name = name;
  user.email = email;
  user.password = hashedPassword;

  userRepository.create(user);
  await userRepository.save(user);

  const userReturn = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  return userReturn;
};

export default createUserService;
