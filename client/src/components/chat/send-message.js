import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { send } from '../../actions/chat';

const form = reduxForm({
  form: 'sendMessage',
});

const renderField = field => (
  <div>
    <textarea className="form-control" autoComplete="off" {...field.input} />
  </div>
);

class SendMessage extends Component {
  handleFormSubmit(formProps) {
    this.props.send(formProps);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        {this.renderAlert()}
        <Field name="message" className="form-control" component={renderField} type="textarea" placeholder="Type here to chat..." />
        <button action="submit" className="btn btn-primary">Send</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.chat.error,
  };
}

export default connect(mapStateToProps, { send })(form(SendMessage));
