const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin');
const pro = process.env.NODE_ENV !== 'production'
module.exports = {
  entry: ['core-js', './src/app.ts'],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [pro ? MiniCssExtractPlugin.loader : 'style-loader' , 'css-loader']
      },
      {
        test: /\.scss$/,
        use: [
          pro ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader?outputPath=images']
      }
    ]
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: { drop_console: true }
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', 'css', 'scss'],
    alias: {
      '@lib': path.resolve(__dirname, 'src/lib')
    }
  },
  output: {
    filename: pro ? '[name].[hash].js' : 'bundle.js',
    path: path.resolve(__dirname, 'docs')
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: pro ? '[name].[hash].css': '[name].css',
      chunkFilename: pro ? '[id].[hash].css': '[id].css'
    }),
    new CleanWebpackPlugin(['docs']),
    new HtmlWebpackPlugin({
      title: 'eluosi',
      template: 'index.html'
    })
  ]
}
