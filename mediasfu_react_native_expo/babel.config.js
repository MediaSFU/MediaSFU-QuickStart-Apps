module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      '@babel/plugin-transform-block-scoping',
      'react-native-worklets/plugin'
    ],
  };
};
