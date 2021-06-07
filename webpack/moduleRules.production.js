const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports.moduleRules = {
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
    {
      test: /\.(sa|sc|c)ss$/,
      use: [
        MiniCssExtractPlugin.loader,
        // 'style-loader', // creates style nodes from JS strings
        'css-loader',
        'sass-loader'
      ]
    },
    {
      test: /\.(jpe?g|png|gif|ico)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[path][name]-[hash].[ext]',
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
    },
    // {
    //   test: /\.(jpe?g|png)$/,
    //   loader: 'url-loader',
    //   options: {
    //     // Images larger than 10 KB won’t be inlined
    //     limit: 1024 * 50,
    //     fallback: 'image-webpack-loader'
    //   }
    // },
    {
      test: /\.svg$/,
      loader: 'svg-url-loader',
      options: {
        // Images larger than 10 KB won’t be inlined
        limit: 10 * 1024,
        // Remove quotes around the encoded URL –
        // they’re rarely useful
        noquotes: true
        // fallback: 'image-webpack-loader'
      }
    },
    {
      test: /\.(jpg|png|gif|svg)$/,
      loader: 'image-webpack-loader',
      // Specify enforce: 'pre' to apply the loader
      // before url-loader/svg-url-loader
      // and not duplicate it in rules with them
      enforce: 'pre',
      options: {
        mozjpeg: {
          progressive: true,
          quality: 65
        },
        // optipng.enabled: false will disable optipng
        optipng: {
          enabled: false
        },
        pngquant: {
          quality: '65-90',
          speed: 4
        },
        gifsicle: {
          interlaced: false
        }
        // the webp option will enable WEBP
        // webp: {
        //   quality: 75
        // }
      }
    }
  ]
}
