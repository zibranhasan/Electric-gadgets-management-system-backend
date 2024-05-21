export interface ElectricGadget {
  _id: string;
  name: string;
  photo: File | null;
  price: number;
  quantity: number;
  releaseDate: Date;
  brand: string;
  modelNumber: string;
  category: string;
  operatingSystem?: string;
  connectivity?: string[];
  powerSource?: string;
  features?: string[];
  weight?: number;
}

// Filter Options Interface
export interface FilterOptions {
  priceRange?: { min: number; max: number } | [number, number];
  releaseDate?: Date;
  brand?: string;
  modelNumber?: string;
  category?: string;
  operatingSystem?: string;
  connectivity?: [];
  powerSource?: string;
  features?: string[];
  weight?: number;
}
