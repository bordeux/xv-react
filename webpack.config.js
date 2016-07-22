var webpack = require('webpack'),
    path = require('path'),
    yargs = require('yargs'),
  glob = require("glob");

var libraryName = 'XvReact',
    plugins = [],
    outputFile;

if (yargs.argv.p) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({ minimize: true }));
  outputFile = libraryName + '.min.js';
} else {
  outputFile = libraryName + '.js';
}

var config = {
  entry: './src/Module.tsx',
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    preLoaders: [
      { test: /\.tsx?$/, loader: 'tslint', exclude: /node_modules/ }
    ],
    loaders: [
      { test: /\.ts(x?)$/, loaders: ["babel-loader", "ts-loader"],  exclude: /node_modules/ }
    ]
  },
  resolve: {
    root: path.resolve('./src'),
    extensions: [ '', '.js', '.ts', '.jsx', '.tsx' ]
  },
  plugins: plugins,

  // Individual Plugin Options
  tslint: {
    emitErrors: true,
    failOnHint: true
  },
  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  }
};

module.exports = config;
