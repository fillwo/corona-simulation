const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = env => {
  console.log('is production', env.production, env.development)

  const mainConfig = {
    entry: './src/index.ts',
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: 'template.html'
      }),
    ],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ],
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
  }

  const prodConfig = {
    mode: 'production'
  }

  const devConfig = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist'
    }
  }

  if (env.production) {
    return {...prodConfig, ...mainConfig}
  } else {
    return {...devConfig, ...mainConfig}
  }
 
};