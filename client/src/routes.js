import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import App from './components/App';
import DocumentPage from './containers/document/DocumentPage';
import SignUpPage from './containers/auth/SignUpPage';
import LoginPage from './containers/auth/LoginPage';
import User from './containers/user/User';
import Header from './components/common/Header';

const routes = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Header />
          <Route path="/" exact component={App} />
          <Route path="/docs" exact component={DocumentPage} />
          <Route path="/signup" exact component={SignUpPage} />
          <Route path="/signin" exact component={LoginPage} />
          <Route path="/profile" exact component={User} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default (routes);
