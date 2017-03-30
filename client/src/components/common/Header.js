// src/components/common/Header.js

import React from 'react';
import { Link, IndexLink } from 'react-router';
import AppBar from 'material-ui/AppBar';

const Header = () => {
  return (
    <AppBar
      title="Doc Manage"
      iconClassNameRight="muidocs-icon-navigation-expand-more"
      showMenuIconButton={false}
    >
      <nav>
        <IndexLink
          to="/"
          activeClassName="active"
        >
          Home
        </IndexLink>
        {' | '}
        <Link to="docs" activeClassName="active">Docs</Link>
      </nav>
    </AppBar >
  );
};

export default Header;
