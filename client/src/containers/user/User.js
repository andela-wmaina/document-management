import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import User from '../../components/user/User';
import * as UserActions from '../../actions/UserActions';
import Header from '../../components/common/Header';
import Auth from '../../modules/Auth';

const style = {
  marginRight: 20,
};

class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      user: {
        username: this.props.user.username,
        email: this.props.user.email,
        password: this.props.user.password
      }
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.updateUserState = this.updateUserState.bind(this);
  }

  componentWillMount() {
    const userId = localStorage.getItem('userDetails');
    this.props.actions.fetchUser(userId)
    .then(user => console.log(user))
    .catch(error => console.log(error));
  }

  updateUserState(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;
    return this.setState({ user });
  }

  saveUser() {
    console.log(this.state.user);
    this.props.actions.updateUser(this.state.user, this.props.user.id);
    this.setState({ open: false });
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    const {
        user
    } = this.props;

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={() => {
          this.saveUser();
          this.handleClose();
        }}
      />,
    ];
    return (
      <div>
        <div style={{ marginTop: 40, marginLeft: 20, height: 0 }}>
          <img src="http://www.simin.cl/wp-content/uploads/2015/02/Sin-Fotograf%C3%ADa.gif" alt="" />
        </div>
        <div style={{ marginTop: 100, marginLeft: 400 }}>
          <h3><b> Username </b></h3> { user.username }
          <br />
          <h3><b> Email </b></h3> { user.email }
          <div style={{ marginTop: 50 }}>
            <FlatButton onClick={this.handleOpen}>
              EDIT
            </FlatButton>
            <Dialog
              title="Edit Profile"
              actions={actions}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
            >
              <User
                user={user}
                onSave={this.saveUser}
                onChange={this.updateUserState}
              />
            </Dialog>
          </div>
        </div>
      </div>
    );
  }
}

UserPage.propTypes = {
  actions: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return { user: state.users };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(UserActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
