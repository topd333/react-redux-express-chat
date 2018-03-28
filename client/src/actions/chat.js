import { reset } from 'redux-form';
import { browserHistory } from 'react-router';
import { postData } from './index';
import io from 'socket.io-client';
import { CHAT_ERROR, SEND_REPLY } from './types';

// Connect to socket.io server
export const socket = io.connect('http://localhost:3000');

export function sendReply(composedMessage) {
  const data = { composedMessage };
  const url = `/chat`;
  return (dispatch) => {
    postData(SEND_REPLY, CHAT_ERROR, true, url, dispatch, data);

    // Clear form after message is sent
    dispatch(reset('replyMessage'));
    socket.emit('message', data);
  };
}
