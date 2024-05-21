// src/routes/transaction.routes.ts
import { Router } from "express";
import { createTransaction } from "./transaction.controller";

const router = Router();

router.post("/transactions", createTransaction);

export const TransactionRoutes = router;
