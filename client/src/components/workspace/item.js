import React, { Component } from 'react';
import cookie from 'react-cookie';
import { Link } from 'react-router';

class WorkspaceItem extends Component {
  render() {
    return (
      <li>
        <span className="name">{ this.props.name }</span>
        <Link to={ this.props.link }>{ this.props.link }</Link>
      </li>
    );
  }
}

export default WorkspaceItem;
