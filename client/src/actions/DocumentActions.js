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
    return documentApi.updateDocument(doc).then(documents => {
      dispatch(updateDocsSuccess(documents));
    }).catch(error => {
      throw (error);
    });
  };
}

