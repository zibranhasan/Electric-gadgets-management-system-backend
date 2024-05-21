import { Types } from "mongoose";
import { Order, OrderItem } from "./order.interface";
import OrderModel from "./order.model";

class OrderService {
  //   async createOrder(orderData: Partial<Order>): Promise<Order> {
  //     const order = new OrderModel(orderData);
  //     return await order.save();
  //   }

  //   async getOrderById(orderId: string): Promise<Order | null> {
  //     return await OrderModel.findById(orderId)
  //       .populate("items.gadgetsId")
  //       .exec();
  //   }

  async getAllOrders(): Promise<Order[]> {
    return await OrderModel.find()
      .populate("userId") // Populate user information
      .populate("items.gadgetsId") // Populate gadgets information
      .exec();
  }

  async getOrdersByUserId(userId: string): Promise<Order[]> {
    return await OrderModel.find({ userId: new Types.ObjectId(userId) })
      .populate("items.gadgetsId")
      .exec();
  }

  async updateOrder(
    userId: string,
    gadgetsId: string,
    quantity: number
  ): Promise<Order | null> {
    let order = await OrderModel.findOne({
      userId: new Types.ObjectId(userId),
    }).exec();

    if (!order) {
      // Create a new order if it doesn't exist
      order = new OrderModel({
        userId: new Types.ObjectId(userId),
        items: [],
      });
    }

    const itemIndex = order.items.findIndex(
      (item: OrderItem) => item.gadgetsId.toString() === gadgetsId
    );

    if (itemIndex > -1) {
      // Update the quantity
      order.items[itemIndex].quantity = quantity;
    } else {
      // If the gadgetId does not exist in the items, you might want to add it as a new item.
      order.items.push({ gadgetsId: new Types.ObjectId(gadgetsId), quantity });
    }

    return await order.save();
  }

  async deleteGadgetFromOrder(
    userId: string,
    gadgetsId: string
  ): Promise<Order | null> {
    const order = await OrderModel.findOne({
      userId: new Types.ObjectId(userId),
    }).exec();

    if (!order) {
      return null;
    }

    const itemIndex = order.items.findIndex(
      (item: OrderItem) => item.gadgetsId.toString() === gadgetsId
    );

    if (itemIndex > -1) {
      order.items.splice(itemIndex, 1);
      return await order.save();
    } else {
      return null;
    }
  }
}

export default new OrderService();
