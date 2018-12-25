import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';

import { Card, CardActions, CardHeader, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import { GridList } from 'material-ui/GridList';
import * as docActions from '../../actions/DocumentActions';
import EditDocumentPage from '../../containers/document/EditDocument';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginRight: 100
  },
  gridList: {
    width: 300,
    height: 300
  },
  gridWidth: {
    width: 300,
    marginLeft: 30
  },
  spinner: {
    textAlign: 'center',
    marginTop: '5%'
  }
};

class DocumentList extends React.Component {
  render() {
    return (
      <div>
        {this._renderItems()}
        <Route path='docs/:id' component={EditDocumentPage}/>
      </div>
    );
  }

  _renderItems = () => {
    return this.props.isFetching ?
      <div style={styles.spinner}>
        <CircularProgress />
      </div> :
      <ul style={styles.root}>
        {this._getItems()}
      </ul>;
  }

  _getItems = () => {
    return !this.props.docs.length ?
      'No Documents' :
      this.props.docs.map(doc =>
        <GridList
          cellHeight={180}
          style={styles.gridList}
          key={doc.id}>
          <Card style={styles.gridWidth}>
            <CardTitle title={doc.title} style={{ textAlign: 'center' }} />
            <CardText>
              {doc.content}
            </CardText>
            <CardActions>
              <div>
                <Link to={`docs/${doc.id}`}>
                  EDIT
                </Link>
                <FlatButton label="DELETE" onClick={() => this._handleDelete(doc.id)} />
              </div>
            </CardActions>
          </Card>
        </GridList>
      );
  }

  _handleDelete = (id) => {
    this.props.actions.deleteDocuments(id);
  }
}

DocumentList.defaultProps = {
  docs: [],
};

DocumentList.propTypes = {
  actions: PropTypes.object.isRequired,
  docs: PropTypes.array.isRequired,
  handleClose: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
};

export default DocumentList;
