import mongoose from "mongoose";
import { ElectricGadget, FilterOptions } from "./electricGadget.interface";

const electricGadgetSchema = new mongoose.Schema({
  name: String,
  photo: String,
  price: Number,
  quantity: Number,
  releaseDate: Date,
  brand: String,
  modelNumber: String,
  category: String,
  operatingSystem: String,
  connectivity: [String],
  powerSource: String,
  features: [String],
  weight: Number,
});

export interface ElectricGadgetModel extends ElectricGadget, Document {}

export const ElectricGadgetModel = mongoose.model<ElectricGadgetModel>(
  "ElectricGadget",
  electricGadgetSchema
);
