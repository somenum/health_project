const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const HTMLWebpackPartialsPlugin = require('html-webpack-partials-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all'
    }
  };

  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetsWebpackPlugin(),
      new TerserWebpackPlugin()
    ];
  }
  return config;
};

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: ['@babel/polyfill', './index.js']
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    alias: {
      assets: path.resolve(__dirname, 'src')
    }
  },
  optimization: optimization(),
  devtool: isDev ? 'source-map' : false,
  devServer: {
    port: 4200,
    hot: isDev
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(?:ico|png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              context: path.resolve(__dirname, 'src'),
              name: 'img/[name].[ext]',
              useRelativePath: true
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true
              },
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4
              },
              gifsicle: {
                interlaced: false
              }
            }
          }
        ]
      },
      {
        test: /\.(ttf|otf|woff|woff2|eot)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]',
              useRelativePath: true
            }
          }
        ]
      },
      {
        test: /\.xml$/,
        use: ['xml-loader']
      },
      {
        test: /\.csv$/,
        use: ['csv-loader']
      },
      {
        test: /\.(js|ts)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      }

    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new HTMLWebpackPartialsPlugin([
      {
        path: path.join(__dirname, './src/blocks/header/header.html'),
        location: 'header'
      },
      {
        path: path.join(__dirname, './src/blocks/main-content/main-content.html'),
        location: 'mainContent'
      },
      {
        path: path.join(__dirname, './src/blocks/services/services.html'),
        location: 'services'
      },
      {
        path: path.join(__dirname, './src/blocks/tabs/tabs.html'),
        location: 'tabs'
      },
      {
        path: path.join(__dirname, './src/blocks/slider-part/slider-part.html'),
        location: 'sliderPart'
      },
      {
        path: path.join(__dirname, './src/blocks/pre-footer/pre-footer.html'),
        location: 'preFooter'
      },
      {
        path: path.join(__dirname, './src/blocks/footer/footer.html'),
        location: 'footer',
        template_filename: ['index.html']
      }
    ]),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/img'),
          to: path.resolve(__dirname, 'dist/img')
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ]
};
