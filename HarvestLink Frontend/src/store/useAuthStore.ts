import { create } from "zustand";

type Role = "farmer" | "buyer" | null;

type AuthState = {
  role: Role;
  phoneNumber: string | null;
  isVerified: boolean;
  setRole: (role: Role) => void;
  setPhoneNumber: (phone: string) => void;
  verify: () => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  role: null,
  phoneNumber: null,
  isVerified: false,
  setRole: (role) => set({ role }),
  setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
  verify: () => set({ isVerified: true }),
  logout: () => set({ role: null, phoneNumber: null, isVerified: false }),
}));
