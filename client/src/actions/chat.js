import { reset } from 'redux-form';
import { browserHistory } from 'react-router';
import { getData, postData } from './index';
import io from 'socket.io-client';
import { FETCH_MESSAGES, CHAT_ERROR, SEND } from './types';

// Connect to socket.io server
export const socket = io.connect('http://localhost:3000');
//= ===============================
// Messaging actions
//= ===============================
export function fetchMessages() {
  const url = '/chat';
  return dispatch => getData(FETCH_MESSAGES, CHAT_ERROR, true, url, dispatch);
}

export function send(composedMessage) {
  const data = { composedMessage };
  const url = `/chat/send`;
  return (dispatch) => {
    postData(SEND, CHAT_ERROR, true, url, dispatch, data);

    // Clear form after message is sent
    dispatch(reset('sendMessage'));
    socket.emit('message', data);
  };
}
