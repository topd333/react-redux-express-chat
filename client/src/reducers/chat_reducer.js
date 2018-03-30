import { FETCH_MESSAGES, SEND, CHAT_ERROR } from '../actions/types';

const INITIAL_STATE = { message: '', messages: [], error: '' };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  	case FETCH_MESSAGES:
      return { ...state, messages: action.payload.messages };
    case SEND:
      return { ...state, message: action.payload.message };
    case CHAT_ERROR:
      return { ...state, error: action.payload };
  }

  return state;
}
