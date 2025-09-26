// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Use the correct transformer path
config.transformer.babelTransformerPath = require.resolve(
  "react-native-css-interop/metro/transformer"
);
config.resolver.sourceExts.push("css");

module.exports = config;
