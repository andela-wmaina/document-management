// src/actions/documentActions.js

import * as types from './actionTypes';
import documentApi from '../api/docApi';

export function loadDocuments() {
  return function (dispatch) {
    return documentApi.getAllDocuments().then(documents => {
      dispatch(loadDocsSuccess(documents));
    }).catch(error => {
      throw (error);
    });
  };
}

export function loadDocsSuccess(documents) {
  return { type: types.LOAD_DOC_SUCCESS, documents };
}

export function addDocuments(doc) {
  return function (dispatch) {
    return documentApi.addDocument(doc).then(documents => {
      dispatch(createDocsSuccess(documents));
    }).catch(error => {
      throw (error);
    });
  };
}

export function createDocsSuccess(documents) {
  return { type: types.CREATE_DOC_SUCCESS, documents };
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

export function updateDocsSuccess(documents) {
  return { type: types.UPDATE_DOC_SUCCESS, documents };
}
