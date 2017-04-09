// src/components/common/Header.js

import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Auth from '../../modules/Auth';

const Header = ({ onLogout }) => {
  return (
    <AppBar
      title="Doc Manage"
      iconClassNameRight="muidocs-icon-navigation-expand-more"
      showMenuIconButton={false}
    >
      <nav>
        <div className="top-bar" style={{ height: 0, paddingTop: 10, fontSize: 16, display: 'flex' }}>
          <div style={{ marginRight: 1100, display: 'flex' }}>
            <FlatButton href="/" > DocMg </FlatButton>
            {Auth.checkAuthentication() ? (
              <div style={{ display: 'flex' }}>
                <FlatButton href="/docs">Document</FlatButton>
                <FlatButton href="/profile">Profile</FlatButton>
              </div>
            ) : (null)}
            {Auth.checkAuthentication() ? (
              <div style={{ marginLeft: 980, display: 'flex' }}>
                <FlatButton onTouchTap={onLogout}>Sign Out</FlatButton>
              </div>
            ) : (
              <div style={{ marginLeft: 980, display: 'flex' }}>
                <FlatButton href="/signup">Sign Up</FlatButton>
                <FlatButton href="/signin">Sign In</FlatButton>
              </div>
            )}
          </div>
        </div>
      </nav>
    </AppBar >
  );
};

Header.propTypes = {
  onLogout: PropTypes.func.isRequired
};

export default Header;
