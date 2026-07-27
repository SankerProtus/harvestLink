import { create } from "zustand";

type Listing = {
  id: string;
  title: string;
  cropType: string;
  location: string;
  quantityLabel: string;
  pricePerKg: number;
  rating: number;
};

type MarketplaceState = {
  listings: Listing[];
  setListings: (listings: Listing[]) => void;
};

export const useMarketplaceStore = create<MarketplaceState>((set) => ({
  listings: [
    { id: "1", title: "Fresh Tomatoes", cropType: "Tomatoes", location: "Ejura, Ashanti", quantityLabel: "120kg avail.", pricePerKg: 8.5, rating: 4.8 },
    { id: "2", title: "Yellow Maize", cropType: "Maize", location: "Ejura, Ashanti", quantityLabel: "120kg avail.", pricePerKg: 8.5, rating: 4.8 },
    { id: "3", title: "Cassava Tubers", cropType: "Cassava", location: "Ejura, Ashanti", quantityLabel: "120kg avail.", pricePerKg: 8.5, rating: 4.8 },
    { id: "4", title: "Ripe Plantain", cropType: "Plantain", location: "Ejura, Ashanti", quantityLabel: "120kg avail.", pricePerKg: 8.5, rating: 4.8 },
  ],
  setListings: (listings) => set({ listings }),
}));
