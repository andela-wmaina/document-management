import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import App from './components/App';
import DocumentPage from './containers/document/DocumentPage';
import EditDocumentPage from './containers/document/EditDocument';
import HomePage from './components/Home';
import SignUpPage from './containers/auth/SignUpPage';
import LoginPage from './containers/auth/LoginPage';
import User from './containers/user/User';

export default (
  <div>
    <BrowserRouter>
      <Switch>
        <Route path="/" component={App}>
          <Route path="/" component={HomePage} />
          <Route path="/docs" component={DocumentPage} >
            <Route path="/docs/:id" component={EditDocumentPage} />
          </Route>
          <Route path="/signup" component={SignUpPage} />
          <Route path="/signin" component={LoginPage} />
          <Route path="/profile" component={User} />
        </Route>
      </Switch>
    </BrowserRouter>
  </div>
);
