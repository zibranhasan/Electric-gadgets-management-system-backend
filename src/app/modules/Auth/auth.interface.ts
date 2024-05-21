import { TUser } from "../User/user.interface";

export type TLoginUser = {
  username: string;
  password: string;
};

export type TRegisterUser = {
  username: string;
  email: string;
  password: string;
};

export type TAuthTokenPayload = {
  userId: string;
  role: string;
};

export type TAuthResponse = {
  token: string;
  user: TUser;
};
export const USER_ROLE = {
  user: "user",
  manager: "manager",
} as const;
export type TUserRole = keyof typeof USER_ROLE;
