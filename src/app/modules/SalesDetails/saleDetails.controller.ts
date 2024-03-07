// sale.controller.ts

import { Request, Response } from "express";
import { SaleService } from "./saleDetails.service";

export class SaleController {
  static async sellProduct(req: Request, res: Response): Promise<void> {
    try {
      const saleData = req.body; // Assuming your request body contains sale data
      const result = await SaleService.sellProduct(saleData);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getSalesHistory(req: Request, res: Response): Promise<void> {
    try {
      const history = await SaleService.getSalesHistory();
      res.json(history);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
