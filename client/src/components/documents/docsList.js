import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const DocsList = ({ docs }) => {
  return (
    <ul>{docs.map(doc =>
      <li key={doc.id}>
        <h4>
          <Link to={`/docs/${doc.id}`} className="btn btn-primary">
            {doc.title}
          </Link>
        </h4>
      </li>)}
    </ul>);
};

DocsList.propTypes = {
  docs: PropTypes.array.isRequired
};

export default DocsList;
