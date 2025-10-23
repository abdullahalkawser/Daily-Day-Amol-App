module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    [
      'react-native-reanimated/plugin',
      {
        disableDebugLogs: true, // ✅ disables these warnings
        babelPlugin: true,
      },
    ],
  ],
};
