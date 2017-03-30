import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import DocsList from './docsList';

const style = {
  marginRight: 20,
};

class DocPage extends React.Component {
  render() {
    return (
      <div className="col-md-12">
        <h1>Documents</h1>
        <div className="col-md-4">
          <DocsList docs={this.props.docs} />
        </div>
        <h3>
          <Link to={'/docs/new'} className="btn btn-primary">
            <FloatingActionButton mini={true} style={style}>
              <ContentAdd />
            </FloatingActionButton>
          </Link>
        </h3>
        <div className="col-md-8">
          {this.props.children}
        </div>
      </div>
    );
  }
}

DocPage.propTypes = {
  docs: PropTypes.array.isRequired,
  children: PropTypes.object
};

function mapStateToProps(state) {
  return {
    docs: state.docs
  };
}

export default connect(mapStateToProps)(DocPage);
