const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const Dotenv = require('dotenv-webpack')

module.exports = env=>{
  return {
    entry: path.resolve(__dirname, '..', 'src/index.tsx'),
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
      modules: [path.resolve(__dirname, '..', 'src'), 'node_modules'],
      fallback: { "buffer": require.resolve("buffer/") }
    },
    module: {
      rules: [
        {
          test: /\.(js|ts|mjs)x?$/,
          exclude: [
            /\bcore-js\b/,
            /\bwebpack\/buildin\b/,
            /@babel\/runtime-corejs3/,
          ],
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  [
                    '@babel/preset-typescript',
                    {
                      useBuiltIns: 'entry',
                      corejs: 3,
                    },
                  ],
                ],
              },
            },
          ],
        },
        {
          test: /\.css$/,
          exclude: /\.module.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.module.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: '[name]__[local]--[hash:base64:5]',
                },
                sourceMap: true,
              },
            },
          ],
        },
        {
          test: /\.s[ac]ss$/i,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
  
        {
          test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
          type: 'assets/resource',
        },
        {
          test: /\.(woff(2)?|eot|ttf|otf)$/,
          type: 'asset/inline',
        },
        {
          test: /\.svg$/i,
          type: 'asset',
          resourceQuery: /url/, // *.svg?url
        },
        {
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/,
          resourceQuery: { not: [/url/] }, // exclude react component if *.svg?url
          use: ['@svgr/webpack'],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '..', 'public/index.html'),
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),
      new Dotenv({
        path:`./.env.${env}`,
        safe: true,
      })
    ],
  }
}
  
