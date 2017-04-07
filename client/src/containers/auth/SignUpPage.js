import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Router, browserHistory } from 'react-router';
import SignUpForm from '../../components/auth/SignUpForm';
import * as AuthActions from '../../actions/AuthActions';

const style = {
  marginLeft: 550,
  marginTop: 70,
  border: 2
};

class SignUpPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {
        email: '',
        username: '',
        password: ''
      },
      user: {
        email: '',
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
    this.props.actions.registerUser(this.state.user)
      .then((res) => {
        if (res.message) {
          browserHistory.push('/docs');
          localStorage.setItem('token', res.token);
        }
        // Add functionality for error handling messages
        console.log(res)
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  render() {
    return (
      <div style={style}>
        <SignUpForm
          onSubmit={this.submitUser}
          onChange={this.changeUser}
          errors={this.state.errors}
          user={this.state.user}
        />
      </div>
    );
  }
}

SignUpPage.propTypes = {
  actions: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  if (state.users.length > 0) {
    return {
      user: state.users
    };
  }
  return {
    user: [{ username: '', email: '', password: '' }]
  };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AuthActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
