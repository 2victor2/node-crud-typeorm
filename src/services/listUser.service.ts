import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";
import { IUserAuth } from "../interfaces/user";

const listUserService = async ({ userId }: IUserAuth) => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();

  const account = users.find(user => user.id === userId);

  const accountReturn = {
    id: (<any>account).id,
    name: (<any>account).name,
    email: (<any>account).email,
  };
  return accountReturn;
};

export default listUserService;
