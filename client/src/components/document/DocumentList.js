import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { Card, CardActions, CardHeader, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import { GridList } from 'material-ui/GridList';
import * as docActions from '../../actions/DocumentActions';

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
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(id) {
    this.props.actions.deleteDocuments(id);
    this.props.actions.loadDocuments();
    this.setState({ open: false });
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.props.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary
        keyboardFocused
        onTouchTap={this.props.handleClose}
      />,
    ];
    console.log('doc list', this.props.docs);
    return (
      this.props.docs.length ?
        (<ul style={styles.root}>{this.props.docs.map(doc =>
          <GridList
            cellHeight={180}
            style={styles.gridList}
            key={doc.id}
          >
            <Card style={styles.gridWidth}>
              <CardHeader title={doc.owner} />
              <CardTitle title={doc.title} style={{ textAlign: 'center' }} />
              <CardText>
                {doc.content}
              </CardText>
              <CardActions>
                <div>
                  <FlatButton href={`/docs/${doc.id}`} label="EDIT" />
                  <FlatButton label="DELETE" onTouchTap={() => this.handleDelete(doc.id)} />
                </div>
              </CardActions>
            </Card>
          </GridList>
        )}
        </ul>) : (
          <div style={styles.spinner} >
            <CircularProgress />
          </div>
        )
    );
  }
}

DocumentList.defaultProps = {
  docs: []
};

DocumentList.propTypes = {
  docs: PropTypes.array.isRequired,
  handleClose: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired
};

export default DocumentList;
