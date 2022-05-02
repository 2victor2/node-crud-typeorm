import { users } from "../database";
import { IUserCreate, IUser } from "../interfaces/user";
import * as bcrypt from "bcryptjs";

const genId = (): number => {
  let maxId = 0;
  users.forEach((user) => {
    if (user.id > maxId) {
      maxId = user.id;
    }
  });
  return maxId + 1;
};

const createUserService = async ({ email, name, password }: IUserCreate) => {
  const emailAlreadyExists = users.find((user) => user.email === email);

  if (emailAlreadyExists) {
    throw new Error("Email already exists");
  }

  const hashedPassword: string = await bcrypt.hash(password, 10);

  const newUser: IUser = {
    id: genId(),
    email,
    name,
    password: hashedPassword,
  };

  users.push(newUser);

  const newUserReturn: IUser = {
    id: newUser.id,
    email: newUser.email,
    name: newUser.name,
  };

  return newUserReturn;
};

export default createUserService;
