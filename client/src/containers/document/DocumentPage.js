import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dialog from 'material-ui/Dialog';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FlatButton from 'material-ui/FlatButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import DocumentList from '../../components/document/DocumentList';
import AddDocument from '../../components/document/AddDocument';

import * as docActions from '../../actions/DocumentActions';

const style = {
  marginRight: 20,
};

class DocumentPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      doc: {
        title: '',
        content: '',
        access: ''
      },
      isEditing: false
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.saveDoc = this.saveDoc.bind(this);
    this.updateDocState = this.updateDocState.bind(this);
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

  saveDoc(event) {
    this.props.actions.addDocuments(this.state.doc);
    this.props.actions.loadDocuments();
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
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={() => {
          this.saveDoc();
          this.handleClose();
        }}
      />,
    ];
    return (
      <div>
        <div style={{ marginTop: 10, marginLeft: 1380 }}>
          <div>
            <FloatingActionButton mini={true} style={style} onTouchTap={this.handleOpen}>
              <ContentAdd />
            </FloatingActionButton>
            <Dialog
              title="Dialog With Actions"
              actions={actions}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
            >
              <AddDocument
                doc={this.state.doc}
                onSave={this.saveDoc}
                onChange={this.updateDocState}
              />
            </Dialog>
          </div>
        </div>
        <div className="col-md-12" style={{ height: 0 }}>
          <div className="col-md-3" style={{ display: 'inline', height: 0 }}>
            <DocumentList
              docs={this.props.docs}
              isEditing={this.isEditing}
              handleOpen={this.handleOpen}
              handleClose={this.handleClose}
              open={this.state.open}
              onUpdate={this.onUpdate}
              onChange={this.updateDocState}
            />
          </div>
          <div
            className="col-md-8"
            style={{ marginLeft: 380, marginRight: 40, marginTop: 0, height: 0 }}
          >
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

DocumentPage.propTypes = {
  docs: PropTypes.array.isRequired,
  children: PropTypes.object,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  if (state.docs.length > 0) {
    return {
      docs: state.docs
    };
  }
  return {
    docs: [{ title: '', content: '', access: '' }]
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(docActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentPage);
