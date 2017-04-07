import * as types from '../actions/ActionTypes';
import InitialState from './InitialState';

export default function DocumentReducer(state = InitialState.docs, action) {
  switch (action.type) {
    case types.LOAD_DOC_SUCCESS:
      return action.documents;
    case types.CREATE_DOC_SUCCESS:
      return Object.assign({}, action.documents);
    case types.UPDATE_DOC_SUCCESS:
      return Object.assign({}, action.documents);
    default:
      return state;
  }
}
