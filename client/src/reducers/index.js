import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth_reducer';
import userReducer from './user_reducer';
import chatReducer from './chat_reducer';
import workspaceReducer from './workspace_reducer';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  user: userReducer,
  chat: chatReducer,
  workspace: workspaceReducer
});

export default rootReducer;
