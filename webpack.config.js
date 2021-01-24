const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const config = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'MultipleValuesInput.js',
    library: 'MultipleValuesInput',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.sass|scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin({ filename: 'MultipleValuesInput.css' })],
  resolve: {
    extensions: ['.ts', '.js'],
  },
  watchOptions: {
    aggregateTimeout: 200,
    poll: 1000,
  },
}

module.exports = config
