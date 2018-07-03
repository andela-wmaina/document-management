import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import ConfigureStore from './store/ConfigureStore';
import routes from './routes';
import { loadDocuments } from './actions/DocumentActions';

const store = ConfigureStore();

store.dispatch(loadDocuments());

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
);
