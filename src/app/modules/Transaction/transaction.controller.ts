// src/controllers/transaction.controller.ts
import { Request, Response } from "express";
import { createTransactionService } from "./transaction.service";

export const createTransaction = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const savedTransaction = await createTransactionService(req.body);
    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(500).json({ message: "Failed to create transaction", error });
  }
};
