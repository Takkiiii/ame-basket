const path = require("path");
const {
  VueLoaderPlugin
} = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const exec = require('child_process').exec;

module.exports = {
  // モードの設定 development/production/none の3択
  // development:souceMap有効でjsファイル出力、  production: 最適化された状態でjsファイル出力
  mode: 'development',
  // エントリーポイントの設定
  entry: './src/ts/app.ts',
  output: {
    path: __dirname + '/dist', // path.join(__dirname, 'dist')でも可だが絶対パスの指定が必要。というかwindows環境でも使うことを考えればpath使ったほうが無難？
    filename: 'js/bundle.js',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/bundle.css'
    })
  ],
  module: {
    rules: [{ // 拡張子 .ts の場合
        test: /\.ts$/,
        // TypeScript をコンパイルする
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.vue?$/,
        loader: 'vue-loader',
      },
      {
        test: /\.(sc|sa|c)ss/,
        use: [{
          loader: MiniCssExtractPlugin.loader
        }, {
          loader: 'css-loader',
          options: {
            url: false,
            sourceMap: true,
            minimize: true,
          }
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }]
      }
    ]
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
  // import 文で .ts ファイルを解決するため
  resolve: {
    extensions: ['.ts', '.js'],
  }
}