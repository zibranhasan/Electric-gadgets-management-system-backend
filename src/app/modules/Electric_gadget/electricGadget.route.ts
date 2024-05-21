import express from "express";
import { ElectricGadgetController } from "./electricGadget.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/add",
  auth("manager"),
  ElectricGadgetController.addElectricGadget
);
router.delete(
  "/:id",
  auth("manager"),
  ElectricGadgetController.deleteElectricGadget
);
router.put("/update/:id", ElectricGadgetController.updateElectricGadget);
router.get("/", ElectricGadgetController.getElectricGadgets);
router.get("/:id", ElectricGadgetController.getElectricGadgetsById);
router.post("/filter", ElectricGadgetController.filterElectricGadgets);
router.post(
  "/delete-multiple",
  ElectricGadgetController.deleteMultipleElectricGadgets
);

export const ElectricGadgetRoutes = router;
