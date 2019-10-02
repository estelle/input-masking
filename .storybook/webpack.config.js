module.exports = ({ config: baseConfig }) => {
  baseConfig.module.rules.push({
      test: /\.(js|jsx|ts|tsx)$/,
      exclude: /node_modules/,
      use: {
          loader: 'babel-loader',
      },
  });
  baseConfig.resolve.extensions = ['.ts', '.tsx', '.js', '.json']
  baseConfig.module.rules.push({
      test: /\.(js|jsx|ts|tsx)$/,
      exclude: /node_modules/,
      use: {
          loader: 'babel-loader',
      },
  });

  baseConfig.resolve.alias = {
      ...baseConfig.resolve.alias,

  };

  return baseConfig;
};
