import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  entry: './src/index.js',
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
  ],
  module: {
    rules: [
      { test: /\.css$/i, use: ['style-loader', 'css-loader'] },
      { test: /\.(png|svg|jpg|jpeg)$/i, type: 'asset/resource' },
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' }
      }
    ],
  },
  devServer: { static: './dist', open: true },
};