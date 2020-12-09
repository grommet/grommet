function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import { FormContext } from './FormContext';
var defaultMessages = {
  invalid: 'invalid',
  required: 'required'
};
var defaultValue = {};
var defaultTouched = {};
var defaultValidationResults = {
  errors: {},
  infos: {}
}; // validations is an array from Object.entries()

var validate = function validate(validations, value, omitValid) {
  var nextErrors = {};
  var nextInfos = {};
  validations.forEach(function (_ref) {
    var name = _ref[0],
        validation = _ref[1];

    if (!omitValid) {
      nextErrors[name] = undefined;
      nextInfos[name] = undefined;
    }

    var result = validation(value[name], value); // typeof error === 'object' is implied for both cases of error with
    // a status message and for an error object that is a react node

    if (typeof result === 'object') {
      if (result.status === 'info') {
        nextInfos[name] = result.message;
      } else {
        nextErrors[name] = result.message || result; // could be a node
      }
    } else if (typeof result === 'string') {
      nextErrors[name] = result;
    }
  });
  return [nextErrors, nextInfos];
};

var Form = /*#__PURE__*/forwardRef(function (_ref2, ref) {
  var children = _ref2.children,
      _ref2$errors = _ref2.errors,
      errorsProp = _ref2$errors === void 0 ? defaultValidationResults.errors : _ref2$errors,
      _ref2$infos = _ref2.infos,
      infosProp = _ref2$infos === void 0 ? defaultValidationResults.infos : _ref2$infos,
      _ref2$messages = _ref2.messages,
      messages = _ref2$messages === void 0 ? defaultMessages : _ref2$messages,
      onChange = _ref2.onChange,
      _onReset = _ref2.onReset,
      _onSubmit = _ref2.onSubmit,
      onValidate = _ref2.onValidate,
      _ref2$validate = _ref2.validate,
      validateOn = _ref2$validate === void 0 ? 'submit' : _ref2$validate,
      valueProp = _ref2.value,
      rest = _objectWithoutPropertiesLoose(_ref2, ["children", "errors", "infos", "messages", "onChange", "onReset", "onSubmit", "onValidate", "validate", "value"]);

  var _useState = useState(valueProp || defaultValue),
      valueState = _useState[0],
      setValueState = _useState[1];

  var value = useMemo(function () {
    return valueProp || valueState;
  }, [valueProp, valueState]);

  var _useState2 = useState(defaultTouched),
      touched = _useState2[0],
      setTouched = _useState2[1];

  var _useState3 = useState(defaultValidationResults),
      validationResults = _useState3[0],
      setValidationResults = _useState3[1];

  useEffect(function () {
    return setValidationResults({
      errors: errorsProp,
      infos: infosProp
    });
  }, [errorsProp, infosProp]);
  var validations = useRef({}); // clear any errors when value changes

  useEffect(function () {
    setValidationResults(function (prevValidationResults) {
      var _validate = validate(Object.entries(validations.current).filter(function (_ref3) {
        var n = _ref3[0];
        return prevValidationResults.errors[n] || prevValidationResults.infos[n];
      }), value),
          nextErrors = _validate[0],
          nextInfos = _validate[1];

      return {
        errors: _extends({}, prevValidationResults.errors, nextErrors),
        infos: _extends({}, prevValidationResults.infos, nextInfos)
      };
    });
  }, [touched, value]); // There are three basic patterns of handling form input value state:
  //
  // 1 - form controlled
  //
  // In this model, the caller sets `value` and `onChange` properties
  // on the Form component to supply the values used by the input fields.
  // In useFormContext(), componentValue would be undefined and formValue
  // is be set to whatever the form state has. Whenever the form state
  // changes, we update the contextValue so the input component will use
  // that. When the input component changes, we will call update() to
  // update the form state.
  //
  // 2 - input controlled
  //
  // In this model, the caller sets `value` and `onChange` properties
  // on the input components, like TextInput, to supply the value for it.
  // In useFormContext(), componentValue is this value and we ensure to
  // update the form state, via update(), and set the contextValue from
  // the componentValue. When the input component changes, we will
  // call update() to update the form state.
  //
  // 3 - uncontrolled
  //
  // In this model, the caller doesn't set a `value` or `onChange` property
  // at either the form or input component levels.
  // In useFormContext(), componentValue is undefined and valueProp is
  // undefined and nothing much happens here. That is, unless the
  // calling component needs to know the state in order to work, such
  // as CheckBox or Select. In this case, those components supply
  // an initialValue, which will trigger updating the contextValue so
  // they can have access to it.
  //

  var useFormInput = function useFormInput(name, componentValue, initialValue) {
    var _useState4 = useState(initialValue),
        inputValue = _useState4[0],
        setInputValue = _useState4[1];

    var formValue = name ? value[name] : undefined; // This effect is for pattern #2, where the controlled input
    // component is driving the value via componentValue.

    useEffect(function () {
      if (name && // we have somewhere to put this
      componentValue !== undefined && // input driving
      componentValue !== formValue // don't already have it
      ) {
          setValueState(function (prevValue) {
            var nextValue = _extends({}, prevValue);

            nextValue[name] = componentValue;
            return nextValue;
          }); // don't onChange on programmatic changes
        }
    }, [componentValue, formValue, name]);
    var useValue;
    if (componentValue !== undefined) // input component drives, pattern #2
      useValue = componentValue;else if (valueProp && name && formValue !== undefined) // form drives, pattern #1
      useValue = formValue;else if (formValue === undefined) // form has reset, so reset input value as well
      useValue = initialValue;else useValue = inputValue;
    return [useValue, function (nextComponentValue) {
      if (name) {
        // we have somewhere to put this
        var nextTouched = _extends({}, touched);

        nextTouched[name] = true;

        if (!touched[name]) {
          // don't update if not needed
          setTouched(nextTouched);
        }

        var nextValue = _extends({}, value);

        nextValue[name] = nextComponentValue;
        setValueState(nextValue);
        if (onChange) onChange(nextValue, {
          touched: nextTouched
        });
      }

      if (initialValue !== undefined) setInputValue(nextComponentValue);
    }];
  };

  var useFormField = function useFormField(_ref4) {
    var errorArg = _ref4.error,
        infoArg = _ref4.info,
        name = _ref4.name,
        required = _ref4.required,
        validateArg = _ref4.validate;
    var error = errorArg || validationResults.errors[name];
    var info = infoArg || validationResults.infos[name];
    useEffect(function () {
      var validateSingle = function validateSingle(aValidate, value2, data) {
        var result;

        if (typeof aValidate === 'function') {
          result = aValidate(value2, data);
        } else if (aValidate.regexp) {
          if (!aValidate.regexp.test(value2)) {
            result = aValidate.message || messages.invalid;

            if (aValidate.status) {
              result = {
                message: result,
                status: aValidate.status
              };
            }
          }
        }

        return result;
      };

      var validateField = function validateField(value2, data) {
        var result;

        if (required && ( // false is for CheckBox
        value2 === undefined || value2 === '' || value2 === false)) {
          result = messages.required;
        } else if (validateArg) {
          if (Array.isArray(validateArg)) {
            validateArg.some(function (aValidate) {
              result = validateSingle(aValidate, value2, data);
              return !!result;
            });
          } else {
            result = validateSingle(validateArg, value2, data);
          }
        }

        return result;
      };

      if (validateArg || required) {
        validations.current[name] = validateField;
        return function () {
          return delete validations.current[name];
        };
      }

      return undefined;
    }, [error, name, required, validateArg]);
    return {
      error: error,
      info: info,
      inForm: true,
      onBlur: validateOn === 'blur' ? function () {
        // run validations on touched keys
        var _validate2 = validate(Object.entries(validations.current).filter(function (_ref5) {
          var n = _ref5[0];
          return touched[n] || n === name;
        }), value),
            nextErrors = _validate2[0],
            nextInfos = _validate2[1]; // give user access to errors that have occurred on validation


        setValidationResults(function (prevValidationResults) {
          // keep any previous errors and infos for untouched keys,
          // which probably came from a submit
          var nextValidationResults = {
            errors: _extends({}, prevValidationResults.errors, nextErrors),
            infos: _extends({}, prevValidationResults.infos, nextInfos)
          };
          if (onValidate) onValidate(nextValidationResults);
          return nextValidationResults;
        });
      } : undefined
    };
  };

  return /*#__PURE__*/React.createElement("form", _extends({
    ref: ref
  }, rest, {
    onReset: function onReset(event) {
      if (!valueProp) {
        setValueState(defaultValue);
        if (onChange) onChange(defaultValue, {
          touched: defaultTouched
        });
      }

      setTouched(defaultTouched);
      setValidationResults(defaultValidationResults);

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

      var _validate3 = validate(Object.entries(validations.current), value, true),
          nextErrors = _validate3[0],
          nextInfos = _validate3[1];

      setValidationResults(function () {
        var nextValidationResults = {
          errors: nextErrors,
          infos: nextInfos
        };
        if (onValidate) onValidate(nextValidationResults);
        return nextValidationResults;
      });

      if (Object.keys(nextErrors).length === 0 && _onSubmit) {
        event.persist(); // extract from React's synthetic event pool

        var adjustedEvent = event;
        adjustedEvent.value = value;
        adjustedEvent.touched = touched;

        _onSubmit(adjustedEvent);
      }
    }
  }), /*#__PURE__*/React.createElement(FormContext.Provider, {
    value: {
      useFormField: useFormField,
      useFormInput: useFormInput
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