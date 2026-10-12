import { createContext, useContext } from "react";
import { Text as RNText, TextInput as RNTextInput } from "react-native";
import { FONT_FAMILY, resolveFontFamily } from "../../theme/fonts.js";

const DEFAULT_MAX_FONT_SCALE = 1.4;

const InsideText = createContext(false);

export function Text({
  className,
  style,
  maxFontSizeMultiplier = DEFAULT_MAX_FONT_SCALE,
  ...props
}) {
  const nested = useContext(InsideText);
  const resolved = resolveFontFamily(style, className);

  let fontStyle;
  if (resolved === "inherit") {
    fontStyle = nested
      ? undefined
      : { fontFamily: FONT_FAMILY.regular, fontWeight: "normal" };
  } else if (resolved) {
    fontStyle = { fontFamily: resolved, fontWeight: "normal" };
  }

  return (
    <InsideText.Provider value>
      <RNText
        {...props}
        className={className}
        maxFontSizeMultiplier={maxFontSizeMultiplier}
        style={fontStyle ? [style, fontStyle] : style}
      />
    </InsideText.Provider>
  );
}

export function TextInput({
  className,
  style,
  maxFontSizeMultiplier = DEFAULT_MAX_FONT_SCALE,
  ...props
}) {
  const resolved = resolveFontFamily(style, className);
  const family = resolved === "inherit" ? FONT_FAMILY.regular : resolved;

  return (
    <RNTextInput
      {...props}
      className={className}
      maxFontSizeMultiplier={maxFontSizeMultiplier}
      style={
        family ? [style, { fontFamily: family, fontWeight: "normal" }] : style
      }
    />
  );
}
