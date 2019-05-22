function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { Component } from 'react';
import { defaultProps } from '../../default-props';
import { FormContext } from './FormContext';

var updateReducer = function updateReducer(name, data, error, validations) {
  return function (state) {
    var errors = state.errors,
        touched = state.touched,
        value = state.value;

    var nextValue = _extends({}, value);

    nextValue[name] = data;

    var nextTouched = _extends({}, touched);

    nextTouched[name] = true;

    var nextErrors = _extends({}, errors);

    if (errors[name]) {
      var nextError = error || validations[name] && validations[name](data, nextValue);

      if (nextError) {
        nextErrors[name] = nextError;
      } else {
        delete nextErrors[name];
      }
    }

    return {
      value: nextValue,
      errors: nextErrors,
      touched: nextTouched
    };
  };
};

var defaultMessages = {
  invalid: 'invalid',
  required: 'required'
};

var Form =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Form, _Component);

  function Form() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      errors: {},
      value: {},
      touched: {}
    });

    _defineProperty(_assertThisInitialized(_this), "validations", {});

    _defineProperty(_assertThisInitialized(_this), "onSubmit", function (event) {
      var onSubmit = _this.props.onSubmit;
      var _this$state = _this.state,
          errors = _this$state.errors,
          value = _this$state.value; // Don't submit the form via browser form action. We don't want it
      // if the validation fails. And, we assume a javascript action handler
      // otherwise.

      event.preventDefault();

      var nextErrors = _extends({}, errors);

      Object.keys(_this.validations).forEach(function (name) {
        var validate = _this.validations[name];
        var error = validate && validate(value[name], value);

        if (error) {
          nextErrors[name] = error;
        } else {
          delete nextErrors[name];
        }
      });

      if (Object.keys(nextErrors).length === 0 && onSubmit) {
        event.persist(); // extract from React's synthetic event pool

        var adjustedEvent = event;
        adjustedEvent.value = value;
        onSubmit(adjustedEvent);
      } else {
        _this.setState({
          errors: nextErrors
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onReset", function (event) {
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          onReset = _this$props.onReset;
      var value = {};

      _this.setState({
        errors: {},
        value: value,
        touched: {}
      }, function () {
        if (onReset) {
          event.persist(); // extract from React's synthetic event pool

          var adjustedEvent = event;
          adjustedEvent.value = value;
          onReset(adjustedEvent);
        }

        if (onChange) {
          onChange(value);
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "update", function (name, data, error) {
      _this.setState(updateReducer(name, data, error, _this.validations), function () {
        var onChange = _this.props.onChange;
        var value = _this.state.value;

        if (onChange) {
          onChange(value);
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "addValidation", function (name, validate) {
      _this.validations[name] = validate;
    });

    return _this;
  }

  Form.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var value = nextProps.value,
        errors = nextProps.errors,
        messages = nextProps.messages;
    var stateValue = prevState.value,
        stateErrors = prevState.errors,
        priorValue = prevState.priorValue,
        priorErrors = prevState.priorErrors,
        priorMessages = prevState.priorMessages;

    if (!priorValue || value !== priorValue || errors !== priorErrors || messages !== priorMessages) {
      return {
        value: value !== priorValue ? value : stateValue,
        priorValue: value,
        errors: (errors !== priorErrors ? errors : stateErrors) || {},
        priorErrors: errors,
        messages: _extends({}, defaultMessages, messages),
        priorMessages: messages
      };
    }

    return null;
  };

  var _proto = Form.prototype;

  _proto.render = function render() {
    var _this$props2 = this.props,
        children = _this$props2.children,
        rest = _objectWithoutPropertiesLoose(_this$props2, ["children"]);

    delete rest.messages;
    delete rest.theme;
    delete rest.value;
    var _this$state2 = this.state,
        errors = _this$state2.errors,
        touched = _this$state2.touched,
        value = _this$state2.value,
        messages = _this$state2.messages;
    return React.createElement("form", _extends({}, rest, {
      onReset: this.onReset,
      onSubmit: this.onSubmit
    }), React.createElement(FormContext.Provider, {
      value: {
        addValidation: this.addValidation,
        errors: errors,
        messages: messages,
        touched: touched,
        update: this.update,
        value: value
      }
    }, children));
  };

  return Form;
}(Component);

_defineProperty(Form, "defaultProps", {
  messages: defaultMessages,
  value: {}
});

Object.setPrototypeOf(Form.defaultProps, defaultProps);
var FormDoc;

if (process.env.NODE_ENV !== 'production') {
  FormDoc = require('./doc').doc(Form); // eslint-disable-line global-require
}

var FormWrapper = FormDoc || Form;
FormWrapper.displayName = 'Form';
export { FormWrapper as Form };