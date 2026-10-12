export const FONT_FAMILY = Object.freeze({
  regular: "Inter_400Regular",
  medium: "Inter_500Medium",
  semibold: "Inter_600SemiBold",
  bold: "Inter_700Bold",
  extrabold: "Inter_800ExtraBold",
});

const NAMED_WEIGHTS = {
  thin: 100,
  extralight: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
};

export function familyForWeight(weight) {
  const n =
    typeof weight === "number"
      ? weight
      : weight === "bold"
        ? 700
        : weight === "normal"
          ? 400
          : parseInt(weight, 10);
  if (!Number.isFinite(n) || n <= 400) return FONT_FAMILY.regular;
  if (n <= 500) return FONT_FAMILY.medium;
  if (n <= 600) return FONT_FAMILY.semibold;
  if (n <= 700) return FONT_FAMILY.bold;
  return FONT_FAMILY.extrabold;
}

function flattenStyle(style) {
  if (!style) return {};
  if (Array.isArray(style)) {
    return style.reduce((acc, item) => Object.assign(acc, flattenStyle(item)), {});
  }
  return typeof style === "object" ? style : {};
}

const FONT_CLASS = /(?:^|\s)font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black)(?=\s|$)/g;

export function weightFromClassName(className) {
  if (typeof className !== "string") return undefined;
  let found;
  for (const match of className.matchAll(FONT_CLASS)) found = NAMED_WEIGHTS[match[1]];
  return found;
}

export function resolveFontFamily(style, className) {
  const flat = flattenStyle(style);
  if (flat.fontFamily) return undefined;
  const weight = flat.fontWeight ?? weightFromClassName(className);
  return weight === undefined ? "inherit" : familyForWeight(weight);
}