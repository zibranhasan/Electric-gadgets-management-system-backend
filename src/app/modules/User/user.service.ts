import bcrypt from "bcrypt";
import { TRegisterUser } from "./user.interface";
import { UserModel } from "./user.model";

const registerUserService = async (userData: TRegisterUser): Promise<void> => {
  try {
    const { username, email, password } = userData;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
      role: "user",
    });

    await newUser.save();
  } catch (error: any) {
    throw new Error(`Failed to register user: ${error.message}`);
  }
};

export const UserServices = {
  registerUserService,
};
