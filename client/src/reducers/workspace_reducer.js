import { FETCH_WORKSPACES, CREATE_WORKSPACE, ERROR_RESPONSE } from '../actions/types';

const INITIAL_STATE = { workspaces: {}, message: '', error: '' };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_WORKSPACES:
      return { ...state, workspaces: action.payload.workspaces };
    case CREATE_WORKSPACE:
      return { ...state, message: action.payload };
    case ERROR_RESPONSE:
      return { ...state, error: action.payload };
  }

  return state;
}
