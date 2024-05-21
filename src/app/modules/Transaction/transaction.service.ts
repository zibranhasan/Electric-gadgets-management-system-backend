// src/services/transaction.service.ts

import { ITransaction } from "./transaction.interface";
import Transaction from "./trasaction.model";

export const createTransactionService = async (
  transactionData: ITransaction
) => {
  const newTransaction = new Transaction(transactionData);
  return await newTransaction.save();
};
