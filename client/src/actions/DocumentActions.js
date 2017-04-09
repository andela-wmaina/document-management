// src/actions/documentActions.js

import * as types from './ActionTypes';
import DocumentApi from '../api/DocApi';

export function loadDocsSuccess(documents) {
  return { type: types.LOAD_DOC_SUCCESS, documents };
}

export function createDocsSuccess(documents) {
  return { type: types.CREATE_DOC_SUCCESS, documents };
}

export function updateDocsSuccess(documents) {
  return { type: types.UPDATE_DOC_SUCCESS, documents };
}

export function deleteDocsSuccess(documents) {
  return { type: types.DELETE_DOC_SUCCESS, documents };
}

export function searchDocSuccess(documents) {
  return { type: types.SEARCH_DOC_SUCCESS, documents };
}

export function loadDocuments() {
  return function (dispatch) {
    return DocumentApi.getAllDocuments().then(documents => {
      dispatch(loadDocsSuccess(documents));
    }).catch(error => {
      throw (error);
    });
  };
}

export function addDocuments(doc) {
  return function (dispatch) {
    return DocumentApi.addDocument(doc).then(documents => {
      dispatch(createDocsSuccess(documents));
    }).catch(error => {
      throw (error);
    });
  };
}

export function updateDocuments(doc) {
  return function (dispatch) {
    return DocumentApi.updateDocument(doc).then(documents => {
      dispatch(updateDocsSuccess(documents));
    }).catch(error => {
      throw (error);
    });
  };
}

export function deleteDocuments(id) {
  return function (dispatch) {
    return DocumentApi.deleteDocument(id).then(document => {
      dispatch(deleteDocsSuccess(document));
    }).catch(error => {
      throw (error);
    });
  };
}

export function searchDocuments(title) {
  return function (dispatch) {
    return DocumentApi.searchDocument(title).then(document => {
      dispatch(searchDocSuccess(document));
    }).catch(error => {
      throw (error);
    });
  };
}
