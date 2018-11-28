// src/components/App.js

import React from 'react';
import PropTypes from 'prop-types';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from './common/Header';
import * as AuthActions from '../actions/AuthActions';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
    this.logoutUser = this.logoutUser.bind(this);
  }

  logoutUser(event) {
    event.preventDefault();
    this.props.actions.logoutUser(this.state.user)
      .then((res) => {
        if (res.message) {
          localStorage.removeItem('token');
          this.props.history.push('/');
        }
        // Add functionality for error handling messages
        console.log(res.message);
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="container-fluid">
          <Header
            onLogout={this.logoutUser}
          />
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  children: PropTypes.object,
  actions: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  if (state.users.length > 0) {
    return {
      user: state.users
    };
  }
  return {
    user: {}
  };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AuthActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
