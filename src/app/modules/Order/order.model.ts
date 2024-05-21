import mongoose, { Schema } from "mongoose";
import { Order } from "./order.interface";

const orderItemSchema = new Schema(
  {
    gadgetsId: {
      type: Schema.Types.ObjectId,
      ref: "ElectricGadget",
      required: true,
    },
    quantity: { type: Number, required: true },
  },
  { _id: false }
);

const orderSchema = new Schema<Order>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: { type: [orderItemSchema], required: true },
  },
  {
    timestamps: true, // This will add `createdAt` and `updatedAt` fields
  }
);

const OrderModel = mongoose.model<Order>("Order", orderSchema);

export default OrderModel;
