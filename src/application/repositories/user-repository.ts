export interface IRegisterUser {
  username: string;
  email: string;
  password: string;
}

export interface IAuthenticateUser {
  email: string;
  password: string;
}

export abstract class UserRepository {
  abstract registerUser(newUser: IRegisterUser): Promise<void>
  abstract findUserByEmail(email: string): Promise<{ id: string, email: string; password: string; }>
}