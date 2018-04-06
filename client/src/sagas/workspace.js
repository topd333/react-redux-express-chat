import { put, all, call, takeLatest } from 'redux-saga/effects';
import { reset } from 'redux-form';

import Types from '../actions/s_types';
import { fetchWorkspacesAsync, createWorkspaceAsync } from '../api';

function* fetchWorkspaces(action) {
  try {
    const res = yield call (fetchWorkspacesAsync);
    yield put({ type: Types.FETCH_WORKSPACE_SUCCESS, payload: res.data });
  } catch (err) {
    if(err.response) {
      yield put({ type: Types.FETCH_WORKSPACE_FAILED, payload: err.response.data.error });
    }
    else {
      yield put({ type: Types.FETCH_WORKSPACE_FAILED, payload: "Network failed" });
    }
  }
}

function* createWorkspace(action) {
  try {
    const res = yield createWorkspaceAsync(action.payload);
    yield put({ type: Types.CREATE_WORKSPACE_SUCCESS, payload: res.data });
    yield put(reset('createWorkspace'));
  } catch (err) {
    if(err.response) {
      yield put({ type: Types.CREATE_WORKSPACE_FAILED, payload: err.response.data.error });
    }
    else {
      yield put({ type: Types.CREATE_WORKSPACE_FAILED, payload: "Network failed" });
    }
  }
}

export function* workspace() {
  yield all([
    takeLatest(Types.FETCH_WORKSPACE_REQUEST, fetchWorkspaces),
    takeLatest(Types.CREATE_WORKSPACE_REQUEST, createWorkspace)
  ]);
}
