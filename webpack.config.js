const path = require("path");
const {
  VueLoaderPlugin
} = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const exec = require('child_process').exec;
var webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    "index": './src/main.js',
  },
  output: {
    path: `${__dirname}/dist/js`,
    publicPath: '/js/',
    filename: "index.js"
  },
  module: {
    rules: [
      { test: /\.vue?$/, loader: 'vue-loader' },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ]
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.(otf|eot|svg|ttf|woff|woff2)(\?.+)?$/, loader: 'url-loader'},
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    {
      apply: (compiler) => {
        compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
          exec('sh copy.sh', (err, stdout, stderr) => {
            if (stdout) process.stdout.write(stdout);
            if (stderr) process.stderr.write(stderr);
          });
        });
      }
    }
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
    },
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 9000,
    host: 'localhost',
    inline: true,
    compress: true,
    open: true,
    openPage: './index.html',
    watchContentBase: true,
    hot: true
  },
  devtool: "source-map"
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}