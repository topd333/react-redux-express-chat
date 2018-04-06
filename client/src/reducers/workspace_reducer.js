import Types from '../actions/s_types';

const INITIAL_STATE = { workspaces: {}, workspace: '', error: '', success: '' };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.FETCH_WORKSPACE_SUCCESS:
      return { ...state, workspaces: action.payload.workspaces, error: '' };
    case Types.FETCH_WORKSPACE_FAILED:
      return { ...state, error: action.payload };
    case Types.CREATE_WORKSPACE_SUCCESS:
      return { ...state, workspace: action.payload.workspace, success: 'Success', error: '' };
    case Types.CREATE_WORKSPACE_FAILED:
      return { ...state, error: action.payload };
  }

  return state;
}
