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

    const { params } = this.props;
    socket.emit('join', true);
  }

  componentWillMount() {
    this.props.fetchMessages();
  }

  componentWillUnmount() {
    socket.emit('leave', true);
  }

  renderChatHistory() {
    if (this.props.messages) {
      return (
        <MessageList displayMessages={this.props.messages} />
      );
    }
  }

  render() {
    return (
      <div>
        <div className="panel panel-default">
          <div className="panel-body">
            <h4 className="left">Chat</h4>
            <div className="clearfix" />
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
