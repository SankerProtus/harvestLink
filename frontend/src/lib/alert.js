import { useAlertStore } from "./alertStore.js";

export const Alert = {
  alert(title, message, buttons) {
    useAlertStore.getState().show(title, message, buttons);
  },
};
