// src/components/App.js

import React, { PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { bindActionCreators } from 'redux';
import { Router, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import Header from './common/Header';
import * as AuthActions from '../actions/AuthActions';

injectTapEventPlugin();

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
          browserHistory.push('/');
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
  children: PropTypes.object.isRequired,
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
