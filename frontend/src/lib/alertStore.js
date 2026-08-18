import { create } from "zustand";

export const useAlertStore = create((set) => ({
  visible: false,
  title: "",
  message: "",
  buttons: [],

  show: (title, message, buttons) =>
    set({
      visible: true,
      title: title ?? "",
      message: message ?? "",
      buttons: buttons && buttons.length > 0 ? buttons : [{ text: "OK" }],
    }),

  hide: () => set({ visible: false }),
}));
