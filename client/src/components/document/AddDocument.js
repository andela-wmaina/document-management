import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
const style = {
  margin: 12,
};
class AddDocument extends React.Component {
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
          <br />
          <TextField
            type="text"
            name="access"
            label="Access"
            onChange={this.props.onChange}
            fullWidth={true}
          />
          <br />
          <RaisedButton
            primary={true}
            style={style}
            type="submit"
            label="Submit"
            disabled={this.props.saving}
            className="btn btn-primary"
            onClick={this.props.onSave}
          />
        </form>
      </div>
    );
  }
}

AddDocument.propTypes = {
  doc: React.PropTypes.object,
  onSave: React.PropTypes.func,
  onChange: React.PropTypes.func
};

export default AddDocument;
