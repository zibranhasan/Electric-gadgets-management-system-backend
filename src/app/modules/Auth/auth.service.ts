import { UserModel } from "../User/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config";
import { TLoginUser, TAuthTokenPayload, TAuthResponse } from "./auth.interface";

export const loginUser = async (
  loginData: TLoginUser
): Promise<TAuthResponse> => {
  try {
    const { username, password } = loginData;

    // Find user by username
    const user = await UserModel.findOne({ username });

    // Check if user exists and password is correct
    if (user && (await bcrypt.compare(password, user.password))) {
      // Create and sign a JWT token
      const token = jwt.sign(
        { username, role: user.role } as TAuthTokenPayload,
        config.jwt_access_secret as string,
        { expiresIn: "1h" }
      );

      return { token, user };
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error: any) {
    console.error(error);
    throw new Error(`Failed to login user: ${error.message}`);
  }
};

export const AuthServices = {
  loginUser,
};
