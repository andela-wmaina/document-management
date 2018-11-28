import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import LoginForm from '../../components/auth/LoginForm';
import * as AuthActions from '../../actions/AuthActions';
import Header from '../../components/common/Header';

const style = {
  marginRight: 20,
};

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {
        email: '',
        username: '',
        password: ''
      },
      user: {
        username: '',
        password: ''
      }
    };
  }

  changeUser = (event) => {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;
    this.setState({
      user
    });
  }

  submitUser = (event) => {
    event.preventDefault();
    console.log(this.props, 'this.props.history')
    this.props.actions.loginUser(this.state.user)
      .then(res => {
        if (res.message) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('userDetails', res.user.id);
          this.props.router.push('/docs');
        }
      })
      .catch(error => {
        console.log('error', error);
      });
  }

  render() {
    return (
      <div style={{ marginLeft: 550, marginTop: 70 }}>
        <LoginForm
          onSubmit={this.submitUser}
          onChange={this.changeUser}
          errors={this.state.errors}
          user={this.state.user}
        />
      </div>
    );
  }
}

LoginPage.propTypes = {
  actions: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  if (state.users.length > 0) {
    return {
      user: state.users
    };
  }
  return {
    user: []
  };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AuthActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
