import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
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

    this.submitUser = this.submitUser.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;
    this.setState({
      user
    });
  }

  submitUser(event) {
    event.preventDefault();
    this.props.actions.loginUser(this.state.user)
      .then((res) => {
        if (res.message) {
          console.log(res.message);
          localStorage.setItem('token', res.token);
          browserHistory.push('/');
        }
        // Add functionality for error handling messages
        console.log(res);
      })
      .catch((error) => {
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
    user: [{ username: '', password: '' }]
  };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AuthActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
