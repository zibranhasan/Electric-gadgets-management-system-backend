import mongoose, { Document } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user"], default: "user" },
  },
  { timestamps: true }
);

export interface IUserModel extends Document {
  username: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export const UserModel = mongoose.model<IUserModel>("User", userSchema);
