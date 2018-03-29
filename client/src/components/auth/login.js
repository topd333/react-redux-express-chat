import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { loginUser } from '../../actions/auth';

const form = reduxForm({
  form: 'Login',
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

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }

  return errors;
}

class Login extends Component {
  handleFormSubmit(formProps) {
    this.props.loginUser(formProps);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <span><strong>Error!</strong> {this.props.errorMessage}</span>
        </div>
      );
    }
  }

  componentWillMount() {
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('pwd');
    if (email && password) {
      this.props.loginUser({ email, password, remember: true });
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          {this.renderAlert()}
          <div>
            <label>Email</label>
            <Field name="email" className="form-control" component={renderField} type="text" value="" />
          </div>
          <div>
            <label>Password</label>
            <Field name="password" className="form-control" component={renderField} type="password" value="" />
          </div>
          <div>
            <label>Remember Me</label>
            <Field name="remember" component={renderField} type="checkbox" />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    message: state.auth.message,
    authenticated: state.auth.authenticated,
  };
}

export default connect(mapStateToProps, { loginUser })(form(Login));
