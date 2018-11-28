import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

import * as courseActions from '../../actions/DocumentActions';
import DocumentList from '../../components/document/DocumentList';
import EditDocument from '../../components/document/EditDocument';

class EditDocumentPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      doc: {
        id: props.doc.id,
        title: props.doc.title,
        content: props.doc.content,
        access: props.doc.access
      }
    };
    this.state.open = true;
    this.saveDoc = this.saveDoc.bind(this);
    this.updateDocState = this.updateDocState.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  updateDocState(event) {
    const field = event.target.name;
    const document = this.state.doc;
    document[field] = event.target.value;
    return this.setState({ doc: document });
  }

  saveDoc(event) {
    event.preventDefault();
    this.props.actions.updateDocuments(this.state.doc);
    this.props.actions.loadDocuments();
    this.setState({ open: false });
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  updateDocState(event) {
    const field = event.target.name;
    const document = this.state.doc;
    document[field] = event.target.value;
    return this.setState({ doc: document });
  }

  isEditing(event) {
    console.log('yeah');
  }

  onUpdate(event) {
    console.log('Yeah Twice');
  }

  render() {
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
        onClick={this.handleClose}
      />,
    ];

    const {
        doc
    } = this.props;

    return (
      <Dialog
        title="Edit Document"
        actions={actions}
        modal={false}
        open={this.state.open}
        onRequestClose={this.handleClose}
      >
        <div>
          <EditDocument
            id={doc.id}
            title={doc.title}
            content={doc.content}
            access={doc.access}
            onSave={this.saveDoc}
            onChange={this.updateDocState}
          />
        </div>
      </Dialog>
    );
  }
}

EditDocumentPage.propTypes = {
  actions: PropTypes.object.isRequired,
  doc: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  const doc = [];
  const allDocs = state.docs;
  allDocs.map((myDoc) => {
    const id = Number(ownProps.params.id);
    if (myDoc.id === id) {
      doc.push(myDoc);
    }
    return false;
  });
  return { doc: doc[0] };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditDocumentPage);
