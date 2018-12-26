const path = require("path");
const {
  VueLoaderPlugin
} = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const exec = require('child_process').exec;

module.exports = {
  mode: 'development',
  entry: {
    "index": './src/index.js',
  },
  output: {
    path: `${__dirname}/dist/js`,
    filename: "[name].js",
  },
  module: {
    rules: [{
        test: /\.vue?$/,
        loader: 'vue-loader',
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ]
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
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
      'vue$': 'vue/dist/vue.esm.js'
    },
  }
}