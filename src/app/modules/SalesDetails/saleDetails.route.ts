import express from "express";
import { SaleController } from "./saleDetails.controller";

const router = express.Router();

router.post("/sell", SaleController.sellProduct);
router.get("/history", SaleController.getSalesHistory);

export const SaleRoutes = router;
