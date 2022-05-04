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

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserAuth {
  userId: string;
}

export interface IUserUpdate {
  password: string;
  userId: string;
}
