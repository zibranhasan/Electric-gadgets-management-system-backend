import mongoose from "mongoose";
import { Sale } from "./saleDetails.interface";

const saleSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "ElectricGadget" },
  quantity: Number,
  buyerName: String,
  saleDate: Date,
});

export interface SaleModel extends Sale, Document {}

export const SaleModel = mongoose.model<SaleModel>("Sale", saleSchema);
