import { create } from "zustand";

type MatchedBuyer = {
  id: string;
  name: string;
  distanceKm: number;
  wantsKg: number;
  status: "matched" | "pending";
};

type ProduceDetail = {
  id: string;
  title: string;
  pricePerKg: number;
  location: string;
  farmName: string;
  farmerName: string;
  quantityKg: number;
  availableDate: string;
  matchedBuyers: MatchedBuyer[];
};

type DeliveryStatus = {
  driverName: string;
  vehicle: string;
  etaMinutes: number;
  buyerName: string;
  steps: { label: string; time: string; done: boolean }[];
};

type DeliveryState = {
  produceDetail: ProduceDetail | null;
  delivery: DeliveryStatus | null;
  confirmMatch: (buyerId: string) => void;
  setProduceDetail: (detail: ProduceDetail) => void;
};

export const useDeliveryStore = create<DeliveryState>((set, get) => ({
  produceDetail: {
    id: "1",
    title: "Fresh Tomatoes",
    pricePerKg: 8.5,
    location: "Ejura, Ashanti Region",
    farmName: "Asante Family Farm",
    farmerName: "Kwaku Asante",
    quantityKg: 120,
    availableDate: "Jul 15",
    matchedBuyers: [
      { id: "b1", name: "Ama Serwaa Foods", distanceKm: 2.3, wantsKg: 80, status: "matched" },
      { id: "b2", name: "Kumasi Central Market", distanceKm: 4.1, wantsKg: 150, status: "pending" },
    ],
  },
  delivery: {
    driverName: "Yaw Boateng",
    vehicle: "Toyota Hilux · GR 4521-22",
    etaMinutes: 18,
    buyerName: "Ama Serwaa Foods",
    steps: [
      { label: "Picked up from farm", time: "9:02 AM", done: true },
      { label: "On the way", time: "9:14 AM", done: true },
      { label: "Arriving at destination", time: "ETA 9:32 AM", done: false },
    ],
  },
  setProduceDetail: (detail) => set({ produceDetail: detail }),
  confirmMatch: (buyerId) => {
    const detail = get().produceDetail;
    if (!detail) return;
    set({
      produceDetail: {
        ...detail,
        matchedBuyers: detail.matchedBuyers.map((b) =>
          b.id === buyerId ? { ...b, status: "matched" } : b
        ),
      },
    });
  },
}));
