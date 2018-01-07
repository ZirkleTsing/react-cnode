const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const baseConfig = require('./webpack.config.base')
const OssConfig = require('./deploy.config').OssConfig

const config = merge(baseConfig, {
  target: 'node',
  entry: {
    app: path.join(__dirname, '../client/server-entry.js')
  },
  output: {
    filename: 'server-entry.js',
    libraryTarget: 'commonjs2',
    publicPath: `http://${OssConfig.bucket}.${OssConfig.region}.${OssConfig.prefix}/${OssConfig.bucket}/`
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.API_BASE': '"http://127.0.0.1:3333"'
    })
  ]
})

module.exports = config
