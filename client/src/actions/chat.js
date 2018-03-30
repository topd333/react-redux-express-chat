import { reset } from 'redux-form';
import { browserHistory } from 'react-router';
import cookie from 'react-cookie';
import io from 'socket.io-client';

import { getData, postData } from './index';
import { FETCH_MESSAGES, CHAT_ERROR, SEND } from './types';

const currentUser = cookie.load('user');
const moment = require('moment');

// Connect to socket.io server
export const socket = io.connect('http://localhost:3000');
//= ===============================
// Messaging actions
//= ===============================
export function fetchMessages() {
  const url = '/chat';
  return dispatch => getData(FETCH_MESSAGES, CHAT_ERROR, true, url, dispatch);
}

export function send(body) {
  const url = `/chat/send`;
  return (dispatch) => {
    postData(SEND, CHAT_ERROR, true, url, dispatch, body);
    // Clear form after message is sent
    dispatch(reset('sendMessage'));
    // Send broadcast
    const message = {
      _id: makeid(),
      body: body.message,
      author: {
        _id: currentUser._id,
        username: currentUser.username
      },
      createdAt: moment()
    }
    socket.emit('message', message);
  };
}

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 15; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
