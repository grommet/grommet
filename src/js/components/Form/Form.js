import React, { Component } from 'react';
import { defaultProps } from '../../default-props';
import { FormContext } from './FormContext';

class Form extends Component {
  static defaultProps = {
    value: {},
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { value, errors } = nextProps;
    const { priorValue, priorErrors } = prevState;
    if (!priorValue || value !== priorValue || errors !== priorErrors) {
      return {
        value,
        priorValue: value,
        errors: errors || {},
        priorErrors: errors,
      };
    }
    return null;
  }

  state = { errors: {}, value: {}, touched: {} };

  validations = {};

  onSubmit = event => {
    const { onSubmit } = this.props;
    const { errors, value } = this.state;
    event.preventDefault();
    const nextErrors = { ...errors };
    Object.keys(this.validations).forEach(name => {
      const validate = this.validations[name];
      const error = validate && validate(value[name], value);
      if (error) {
        nextErrors[name] = error;
      } else {
        delete nextErrors[name];
      }
    });
    if (Object.keys(nextErrors).length === 0 && onSubmit) {
      onSubmit({ ...event, value });
    } else {
      this.setState({ errors: nextErrors });
    }
  };

  update = (name, data, error) => {
    const { errors, touched, value } = this.state;
    const nextValue = { ...value };
    nextValue[name] = data;
    const nextTouched = { ...touched };
    nextTouched[name] = true;
    const nextErrors = { ...errors };
    if (errors[name]) {
      const nextError =
        error ||
        (this.validations[name] && this.validations[name](data, nextValue));
      if (nextError) {
        nextErrors[name] = nextError;
      } else {
        delete nextErrors[name];
      }
    }
    this.setState({
      value: nextValue,
      errors: nextErrors,
      touched: nextTouched,
    });
  };

  addValidation = (name, validate) => {
    this.validations[name] = validate;
  };

  render() {
    const { children, ...rest } = this.props;
    const { errors, touched, value } = this.state;
    return (
      <form {...rest} onSubmit={this.onSubmit}>
        <FormContext.Provider
          value={{
            addValidation: this.addValidation,
            errors,
            touched,
            update: this.update,
            value,
          }}
        >
          {children}
        </FormContext.Provider>
      </form>
    );
  }
}

Object.setPrototypeOf(Form.defaultProps, defaultProps);

let FormDoc;
if (process.env.NODE_ENV !== 'production') {
  FormDoc = require('./doc').doc(Form); // eslint-disable-line global-require
}

const FormWrapper = FormDoc || Form;
FormWrapper.displayName = 'Form';

export { FormWrapper as Form };
