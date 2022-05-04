import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";
import { IUserAuth } from "../interfaces/user";

const deleteUserService = async ({ userId }: IUserAuth) => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();

  const account = users.find((user) => user.id === userId);

  await userRepository.delete(account!.id);

  return true;
};

export default deleteUserService;
