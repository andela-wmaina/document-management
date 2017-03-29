import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function docsReducer(state = initialState.docs, action) {
  switch (action.type) {
    case types.LOAD_DOC_SUCCESS:
      return action.documents;
    case types.CREATE_DOC_SUCCESS:
      return [
        ...state.filter(doc => doc.id !== action.documents.id),
        Object.assign({}, action.documents)
      ];
    case types.UPDATE_DOC_SUCCESS:
      return [
        ...state.filter(doc => doc.id !== action.documents.id),
        Object.assign({}, action.documents)
      ];
    default:
      return state;
  }
}
