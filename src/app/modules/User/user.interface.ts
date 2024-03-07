export interface TUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}
export type TRegisterUser = {
  username: string;
  email: string;
  password: string;
};
