import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import GetWorkspace from './get';
import CreateWorkspace from './create';
import WorkspaceList from './list';
import Types from '../../actions/s_types';

class Workspace extends Component {

  constructor(props) {
    super(props);

    super(props);

    this.state = {
      workspaces: []
    };
  }

  componentWillMount() {
    this.props.fetchWorkspaces();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({'workspaces': nextProps.workspaces});
  }

  render() {
    return (
      <div>
        <ul className="nav nav-tabs">
          <li className="active"><a data-toggle="tab" href="#list">Workspace List</a></li>
          <li><a data-toggle="tab" href="#create">Create Workspace</a></li>
        </ul>

        <div className="tab-content">
          <div id="list" className="tab-pane fade in active">
            <WorkspaceList workspaces={this.state.workspaces}/>
            <GetWorkspace />
          </div>
          <div id="create" className="tab-pane fade">
            <CreateWorkspace />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    workspaces: state.workspace.workspaces,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchWorkspaces: () => dispatch({type: Types.FETCH_WORKSPACE_REQUEST})
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Workspace);
