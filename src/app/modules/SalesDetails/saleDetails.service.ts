// sale.service.ts

import { ElectricGadgetModel } from "../Electric_gadget/electricGadget.model";
import { SaleModel } from "./saleDetails.model";

interface CategorizedSalesHistory {
  weekly: Record<string, any[]>;
  daily: Record<string, any[]>;
  monthly: Record<string, any[]>;
  yearly: Record<string, any[]>;
}

export class SaleService {
  static async sellProduct(saleData: any): Promise<void> {
    try {
      const { productId, quantity, buyerName, saleDate } = saleData;

      // Validate and update inventory
      const product = await ElectricGadgetModel.findById(productId);
      if (!product) {
        throw new Error("Product not found");
      }

      if (product.quantity < quantity) {
        throw new Error("Insufficient stock");
      }

      product.quantity -= quantity;
      await product.save();

      // Create a sale record
      await SaleModel.create({ productId, quantity, buyerName, saleDate });
    } catch (error: any) {
      throw new Error(`Failed to sell product: ${error.message}`);
    }
  }

  static async getSalesHistory(): Promise<CategorizedSalesHistory> {
    try {
      // Fetch sales history and populate product details
      const salesHistory = await SaleModel.find().populate("productId");

      // Categorize sales history by intervals
      const categorizedSalesHistory: CategorizedSalesHistory = {
        weekly: categorizeByWeek(salesHistory),
        daily: categorizeByDay(salesHistory),
        monthly: categorizeByMonth(salesHistory),
        yearly: categorizeByYear(salesHistory),
      };

      return categorizedSalesHistory;
    } catch (error: any) {
      throw new Error(`Failed to get sales history: ${error.message}`);
    }
  }
}
// Helper functions for categorizing sales history
const categorizeByWeek = (salesHistory: any[]): Record<string, any[]> => {
  const categorizedSales: Record<string, any[]> = {};

  salesHistory.forEach((sale) => {
    const saleDate = new Date(sale.saleDate);
    const weekNumber = getWeekNumber(saleDate);

    if (!categorizedSales[weekNumber]) {
      categorizedSales[weekNumber] = [];
    }

    categorizedSales[weekNumber].push(sale);
  });

  return categorizedSales;
};

const categorizeByDay = (salesHistory: any[]): Record<string, any[]> => {
  const categorizedSales: Record<string, any[]> = {};

  salesHistory.forEach((sale) => {
    const saleDate = new Date(sale.saleDate);
    const dayKey = saleDate.toISOString().split("T")[0]; // Use date string as key

    if (!categorizedSales[dayKey]) {
      categorizedSales[dayKey] = [];
    }

    categorizedSales[dayKey].push(sale);
  });

  return categorizedSales;
};

const categorizeByMonth = (salesHistory: any[]): Record<string, any[]> => {
  const categorizedSales: Record<string, any[]> = {};

  salesHistory.forEach((sale) => {
    const saleDate = new Date(sale.saleDate);
    const monthKey = `${saleDate.getFullYear()}-${saleDate.getMonth() + 1}`; // Use year-month string as key

    if (!categorizedSales[monthKey]) {
      categorizedSales[monthKey] = [];
    }

    categorizedSales[monthKey].push(sale);
  });

  return categorizedSales;
};

const categorizeByYear = (salesHistory: any[]): Record<string, any[]> => {
  const categorizedSales: Record<string, any[]> = {};

  salesHistory.forEach((sale) => {
    const saleDate = new Date(sale.saleDate);
    const yearKey = saleDate.getFullYear().toString(); // Use year as key

    if (!categorizedSales[yearKey]) {
      categorizedSales[yearKey] = [];
    }

    categorizedSales[yearKey].push(sale);
  });

  return categorizedSales;
};

// Helper function to get ISO week number
const getWeekNumber = (date: Date): number => {
  const target = new Date(date.valueOf());
  const dayNumber = (date.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNumber + 3);
  const firstThursday = target.valueOf();
  target.setMonth(0, 1);
  if (target.getDay() !== 4) {
    target.setMonth(0, 1 + ((4 - target.getDay() + 7) % 7));
  }
  return Math.floor(1 + (firstThursday - target.getTime()) / 604800000); // Use getTime() to get milliseconds
};
