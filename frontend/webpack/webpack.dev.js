const path = require('path')

module.exports = () => {
  return {
    mode: 'development',
    devServer: {
      hot: true,
      open: false,
      historyApiFallback: {
        disableDotRule: true,
        index: '/',
      },
    },
    output: {
      path: path.resolve(__dirname, '..', 'build'),
      publicPath: '/',
      filename: '[contenthash].bundle.js',
      clean: true,
    },
  }
}
