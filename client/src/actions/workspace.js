import axios from 'axios';
import { browserHistory } from 'react-router';
import cookie from 'react-cookie';
import { API_URL, CLIENT_ROOT_URL, errorHandler } from './index';
import { FETCH_WORKSPACES, CREATE_WORKSPACE, ERROR_RESPONSE } from './types';

//= ===============================
// Workspace actions
//= ===============================
export function createWorkspace({ full_name, name, email, password }) {
  return true;
}
