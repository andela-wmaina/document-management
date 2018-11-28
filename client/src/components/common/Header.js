// src/components/common/Header.js

import React from 'react';
import PropTypes from 'prop-types';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Auth from '../../modules/Auth';
import '../../static/stylesheets/landing_page.scss';

const Header = ({ onLogout }) => {
  return (
    <AppBar
      title="Doc Manage"
      iconClassNameRight="muidocs-icon-navigation-expand-more"
      showMenuIconButton={false}>
      <Toolbar>
        <Button color="inherit" href="/signup">Sign Up</Button>
        <Button color="inherit" href="/signin">Sign In</Button>
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  onLogout: PropTypes.func.isRequired
};

export default Header;
