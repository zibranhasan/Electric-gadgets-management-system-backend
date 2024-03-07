import { Request, Response } from "express";
import { AuthServices } from "./auth.service";
import { TLoginUser, TAuthResponse } from "./auth.interface";

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const loginData: TLoginUser = req.body;

    // Check if loginData is of type TLoginUser
    if (
      !loginData ||
      typeof loginData !== "object" ||
      !loginData.username ||
      !loginData.password
    ) {
      throw new Error("Invalid login data");
    }

    const authResponse: TAuthResponse = await AuthServices.loginUser(loginData);
    res.json(authResponse);
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid credentials" });
  }
};

export const AuthControllers = {
  loginUser,
};
