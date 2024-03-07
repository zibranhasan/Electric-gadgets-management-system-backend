// electricGadget.service.ts

import { ElectricGadget, FilterOptions } from "./electricGadget.interface";
import { ElectricGadgetModel } from "./electricGadget.model";

export class ElectricGadgetService {
  static async addElectricGadget(
    electricGadget: ElectricGadget
  ): Promise<ElectricGadgetModel> {
    const newGadget = new ElectricGadgetModel(electricGadget);
    return newGadget.save();
  }

  static async deleteElectricGadget(id: string): Promise<void> {
    await ElectricGadgetModel.findByIdAndDelete(id);
  }

  static async updateElectricGadget(
    id: string,
    updatedData: ElectricGadget
  ): Promise<ElectricGadgetModel | null> {
    return ElectricGadgetModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
  }

  static async getElectricGadgets(): Promise<ElectricGadgetModel[]> {
    return ElectricGadgetModel.find();
  }

  static async filterElectricGadgets(
    filterOptions: FilterOptions
  ): Promise<ElectricGadgetModel[]> {
    try {
      // console.log("Filtering gadgets with options:", filterOptions);
      // Start with a base query to retrieve all gadgets
      let query = ElectricGadgetModel.find();
      // Filter by Price Range
      if (filterOptions.priceRange) {
        if ("min" in filterOptions.priceRange) {
          query = query
            .where("price")
            .gte(filterOptions.priceRange.min || 0)
            .lte(filterOptions.priceRange.max || 9999);
        } else if (Array.isArray(filterOptions.priceRange)) {
          query = query
            .where("price")
            .gte(filterOptions.priceRange[0] || 0)
            .lte(filterOptions.priceRange[1] || 9999);
        }
      }

      // Filter by Release Date
      if (filterOptions.releaseDate) {
        query = query.where("releaseDate").equals(filterOptions.releaseDate);
      }

      // Filter by Brand
      if (filterOptions.brand) {
        query = query.where("brand").equals(filterOptions.brand);
      }

      // Filter by Model Number
      if (filterOptions.modelNumber) {
        query = query.where("modelNumber").equals(filterOptions.modelNumber);
      }

      // Filter by Category
      if (filterOptions.category) {
        query = query.where("category").equals(filterOptions.category);
      }

      // Filter by Operating System
      if (filterOptions.operatingSystem) {
        query = query
          .where("operatingSystem")
          .equals(filterOptions.operatingSystem);
      }

      // Filter by Connectivity
      if (filterOptions.connectivity && filterOptions.connectivity.length > 0) {
        query = query.where("connectivity").in(filterOptions.connectivity);
      }

      // Filter by Power Source
      if (filterOptions.powerSource) {
        query = query.where("powerSource").equals(filterOptions.powerSource);
      }

      // Filter by Features
      if (filterOptions.features && filterOptions.features.length > 0) {
        query = query.where("features").all(filterOptions.features);
      }
      // Execute the query and return the result
      const result = await query.exec();
      return result;
    } catch (error) {
      // Handle errors appropriately (logging, rethrowing, etc.)
      console.error(`Error filtering electric gadgets: ${error}`);
      throw new Error("Failed to filter electric gadgets");
    }
  }
  // electricGadget.service.ts
  static async deleteMultipleElectricGadgets(
    gadgetIds: string[]
  ): Promise<void> {
    await ElectricGadgetModel.deleteMany({ _id: { $in: gadgetIds } });
  }

  static async getElectricGadgetsByIdFromDB(
    id: string
  ): Promise<ElectricGadgetModel | null> {
    return ElectricGadgetModel.findById(id);
  }
}
