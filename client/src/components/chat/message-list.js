import React, { Component } from 'react';
const moment = require('moment');

import MessageItem from './message-item';

class MessageList extends Component {
  render() {
    return (
      <ol className="chat">
        {this.props.messages.map(function(data) {
          if(data.author) {
            return <MessageItem
              key={data._id}
              message={data.body}
              author={data.author}
              timestamp={moment(data.createdAt).format('lll')}
            />
          }
        })}
      </ol>
    );
  }
}

export default MessageList;
