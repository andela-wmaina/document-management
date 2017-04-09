import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12,
};

class UpdateUser extends React.Component {
  render() {
    return (
      <div>
        <form>
          <TextField
            type="username"
            name="username"
            defaultValue={this.props.user.username}
            onChange={this.props.onChange}
            fullWidth={true}
          />
          <br />
          <TextField
            type="email"
            name="email"
            defaultValue={this.props.user.email}
            onChange={this.props.onChange}
            multiLine={true}
            fullWidth={true}
          />
          <br />
          <TextField
            type="password"
            name="password"
            placeholder="Change Password"
            onChange={this.props.onChange}
            multiLine={true}
            fullWidth={true}
          />
          <br />
        </form>
      </div>
    );
  }
}

UpdateUser.propTypes = {
  user: React.PropTypes.object,
  onSave: React.PropTypes.func,
  onChange: React.PropTypes.func
};

export default UpdateUser;
