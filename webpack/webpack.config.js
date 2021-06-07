var path = require('path')
const { getAlias } = require('./alias')
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')

const htmlPlugin = new HtmlWebPackPlugin({
  template: './src/index.html',
  filename: './index.html'
})

const APP_DIR = path.resolve(__dirname, '../src')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'), 
    filename: 'index_bundle.js',
    publicPath: '/'
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, 'app', 'seo')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          query: {
            presets: ['react', 'es2015'],
            plugins: ['transform-class-properties']
          }
        }
      },
      // {
      //     test: /\.css$/,
      //     use: [
      //     {
      //         loader: 'style-loader'
      //     },
      //     {
      //         loader: 'css-loader',
      //         options: {
      //         modules: true,
      //         importLoaders: 1,
      //         localIdentName: '[name]_[local]_[hash:base64]',
      //         sourceMap: true,
      //         minimize: true
      //         }
      //     }
      //     ]
      // },
      {
        test: /\.scss$|\.css$/,
        use: [
          {
            loader: 'style-loader' // creates style nodes from JS strings
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            } // translates CSS into CommonJS
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            } // compiles Sass to CSS
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              emitFile: true
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|pdf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name]-[hash].[ext]',
              emitFile: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    htmlPlugin,
    new webpack.DefinePlugin({
      'process.env': {
        SERVER_ENV: JSON.stringify(process.env.SERVER_ENV || 'development')
      }
    })
  ],
  resolve: {
    alias: getAlias(APP_DIR)
  }
}
