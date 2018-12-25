import * as types from '../actions/ActionTypes';
import InitialState from './InitialState';

export default function DocumentReducer(state = InitialState.docs, action) {
  switch (action.type) {
    case types.REQUEST_DOC_SUCCESS:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case types.LOAD_DOC_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.documents,
      });
    case types.CREATE_DOC_SUCCESS:
      return Object.assign({}, {
        items: [...state.items, action.documents.document]
      });
    case types.UPDATE_DOC_SUCCESS:
      return Object.assign({}, {
        items: action.documents
      });
    case types.DELETE_DOC_SUCCESS:
      return Object.assign({}, state, {
        items: state.items.filter(document => document.id !== action.documents)
      });
    case types.SEARCH_DOC_SUCCESS:
      return Object.assign({}, state, {
        items: action.documents
      });
    default:
      return state;
  }
}
