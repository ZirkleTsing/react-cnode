const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const NamedAllModulesPlugin = require('name-all-modules-plugin')
const OssConfig = require('./deploy.config').OssConfig

const isDev = process.env.NODE_ENV === 'development'

const config = merge(baseConfig, {
  entry: {
    app: path.join(__dirname, '../client/index.js')
  },
  output: {
    filename: '[name].[hash].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../template.html'),
      filename: 'index.html',
      title: 'my webpack demo'
    }),
    // https://github.com/jantimon/html-webpack-plugin/blob/master/docs/template-option.md 2) Setting a loader directly for the template
    new HtmlWebpackPlugin({
      template: '!!ejs-compiled-loader!' + path.join(__dirname, '../server.template.ejs'),
      filename: 'index.server.ejs'
    })
  ]
})

if (isDev) {
  console.log('====== developemt mode ======')
  config.entry = {
    app: [
      'react-hot-loader/patch',
      path.join(__dirname, '../client/index.js')
    ]
  }
  config.devtool = 'cheap-module-eval-source-map'
  config.devServer = {
    host: '0.0.0.0',
    // compress: true,  // wtf
    port: '8888',
    contentBase: path.join(__dirname, '../dist'),
    publicPath: '/public/',
    overlay: {
      errors: true
    },
    hot: true,
    historyApiFallback: {
      // rewrites: [
      //   { from: /^\/$/, to: '/public/index.html' }
      // ]
      index: '/public/index.html'
    },
    proxy: {
      '/api': 'http://localhost:3333'
    }
  }
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
  // config.plugins.push(new webpack.DefinePlugin({'process.env.API_BASE': '"http://127.0.0.1:3333"'}))
  // https://webpack.js.org/guides/hot-module-replacement/#enabling-hmr
} else {
  console.log('====== production mode ======')
  config.entry = {
    app: path.join(__dirname, '../client/index.js'),
    vendor: [
      'react',
      'react-router-dom',
      'react-dom',
      'redux',
      'react-redux',
      'redux-thunk',
      'axios',
      'marked',
      'dateformat'
    ]
  }
  config.output.filename = '[name].[chunkhash].js'
  config.output.publicPath = `http://${OssConfig.bucket}.${OssConfig.region}.${OssConfig.prefix}/${OssConfig.bucket}/`
  config.plugins.push(
    // new webpack.optimize.UglifyJsPlugin(), // 压缩js代码
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    new webpack.NamedModulesPlugin(), // [0] => 具名chunk
    new NamedAllModulesPlugin(), // patch for NamedModulesPlugin
    // new webpack.DefinePlugin({ // tell the react whether the env is production bundle or development bundle
    //   'process.env': {
    //     NODE_ENV: JSON.stringify('production')
    //   }
    // })
    new webpack.NamedChunksPlugin((chunk) => { // avoid anonymous chunks
      if (chunk.name) {
        return chunk.name
      }
      return chunk.mapModules(m => path.relative(m.context, m.request)).join('_')
    })
  )
}

module.exports = config
