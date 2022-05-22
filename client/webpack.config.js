const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "JATE",
      }),
      // injects our custom service work from src-sw.js
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "src-sw.js",
      }),


    // TODO: Add the correct modules
    module: {

    }
  };
};
