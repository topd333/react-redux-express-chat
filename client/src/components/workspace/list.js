import React, { Component } from 'react';
const moment = require('moment');

import WorkspaceItem from './item';

class WorkspaceList extends Component {
  render() {
    return (
      <div>
        <h3>List</h3>
        <ol>
          {this.props.workspaces.map(function(data) {
            if(data.author) {
              return <WorkspaceItem
                key={data._id}
                name={data.name}
                link={data.link}
              />
            }
          })}
        </ol>
      </div>
    );
  }
}

export default WorkspaceList;
