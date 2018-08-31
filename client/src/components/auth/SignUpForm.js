import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
    margin: 12,
};

const SignUpForm = ({ onChange, onSubmit, user, errors }) => (
  <div className="container">
    <form onSubmit={onSubmit}>
      <TextField
        floatingLabelText="Username"
        name="username"
        errorText={errors.username}
        onChange={onChange}
      />
      <br />
      <TextField
        floatingLabelText="Email"
        name="email"
        errorText={errors.email}
        onChange={onChange}
        value={user.email}
      />
      <br />
      <TextField
        type="password"
        floatingLabelText="Password"
        name="password"
        errorText={errors.password}
        onChange={onChange}
        value={user.password}
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

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default SignUpForm;
