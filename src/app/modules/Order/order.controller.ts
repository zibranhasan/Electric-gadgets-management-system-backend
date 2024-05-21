import { Request, Response } from "express";
import orderService from "./order.service";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";

class OrderController {
  //   async createOrder(req: Request, res: Response): Promise<void> {
  //     try {
  //       const order = await orderService.createOrder(req.body);
  //       res.status(201).json(order);
  //     } catch (error) {
  //       const errorMessage =
  //         error instanceof Error ? error.message : "An unknown error occurred";
  //       res.status(500).json({ message: errorMessage });
  //     }
  //   }

  //   async getOrderById(req: Request, res: Response): Promise<void> {
  //     try {
  //       const order = await orderService.getOrderById(req.params.id);
  //       if (order) {
  //         res.status(200).json(order);
  //       } else {
  //         res.status(404).json({ message: "Order not found" });
  //       }
  //     } catch (error) {
  //       const errorMessage =
  //         error instanceof Error ? error.message : "An unknown error occurred";
  //       res.status(500).json({ message: errorMessage });
  //     }
  //   }

  async getAllOrders(req: Request, res: Response): Promise<void> {
    try {
      const orders = await orderService.getAllOrders();
      res.status(200).json(orders);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      res.status(500).json({ message: errorMessage });
    }
  }

  async getOrdersByUserId(req: Request, res: Response): Promise<void> {
    try {
      const orders = await orderService.getOrdersByUserId(req.params.userId);
      res.status(200).json(orders);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      res.status(500).json({ message: errorMessage });
    }
  }

  async updateOrder(req: Request, res: Response): Promise<void> {
    try {
      const { userId, gadgetsId, quantity } = req.body;
      const order = await orderService.updateOrder(userId, gadgetsId, quantity);
      if (order) {
        res.status(200).json(order);
      } else {
        res.status(404).json({ message: "Order not found" });
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      res.status(500).json({ message: errorMessage });
    }
  }

  async deleteGadgetFromOrder(req: Request, res: Response): Promise<void> {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new Error("You are not authorized!");
      }

      const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string
      ) as JwtPayload;
      const { userId } = decoded;

      const { gadgets_id } = req.params;
      console.log("gadgets_id", gadgets_id);

      const order = await orderService.deleteGadgetFromOrder(
        userId,
        gadgets_id
      );
      if (order) {
        res.status(200).json({ message: "Gadget deleted from order", order });
      } else {
        res.status(404).json({ message: "Order or gadget not found" });
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      res.status(500).json({ message: errorMessage });
    }
  }
}

export default new OrderController();
