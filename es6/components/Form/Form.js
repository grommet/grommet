function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { FormContext } from './FormContext';
var defaultMessages = {
  invalid: 'invalid',
  required: 'required'
};
var defaultValue = {};
var defaultErrors = {};
var Form = forwardRef(function (_ref, ref) {
  var children = _ref.children,
      _ref$errors = _ref.errors,
      errorsProp = _ref$errors === void 0 ? defaultErrors : _ref$errors,
      _ref$messages = _ref.messages,
      messagesProp = _ref$messages === void 0 ? defaultMessages : _ref$messages,
      onChange = _ref.onChange,
      _onReset = _ref.onReset,
      _onSubmit = _ref.onSubmit,
      _ref$validate = _ref.validate,
      validate = _ref$validate === void 0 ? 'submit' : _ref$validate,
      _ref$value = _ref.value,
      valueProp = _ref$value === void 0 ? defaultValue : _ref$value,
      rest = _objectWithoutPropertiesLoose(_ref, ["children", "errors", "messages", "onChange", "onReset", "onSubmit", "validate", "value"]);

  var _useState = useState(valueProp),
      value = _useState[0],
      setValue = _useState[1];

  useEffect(function () {
    if (valueProp !== defaultValue) setValue(valueProp);
  }, [valueProp]);

  var _useState2 = useState(messagesProp),
      messages = _useState2[0],
      setMessages = _useState2[1];

  useEffect(function () {
    return setMessages(messagesProp);
  }, [messagesProp]);

  var _useState3 = useState(errorsProp || {}),
      errors = _useState3[0],
      setErrors = _useState3[1];

  useEffect(function () {
    return setErrors(errorsProp || {});
  }, [errorsProp]);

  var _useState4 = useState({}),
      touched = _useState4[0],
      setTouched = _useState4[1];

  var validations = useRef({});
  useEffect(function () {
    if (onChange) onChange(value);
  }, [onChange, value]);
  useEffect(function () {}, [value, errors]);
  var update = useCallback(function (name, data, error, initial) {
    setValue(function (prevValue) {
      var nextValue = _extends({}, prevValue);

      nextValue[name] = data;
      setErrors(function (prevErrors) {
        var nextErrors = _extends({}, prevErrors); // re-run any validations that have errors, in case the validation
        // is checking across fields


        Object.keys(prevErrors).forEach(function (errName) {
          var nextError = errName === name && error || validations.current[errName] && validations.current[errName](data, nextValue);

          if (nextError) {
            nextErrors[errName] = nextError;
          } else {
            delete nextErrors[errName];
          }
        });
        return nextErrors;
      });
      return nextValue;
    });
    if (!initial) setTouched(function (prevTouched) {
      var nextTouched = _extends({}, prevTouched);

      nextTouched[name] = true;
      return nextTouched;
    });
  }, []);
  return React.createElement("form", _extends({
    ref: ref
  }, rest, {
    onReset: function onReset(event) {
      setValue(defaultValue);
      setErrors({});
      setTouched({});

      if (_onReset) {
        event.persist(); // extract from React's synthetic event pool

        var adjustedEvent = event;
        adjustedEvent.value = defaultValue;

        _onReset(adjustedEvent);
      }
    },
    onSubmit: function onSubmit(event) {
      // Don't submit the form via browser form action. We don't want it
      // if the validation fails. And, we assume a javascript action handler
      // otherwise.
      event.preventDefault();

      var nextErrors = _extends({}, errors);

      Object.keys(validations.current).forEach(function (name) {
        var validation = validations.current[name];
        var error = validation && validation(value[name], value);

        if (error) {
          nextErrors[name] = error;
        } else {
          delete nextErrors[name];
        }
      });

      if (Object.keys(nextErrors).length === 0 && _onSubmit) {
        event.persist(); // extract from React's synthetic event pool

        var adjustedEvent = event;
        adjustedEvent.value = value;
        adjustedEvent.touched = touched;

        _onSubmit(adjustedEvent);
      } else {
        setErrors(nextErrors);
      }
    }
  }), React.createElement(FormContext.Provider, {
    value: {
      addValidation: function addValidation(name, validation) {
        validations.current[name] = validation;
      },
      onBlur: validate === 'blur' ? function (name) {
        if (validations.current[name]) {
          setErrors(function (prevErrors) {
            var nextErrors = _extends({}, prevErrors);

            var error = validations.current[name](value[name], value);

            if (error) {
              nextErrors[name] = error;
            } else {
              delete nextErrors[name];
            }

            return nextErrors;
          });
        }
      } : undefined,
      errors: errors,
      get: function get(name) {
        return value[name];
      },
      messages: messages,
      set: function set(name, nextValue) {
        return update(name, nextValue);
      },
      touched: touched,
      update: update,
      value: value
    }
  }, children));
});
Form.displayName = 'Form';
var FormDoc;

if (process.env.NODE_ENV !== 'production') {
  FormDoc = require('./doc').doc(Form); // eslint-disable-line global-require
}

var FormWrapper = FormDoc || Form;
export { FormWrapper as Form };