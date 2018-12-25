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
      item: {
        title: '',
        content: '',
        access: ''
      },
      search: ''
    };
  }

  componentWillMount() {
    this.props.actions.loadDocuments();
  }

  handleOpen = () =>  {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  updateDocState = (event) => {
    const field = event.target.name;
    const document = this.state.item;
    document[field] = event.target.value;
    return this.setState({ item: document });
  }

  saveDoc = (event) => {
    this.props.actions.addDocuments(this.state.item);
  }

  handleSearch = (event) => {
    this.props.actions.searchDocuments(this.state.search);
  }

  handleUpdateInput = (event) => {
    this.setState({search: event});
  }

  handleNewRequest = () => {
    this.setState({search: ''});
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
              onRequestClose={this.handleClose}>
              <AddDocument
                doc={this.state.item}
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
            dataSource={this.props.items}
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
              actions={this.props.actions}
              docs={this.props.items}
              handleClose={this.handleClose}
              handleOpen={this.handleOpen}
              isFetching={this.props.isFetching}
              onChange={this.updateDocState}
              onUpdate={this.onUpdate}
              open={this.state.open}
            />
          </div>
          <div
            className="col-md-8"
            style={{ marginLeft: 380, marginRight: 40, marginTop: 0, height: 0 }}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

DocumentPage.propTypes = {
  actions: PropTypes.object.isRequired,
  children: PropTypes.object,
  isFetching: PropTypes.bool,
  items: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    items: state.docs.items || [],
    isFetching: state.docs.isFetching,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(docActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentPage);
