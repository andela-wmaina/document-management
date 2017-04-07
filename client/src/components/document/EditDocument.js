import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
const style = {
  margin: 12,
};
class EditDocument extends React.Component {
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
            value={this.props.title}
          />
          <br />
          <TextField
            type="text"
            name="content"
            placeholder="Content"
            onChange={this.props.onChange}
            multiLine={true}
            fullWidth={true}
            value={this.props.content}
          />
          <br />
          <TextField
            type="text"
            name="access"
            label="Access"
            onChange={this.props.onChange}
            fullWidth={true}
            value={this.props.access}
          />
          <br />
          <RaisedButton
            primary={true}
            style={style}
            type="submit"
            label="Update"
            disabled={this.props.saving}
            className="btn btn-primary"
            onClick={this.props.onSave}
          />
        </form>
      </div>
    );
  }
}

EditDocument.propTypes = {
  id: React.PropTypes.number,
  title: React.PropTypes.string,
  content: React.PropTypes.string,
  access: React.PropTypes.string,
  onSave: React.PropTypes.func,
  onChange: React.PropTypes.func
};

export default EditDocument;
