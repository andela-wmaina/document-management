import React from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';


const style = {
  margin: 12,
};
class AddDocument extends React.Component {
  state = {
    access: false,
  };

  render() {
    return (
      <div>
        <form>
          <TextField
            type="text"
            name="title"
            placeholder="Title"
            onChange={this.props.onChange}
            fullWidth={true}
          />
          <br />
          <TextField
            type="text"
            name="content"
            placeholder="Content"
            onChange={this.props.onChange}
            multiLine={true}
            fullWidth={true}
          />
          <FormControlLabel
            control={
              <Switch
                checked={this.state.access}
                onChange={(e) => {
                  this.setState({access: !this.state.access});
                  this.props.onChange(e);
                }}
                name="access"
                value={this.state.access}
              />
            }
            label="Public"
          />
        </form>
      </div>
    );
  }
}

AddDocument.propTypes = {
  doc: PropTypes.object,
  onSave: PropTypes.func,
  onChange: PropTypes.func
};

export default AddDocument;
