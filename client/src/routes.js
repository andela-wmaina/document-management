import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import DocsPage from './components/documents/DocumentsPage';
import DocPage from './components/documents/DocumentPage';
import NewDocumentPage from './components/documents/newDocumentPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={DocsPage} />
    <Route path="/docs" component={DocsPage} >
      <Route path="/docs/new" component={NewDocumentPage} />
      <Route path="/docs/:id" component={DocPage} />
    </Route>
  </Route>
);
