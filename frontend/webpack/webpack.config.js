const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common')
const prodConfig = require('./webpack.prod')
const devConfig = require('./webpack.dev')

module.exports = ({ config }) => {
  let mergedConfig
  switch (config) {
    case 'development':
      mergedConfig = merge(commonConfig(config), devConfig())
      break
    default:
      mergedConfig = merge(commonConfig(config), prodConfig())
      break
  }

  return mergedConfig
}
