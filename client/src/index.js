import 'babel-polyfill';

import React from 'react';
import { Router } from 'react-router';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';

import ConfigureStore from './store/ConfigureStore';
import Routes from './routes';
import { loadDocuments } from './actions/DocumentActions';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const history = createBrowserHistory();

const store = ConfigureStore();

store.dispatch(loadDocuments)

render(
  <Provider store={store}>
    <MuiThemeProvider>
      <Routes />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('app')
);
