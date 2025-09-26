// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// NativeWind v2 configuration
config.resolver.sourceExts.push("css");

module.exports = config;
