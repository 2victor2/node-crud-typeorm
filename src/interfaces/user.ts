export interface IUser {
  id: number;
  email: string;
  name: string;
  password?: string;
}

export interface IUserCreate {
  email: string;
  name: string;
  password: string;
}
