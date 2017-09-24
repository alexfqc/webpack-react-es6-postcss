const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    }
  }),
  new HtmlWebpackPlugin({
    title: 'alexfqc',
    template: 'app/view/index-template.html',
    minify: {
      collapseWhitespace: process.env.NODE_ENV === 'production'
    }
  })
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    })
  );
  plugins.push(new webpack.optimize.ModuleConcatenationPlugin());
}

if (process.env.NODE_ENV === 'development') {
  plugins.push(new webpack.HotModuleReplacementPlugin());
}

const entry =
  process.env.NODE_ENV === 'development'
    ? {
        app: [
          'webpack-hot-middleware/client?reload=true',
          'react-hot-loader/patch',
          './app/view/js/components/index.jsx'
        ]
      }
    : {
        app: './app/view/js/components/index.jsx'
      };

module.exports = {
  entry,
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devtool:
    process.env.NODE_ENV === 'production' ? 'source-map' : 'inline-source-map',

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, './app/view/'),
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.pcss$/,
        include: path.resolve(__dirname, './app/view/'),
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader:
              'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: function() {
                return [
                  require('postcss-import'),
                  require('postcss-mixins'),
                  require('postcss-cssnext')({
                    browsers: ['last 2 versions']
                  }),
                  require('postcss-nested'),
                  require('postcss-brand-colors')
                ];
              }
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(png|svg|jpg|webp)$/,
        use: {
          loader: 'file-loader'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [path.resolve(__dirname, 'node_modules')]
  },
  plugins
};
