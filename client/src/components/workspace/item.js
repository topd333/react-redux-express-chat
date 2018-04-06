import React, { Component } from 'react';
import cookie from 'react-cookie';
import { Link } from 'react-router';

import { CLIENT_ROOT_URL } from './../../actions/index';

class WorkspaceItem extends Component {
  render() {
    return (
      <li>
        <span className="name">{ this.props.name }</span>
        <Link to={ CLIENT_ROOT_URL + '/workspace/' + this.props.id }>{ CLIENT_ROOT_URL + '/' + this.props.id }</Link>
      </li>
    );
  }
}

export default WorkspaceItem;
