import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import DocumentPage from './containers/document/DocumentPage';
import EditDocumentPage from './containers/document/EditDocument';
import HomePage from './components/Home';
import SignUpPage from './containers/auth/SignUpPage';
import LoginPage from './containers/auth/LoginPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/docs" component={DocumentPage} >
      <Route path="/docs/:id" component={EditDocumentPage} />
    </Route>
    <Route path="/signup" component={SignUpPage} />
    <Route path="/signin" component={LoginPage} />
  </Route>
);
