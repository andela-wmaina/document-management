import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12,
};

const LoginForm = ({ onChange, onSubmit, user, errors }) => (
  <div className="container">
    <form onSubmit={onSubmit}>
      <TextField
        type="text"
        floatingLabelText="Username"
        name="username"
        errorText={errors.username}
        onChange={onChange}
      />
      <br />
      <TextField
        floatingLabelText="Password"
        name="password"
        errorText={errors.password}
        onChange={onChange}
      />
      <br />
      <RaisedButton
        primary={true}
        style={style}
        type="submit"
        label="Submit"
        className="btn btn-primary"
        onClick={onSubmit}
      />
    </form>
  </div>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default LoginForm;
