/*eslint no-console: ["error", { allow: ["warn", "error", "info"] }] */
import fallback from 'express-history-api-fallback';
import express from 'express';
import fs from 'fs';
import compression from 'compression';
import spdy from 'spdy';

const app = express();
const isDevelopment = process.env.NODE_ENV === 'development';

const sslOptions = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
  passphrase: 'alexfqc'
};

if (isDevelopment) {
  const webpack = require('webpack');
  const webpackConfig = require('../../webpack.config.js');

  const compiler = webpack(webpackConfig);

  app.use(
    require('webpack-dev-middleware')(compiler, {
      hot: true,
      stats: {
        colors: true
      }
    })
  );

  app.use(require('webpack-hot-middleware')(compiler));
}

app.use(compression());
app.use(express.static('dist'));
app.use(fallback('index.html', { root: 'dist' }));

spdy.createServer(sslOptions, app).listen(process.env.PORT || 8080, error => {
  if (error) {
    console.error(error);
    return process.exit(1);
  } else {
    console.info(
      `App available at https://localhost:${process.env.PORT || 8080}`
    );
  }
});
