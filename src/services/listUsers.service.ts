import { User } from "../entities/user.entity";
import { AppDataSource } from "../data-source";

const listUsersService = async () => {
  const userRepository = AppDataSource.getRepository(User);

  const users = userRepository.find();

  const usersReturn = (await users).map(({ id, name, email }) => ({
    id,
    name,
    email,
  }));

  return usersReturn;
};

export default listUsersService;
