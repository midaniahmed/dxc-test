import chalk from "chalk";
import PluginExtractText from "extract-text-webpack-plugin";
import PluginProgressBar from "progress-bar-webpack-plugin";
import webpack from "webpack";

const config = {
  target: "web",
  entry: ["./src/app"],
  output: {
    path: `${__dirname}/public`,
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {},
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
              plugins: ["lodash", "syntax-function-bind"],
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
        test: /\.(eot|svg|ttf|woff|woff2|jpg|png|gif|ogg|swf)$/,
        loader: "file-loader",
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        API_URL: JSON.stringify(process.env.API_URL),
        NODE_ENV: JSON.stringify("production"),
      },
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/),
    new PluginExtractText("styles.css"),
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

compiler.run(() => {});
