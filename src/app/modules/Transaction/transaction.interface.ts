// src/models/transaction.interface.ts
import { Document, Types } from "mongoose";

export interface ITransaction extends Document {
  buyersName: string;
  contactNumber: string;
  sellingDate: Date;
  userId: Types.ObjectId; // Use Types.ObjectId for correct typing
  totalQuantity: number;
  totalPrice: number;
}
