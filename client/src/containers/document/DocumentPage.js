import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Dialog from 'material-ui/Dialog';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FlatButton from 'material-ui/FlatButton';
import AutoComplete from 'material-ui/AutoComplete';
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
      search: ''
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.saveDoc = this.saveDoc.bind(this);
    this.updateDocState = this.updateDocState.bind(this);
    this.handleNewRequest = this.handleNewRequest.bind(this);
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
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

  handleSearch(event) {
    this.props.actions.searchDocuments(this.state.search);
  }

  handleUpdateInput(event) {
    this.setState({
      search: event
    });
  }

  handleNewRequest() {
    this.setState({
      search: '',
    });
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary
        keyboardFocused
        onClick={() => {
          this.saveDoc();
          this.handleClose();
        }}
      />,
    ];
    return (
      <div>
        <div style={{ marginTop: 10, marginLeft: 1380 }}>
          <div>
            <FloatingActionButton mini style={style} onClick={this.handleOpen}>
              <ContentAdd />
            </FloatingActionButton>
            <Dialog
              title="Add document"
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
        <div>
          <AutoComplete
            hintText="Search Documents"
            searchText={this.state.search}
            onUpdateInput={this.handleUpdateInput}
            onNewRequest={this.handleNewRequest}
            dataSource={this.props.docs}
            openOnFocus
          />
          <FlatButton
            label="Search"
            onClick={this.handleSearch}
          />
        </div>
        <div className="col-md-12" style={{ height: 0 }}>
          <div className="col-md-3" style={{ display: 'inline', height: 0 }}>
            <DocumentList
              docs={this.props.docs}
              handleOpen={this.handleOpen}
              handleClose={this.handleClose}
              open={this.state.open}
              onUpdate={this.onUpdate}
              onChange={this.updateDocState}
              actions={this.props.actions}
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
    docs: []
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(docActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentPage);
