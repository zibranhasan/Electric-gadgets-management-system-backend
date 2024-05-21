// src/models/transaction.model.ts
import { Schema, model } from "mongoose";
import { ITransaction } from "./transaction.interface";

const transactionSchema = new Schema<ITransaction>(
  {
    buyersName: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    sellingDate: {
      type: Date,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    totalQuantity: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Transaction = model<ITransaction>("Transaction", transactionSchema);

export default Transaction;
