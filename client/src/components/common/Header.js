// src/components/common/Header.js

import React from 'react';
import { Link, IndexLink } from 'react-router';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

const Header = () => {
  return (
    <AppBar
      title="Doc Manage"
      iconClassNameRight="muidocs-icon-navigation-expand-more"
      showMenuIconButton={false}
    >
      <nav>
        <div className="top-bar" style={{ height: 0, paddingTop: 10, fontSize: 16, display: 'flex' }}>
          <div style={{ marginRight: 1200, display: 'flex' }}>
            <FlatButton href="/" > DocMg </FlatButton>
            <FlatButton href="/docs"> Document </FlatButton>
          </div>
        </div>
      </nav>
    </AppBar >
  );
};

export default Header;
