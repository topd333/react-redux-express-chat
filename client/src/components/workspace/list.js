import React, { Component } from 'react';
const moment = require('moment');

import WorkspaceItem from './item';

class WorkspaceList extends Component {
  render() {
    return (
      <div>
        <h3>List</h3>
        <ul className="workspace-list">
          {this.props.workspaces.map(function(data) {
            return <WorkspaceItem
              key={data._id}
              name={data.name}
              id={data._id}
            />
          })}
        </ul>
      </div>
    );
  }
}

export default WorkspaceList;
