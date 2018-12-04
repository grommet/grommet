import React, { Component } from 'react';
import { defaultProps } from '../../default-props';
import { FormContext } from './FormContext';

class Form extends Component {
  static defaultProps = {
    value: {},
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { value } = nextProps;
    const { priorValue } = prevState;
    if (!priorValue || value !== priorValue) {
      return { value, priorValue: value };
    }
    return null;
  }

  state = { errors: {}, value: {} };

  validations = {};

  onSubmit = event => {
    const { onSubmit } = this.props;
    const { errors, value } = this.state;
    event.preventDefault();
    const nextErrors = { ...errors };
    Object.keys(this.validations).forEach(name => {
      const validate = this.validations[name];
      const error = validate && validate(value[name]);
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
    const { errors, value } = this.state;
    const nextValue = { ...value };
    nextValue[name] = data;
    const nextErrors = { ...errors };
    if (errors[name]) {
      const dataError =
        error || (this.validations[name] && this.validations[name](data));
      if (dataError) {
        nextErrors[name] = dataError;
      } else {
        delete nextErrors[name];
      }
    }
    this.setState({ value: nextValue, errors: nextErrors });
  };

  addValidation = (name, validate) => {
    this.validations[name] = validate;
  };

  render() {
    const { children, ...rest } = this.props;
    const { errors, value } = this.state;
    return (
      <form {...rest} onSubmit={this.onSubmit}>
        <FormContext.Provider
          value={{
            addValidation: this.addValidation,
            errors,
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
