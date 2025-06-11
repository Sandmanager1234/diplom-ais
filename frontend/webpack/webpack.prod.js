const path = require('path')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = () => {
  return {
    mode: 'production',
    optimization: {
      minimizer: [
        new TerserWebpackPlugin({
          extractComments: false,
          terserOptions: {
            format: {
              comments: false,
            },
          },
        }),
      ],
    },
    output: {
      path: path.resolve(__dirname, '..', 'build'),
      publicPath: '/',
      filename: '[contenthash].bundle.js',
      clean: true,
    },
    plugins: [
        new CopyWebpackPlugin({
          patterns: [
            {
              from: path.resolve(__dirname, '..', 'public/manifest.json'),
              to: path.resolve(__dirname, '..', 'build/manifest.json')
            }
          ]
        })
    ],
  }
}
