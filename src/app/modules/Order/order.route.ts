import { Router } from "express";
import orderController from "./order.controller";

const router = Router();

// router.post("/orders", orderController.createOrder);
// router.get("/orders/:id", orderController.getOrderById);
router.get("/orders", orderController.getAllOrders);
router.put("/orders", orderController.updateOrder);
router.get("/orders/user/:userId", orderController.getOrdersByUserId);
router.delete("/orders/:gadgets_id", orderController.deleteGadgetFromOrder);

export const OrderRoutes = router;
