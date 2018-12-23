import process from "process";
import chalk from "chalk";
import dotenv from "dotenv";
import PluginProgressBar from "progress-bar-webpack-plugin";
import webpack from "webpack";
import { BundleAnalyzerPlugin as PluginAnalyzer } from "webpack-bundle-analyzer";
import WebpackDevServer from "webpack-dev-server";

dotenv.config();

const analyzerHost = process.env.ANALYZER_HOST || "localhost";
const analyzerPort = process.env.ANALYZER_PORT || "8009";
const serverHost = process.env.DEV_HOST || "localhost";
const serverPort = process.env.DEV_PORT || 8008;

/* eslint-disable no-console */
const analyzerInfo = `${analyzerHost}:${analyzerPort}`;
const serverInfo = `${serverHost}:${serverPort}`;
console.log(`App available on ${chalk.green.bold(serverInfo)}`);
console.log(`Analyzer available on ${chalk.green.bold(analyzerInfo)}\n`);
/* eslint-enable no-console */

const config = {
  target: "web",
  devtool: "sourcemaps",
  entry: [
    `webpack-dev-server/client?http://${serverHost}:${serverPort}`,
    "./src/app",
  ],
  output: {
    path: `${__dirname}/public`,
    filename: "bundle.js",
    publicPath: "/",
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: [
          {
            loader: "babel-loader",
            options: {
              plugins: ["lodash", "react-bootstrap", "syntax-function-bind"],
              presets: ["env", "react", "stage-1"],
            },
          },
        ],
      },
      {
        test: /\.s?css$/,
        loaders: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|jpg|png|gif|swf|ogg)$/,
        loader: "file-loader",
        options: {
          publicPath: "/",
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        API_URL: JSON.stringify(process.env.API_URL),
        NODE_ENV: JSON.stringify("development"),
      },
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/),
    new PluginAnalyzer({
      analyzerHost,
      analyzerPort,
      logLevel: "warn",
      openAnalyzer: false,
    }),
    new PluginProgressBar({
      clear: false,
      complete: chalk.green.bold("#"),
      format: "Building... [:bar] :current/:total",
      incomplete: " ",
      renderThrottle: 500,
      summary: false,
      width: 20,
    }),
  ],
};

const compiler = webpack(config);

const server = new WebpackDevServer(compiler, {
  contentBase: `${__dirname}/public`,
  watchContentBase: true,
  historyApiFallback: true,
  compress: true,
  clientLogLevel: "info",
  filename: "bundle.js",
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
  },
  publicPath: "/",
  stats: {
    assets: false,
    cached: false,
    cachedAssets: false,
    children: false,
    chunks: false,
    chunkModules: false,
    chunkOrigins: false,
    colors: true,
    depth: false,
    entrypoints: false,
    errors: true,
    errorDetails: true,
    hash: false,
    maxModules: 0,
    modules: false,
    performance: false,
    providedExports: false,
    publicPath: false,
    reasons: false,
    source: false,
    timings: true,
    usedExports: false,
    version: false,
    warnings: false,
  },
});

server.listen(serverPort, serverHost, err => {
  if (err) {
    return console.log(err);
  }
  console.log(`Listening at http://${serverHost}:${serverPort}`);
});
