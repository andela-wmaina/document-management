import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { Card, CardActions, CardHeader, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
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
    height: 300,
    overflowY: 'auto',
  },
  gridWidth: {
    width: 300,
    marginLeft: 30
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
        primary={true}
        onTouchTap={this.props.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.props.handleClose}
      />,
    ];
    return (
      <ul style={styles.root}>{this.props.docs.map(doc =>
        <GridList
          cellHeight={180}
          style={styles.gridList}
        >
          <Card style={styles.gridWidth} key={doc.id}>
            <CardHeader title={doc.userId} />
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
      </ul>
    );
  }
}

DocumentList.propTypes = {
  docs: PropTypes.array.isRequired,
  handleClose: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired
};

export default DocumentList;
