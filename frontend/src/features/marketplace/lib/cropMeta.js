// Emoji are stand-ins until you have real category photography.
export const CROP_META = Object.freeze({
  TOMATO: { label: "Tomato", emoji: "🍅" },
  MAIZE: { label: "Maize", emoji: "🌽" },
  CASSAVA: { label: "Cassava", emoji: "🌱" },
  PLANTAIN: { label: "Plantain", emoji: "🍌" },
  YAM: { label: "Yam", emoji: "🍠" },
  PEPPER: { label: "Pepper", emoji: "🌶️" },
  ONION: { label: "Onion", emoji: "🧅" },
  RICE: { label: "Rice", emoji: "🌾" },
  GROUNDNUT: { label: "Groundnut", emoji: "🥜" },
  COCOA: { label: "Cocoa", emoji: "🍫" },
});

export const CROP_LIST = Object.entries(CROP_META).map(([value, meta]) => ({
  value,
  ...meta,
}));