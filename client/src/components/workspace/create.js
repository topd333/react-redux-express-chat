import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { createWorkspace } from '../../actions/workspace';

const form = reduxForm({
  form: 'CreateWorkspace',
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

  if (!formProps.fullname) {
    errors.fullname = 'Please enter a full name';
  }

  if (!formProps.name) {
    errors.name = 'Please enter a name';
  }

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }

  if (!formProps.confirm_password) {
    errors.confirm_password = 'Please confirm password';
  }

  if (formProps.password != formProps.confirm_password) {
    errors.password = 'Password does not match';
  }

  return errors;
}

class CreateWorkspace extends Component {
  handleFormSubmit(formProps) {
    this.props.send(formProps);
  }

  renderAlert() {
    if (this.props.error) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.error}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <h3>Create Workspace</h3>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          {this.renderAlert()}
          <div className="form-group">
            <label>Full Name</label>
            <Field name="fullname" className="form-control" component={renderField} type="text" value="" />
          </div>
          <div className="form-group">
            <label>Display Name</label>
            <Field name="name" className="form-control" component={renderField} type="text" value="" />
          </div>
          <div className="form-group">
            <label>Admin Email</label>
            <Field name="email" className="form-control" component={renderField} type="email" value="" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <Field name="password" className="form-control" component={renderField} type="password" value="" />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <Field name="confirm_password" className="form-control" component={renderField} type="password" value="" />
          </div>
          <button type="submit" className="btn btn-primary">Create Workspace</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    error: state.workspace.error,
  };
}

export default connect(mapStateToProps, { createWorkspace })(form(CreateWorkspace));
