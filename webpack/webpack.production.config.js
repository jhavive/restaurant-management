var path = require('path')
const { getAlias } = require('./alias')
const webpack = require('webpack')
const { moduleRules } = require('./moduleRules.production')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MinifyPlugin = require('babel-minify-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const APP_DIR = path.resolve(__dirname, '../src')

const htmlPlugin = new HtmlWebPackPlugin({
  template: './src/index.html',
  filename: './index.html',
  minify: {
    // removeComments: true,
    collapseWhitespace: true,
    removeRedundantAttributes: true,
    useShortDoctype: true,
    removeEmptyAttributes: true,
    removeStyleLinkTypeAttributes: true,
    keepClosingSlash: true,
    minifyJS: true,
    minifyCSS: true,
    minifyURLs: true,
    minifyHTML: true
  }
})

module.exports = {
  entry: path.resolve(__dirname, '../src/index.js'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name]-index_bundle-[hash].js',
    publicPath: '/'
  },
  devServer: {
    historyApiFallback: true
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'modules',
          chunks: 'all',
          reuseExistingChunk: true,
          enforce: true
        }
      }
    },
    runtimeChunk: {
      name: 'runtime'
    },
    minimizer: [
      // new UglifyJsPlugin({
      //   test: /\.(js)(\?.*)?$/i,
      //   cache: true,
      //   parallel: true,
      //   uglifyOptions: {
      //     warnings: false,
      //     parse: {},
      //     compress: {
      //       drop_console: true,
      //       unused: true,
      //     },
      //     mangle: true, // Note `mangle.properties` is `false` by default.
      //     output: null,
      //     toplevel: false,
      //     nameCache: null,
      //     ie8: false,
      //     keep_fnames: false
      //   }
      // }),
      // new TerserPlugin({
      //   test: /\.js(\?.*)?$/i,
      //   cache: true,
      //   parallel: true,
      //   sourceMap: false,
      //   // extractComments: 'all',
      //   terserOptions: {
      //     ecma: undefined,
      //     warnings: false,
      //     parse: {},
      //     compress: {
      //       // drop_console: true
      //       // unused: trueƒ
      //     },
      //     mangle: true, // Note `mangle.properties` is `false` by default.
      //     module: false,
      //     output: {
      //       comments: false
      //     },
      //     // keep_classnames: undefined,
      //     keep_fnames: false,
      //     safari10: false
      //   },
      //   // chunkFilter: chunk => {
      //   //   // Exclude uglification for the `vendor` chunk
      //   //   if (chunk.name === 'modules') {
      //   //     return false
      //   //   }

      //   //   return true
      //   // },
      //   minify: (file, sourceMap) => {
      //     const extractedComments = []
      //     const { error, map, code, warnings } = require('uglify-js') // Or require('./path/to/uglify-module')
      //       .minify(file, {
      //         parse: {
      //           html5_comments: true
      //         },
      //         compress: {
      //           dead_code: true,
      //           // drop_console: true,
      //           // drop_debugger: true,
      //           unused: true
      //         },
      //         mangle: {},
      //         output: {},
      //         sourceMap: false,
      //         nameCache: null, // or specify a name cache object
      //         toplevel: false,
      //         ie8: false,
      //         warnings: false
      //       })

      //     return { error, map, code, warnings, extractedComments }
      //   }
      // })
    ]
  },
  module: moduleRules,
  plugins: [
    htmlPlugin,
    new webpack.DefinePlugin({
      'process.env': {
        SERVER_ENV: JSON.stringify(process.env.SERVER_ENV)
      }
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'style_bundle-[hash].min.css',
      allChunks: true
    })
  ],
  resolve: {
    alias: getAlias(APP_DIR)
  }
}
