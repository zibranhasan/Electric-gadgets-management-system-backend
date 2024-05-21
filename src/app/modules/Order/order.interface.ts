import { Document, Types } from "mongoose";

export interface OrderItem {
  gadgetsId: Types.ObjectId;
  quantity: number;
}

export interface Order extends Document {
  userId: Types.ObjectId;
  items: OrderItem[];
  createdAt?: Date;
  updatedAt?: Date;
}
