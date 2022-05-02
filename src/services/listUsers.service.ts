import { users } from "../database";

const listUsersService = () => {
  users.forEach(user => delete user.password)
  return users;
};

export default listUsersService;
