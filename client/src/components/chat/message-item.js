import React, { Component } from 'react';
import cookie from 'react-cookie';

const currentUser = cookie.load('user');

class MessageItem extends Component {
  render() {
    return (
      <li className={currentUser._id == this.props.author._id ? 'self' : 'other'}>
        <span className="username">{ this.props.author.username }</span>
        <div className="msg">
          <p>
            {this.props.message.split('\n').map(function(item, key) {
              return (
                <span key={key}>
                  {item}
                  <br/>
                </span>
              )
            })}
          </p>
          <time>{this.props.timestamp}</time>
        </div>
      </li>
    );
  }
}

export default MessageItem;
