import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardActions, CardHeader, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { GridList } from 'material-ui/GridList';

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

const DocumentList = ({ docs, isEditing, handleOpen, handleClose, open, onUpdate, onChange }) => {
  const actions = [
    <FlatButton
      label="Cancel"
      primary={true}
      onTouchTap={handleClose}
    />,
    <FlatButton
      label="Submit"
      primary={true}
      keyboardFocused={true}
      onTouchTap={handleClose}
    />,
  ];
  return (
    <ul style={styles.root}>{docs.map(doc =>
      <GridList
        cellHeight={180}
        style={styles.gridList}
      >
        <Card style={styles.gridWidth} key={doc.id}>
          <CardHeader title="user id" />
          <CardTitle title={doc.title} style={{ textAlign: 'center' }} />
          <CardText>
            {doc.content}
          </CardText>
          <CardActions>
            <div>
              <Link to={`/docs/${doc.id}`}> EDIT </Link>
            </div>
          </CardActions>
        </Card>
      </GridList>
    )}
    </ul>
  );
};

DocumentList.propTypes = {
  docs: PropTypes.array.isRequired,
  isEditing: PropTypes.func.isRequired,
  handleOpen: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

export default DocumentList;
