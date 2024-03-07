import { Request, Response } from "express";
import { TRegisterUser } from "./user.interface";
import { UserServices } from "./user.service";

const registerUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userData: TRegisterUser = req.body;
    await UserServices.registerUserService(userData);
    res.json({ message: "Registration successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const userController = {
  registerUserController,
};
