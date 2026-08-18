// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const config = getDefaultConfig(__dirname);

config.resolver.blockList = [/\.claude\/.*/];

module.exports = withNativeWind(config, { input: "./global.css" });
