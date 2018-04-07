import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Types from '../../actions/s_types';

const form = reduxForm({
  form: 'getWorkspace',
  validate,
});

const renderField = field => (
  <div>
    <input className={field.className} {...field.input} type={field.type} />
    {field.meta.touched && field.meta.error && <div className="help-block error">{field.meta.error}</div>}
  </div>
);

function validate(formProps) {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }

  return errors;
}

class GetWorkspace extends Component {
  handleFormSubmit(formProps) {
    this.props.getWorkspace(formProps);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
    else if (this.props.successMessage) {
      return (
        <div className="alert alert-info">
          <strong>Great!</strong> {this.props.successMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <h3>Get Workspace</h3>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          {this.renderAlert()}
          <div className="form-group">
            <label>Email</label>
            <Field name="email" className="form-control" component={renderField} type="email" value="" />
          </div>
          <button type="submit" className="btn btn-primary">Confirm</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.workspace.error,
    successMessage: state.workspace.success,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getWorkspace: (data) => dispatch({type: Types.GET_WORKSPACE_REQUEST, payload: data})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(form(GetWorkspace));
