import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import configureStore from '../store/configureStore';
import DevTools from './devTools/DevTools';

const rootEl = document.getElementById('app');

const isProduction = process.env.NODE_ENV === 'production';

const store = configureStore();

render(
  <Provider store={store}>
    <div>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      {!isProduction && <DevTools />}
    </div>
  </Provider>,
  rootEl
);

if (module.hot) {
  // Whenever a new version of App.js is available
  module.hot.accept('./App', () => {
    // Require the new version and render it instead
    const NextApp = require('./App');
    render(
      <Provider store={store}>
        <div>
          <BrowserRouter>
            <NextApp />
          </BrowserRouter>
          {!isProduction && <DevTools />}
        </div>
      </Provider>,
      rootEl
    );
  });
}
