// electricGadget.controller.ts
import { Request, Response } from "express";
import { ElectricGadgetService } from "./electricGadget.service";
import { FilterOptions } from "./electricGadget.interface";

export class ElectricGadgetController {
  static async addElectricGadget(req: Request, res: Response): Promise<void> {
    try {
      const newGadget = await ElectricGadgetService.addElectricGadget(req.body);
      res.json(newGadget);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async deleteElectricGadget(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      await ElectricGadgetService.deleteElectricGadget(req.params.id);
      res.json({ message: "Electric gadget deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async updateElectricGadget(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const updatedGadget = await ElectricGadgetService.updateElectricGadget(
        req.params.id,
        req.body
      );
      if (updatedGadget) {
        res.json(updatedGadget);
      } else {
        res.status(404).json({ message: "Electric gadget not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getElectricGadgets(req: Request, res: Response): Promise<void> {
    try {
      const gadgets = await ElectricGadgetService.getElectricGadgets();
      res.json({ data: gadgets });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getElectricGadgetsById(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const gadget = await ElectricGadgetService.getElectricGadgetsByIdFromDB(
        req.params.id
      );

      if (gadget) {
        res.json({
          message: "Electric gadget retrieved by id successfully",
          data: gadget,
        });
      } else {
        res.status(404).json({ message: "Electric gadget not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async filterElectricGadgets(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const filterOptions: FilterOptions = req.body;

      // Convert priceRange to the object format expected by the backend
      if (filterOptions.priceRange && Array.isArray(filterOptions.priceRange)) {
        filterOptions.priceRange = {
          min: filterOptions.priceRange[0],
          max: filterOptions.priceRange[1],
        };
      }

      const filteredGadgets = await ElectricGadgetService.filterElectricGadgets(
        filterOptions
      );

      res.json(filteredGadgets);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // electricGadget.controller.ts
  static async deleteMultipleElectricGadgets(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const gadgetIds: string[] = req.body.gadgetIds;
      await ElectricGadgetService.deleteMultipleElectricGadgets(gadgetIds);
      res.json({ message: "Electric gadgets deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
