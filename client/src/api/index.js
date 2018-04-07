import axios from 'axios';

import { API_URL } from '../actions';

export const fetchWorkspacesAsync = () =>
  axios.get(API_URL + '/workspace');

export const createWorkspaceAsync = (data) =>
  axios.post(API_URL + '/workspace/create', data);

export const getWorkspaceAsync = (data) =>
  axios.post(API_URL + '/workspace/get', data);