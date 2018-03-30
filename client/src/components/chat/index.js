import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import * as actions from '../../actions/chat';
import { fetchMessages } from '../../actions/chat';
import MessageList from './message-list';
import SendMessage from './send-message';

const socket = actions.socket;

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    };

    socket.emit('join', true);

    socket.on('thread', function(data) {
      addMessage(data);
    });

    const addMessage = data => {
      this.setState({messages: [...this.state.messages, data]});
    };
  }

  componentWillMount() {
    this.props.fetchMessages();
  }

  componentWillReceiveProps(nextProps){
    this.setState({'messages': nextProps.messages});
  }

  componentWillUnmount() {
    socket.emit('leave', true);
  }

  renderChatHistory() {
    if(this.state.messages) {
      return (
        <MessageList messages={this.state.messages} />
      );
    }
  }

  render() {
    return (
      <div>
        <div className="panel panel-default">
          <div className="panel-body chat-body">
            { this.renderChatHistory() }
          </div>
        </div>
        <SendMessage />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    messages: state.chat.messages,
  };
}

export default connect(mapStateToProps, actions)(Chat);
