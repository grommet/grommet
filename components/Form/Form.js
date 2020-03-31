"use strict";

exports.__esModule = true;
exports.Form = void 0;

var _react = _interopRequireWildcard(require("react"));

var _FormContext = require("./FormContext");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var defaultMessages = {
  invalid: 'invalid',
  required: 'required'
};
var defaultValue = {};
var defaultErrors = {};
var defaultInfos = {};

var updateErrors = function updateErrors(nextErrors, name, error) {
  // we disable no-param-reassing so we can use this as a utility function
  // to update nextErrors, to avoid code duplication

  /* eslint-disable no-param-reassign */
  var hasStatusError = typeof error === 'object' && error.status === 'error'; // typeof error === 'object' is implied for both cases of error with
  // a status message and for an error object that is a react node

  if (typeof error === 'object' && !error.status || hasStatusError || typeof error === 'string') {
    nextErrors[name] = hasStatusError ? error.message : error;
  } else {
    delete nextErrors[name];
  }
  /* eslint-enable no-param-reassign */

};

var updateInfos = function updateInfos(nextInfos, name, error) {
  /* eslint-disable no-param-reassign */
  if (typeof error === 'object' && error.status === 'info') {
    nextInfos[name] = error.message;
  } else {
    delete nextInfos[name];
  }
  /* eslint-enable no-param-reassign */

};

var Form = (0, _react.forwardRef)(function (_ref, ref) {
  var children = _ref.children,
      _ref$errors = _ref.errors,
      errorsProp = _ref$errors === void 0 ? defaultErrors : _ref$errors,
      _ref$infos = _ref.infos,
      infosProp = _ref$infos === void 0 ? defaultInfos : _ref$infos,
      _ref$messages = _ref.messages,
      messagesProp = _ref$messages === void 0 ? defaultMessages : _ref$messages,
      onChange = _ref.onChange,
      _onReset = _ref.onReset,
      _onSubmit = _ref.onSubmit,
      _ref$validate = _ref.validate,
      validate = _ref$validate === void 0 ? 'submit' : _ref$validate,
      valueProp = _ref.value,
      rest = _objectWithoutPropertiesLoose(_ref, ["children", "errors", "infos", "messages", "onChange", "onReset", "onSubmit", "validate", "value"]);

  var _useState = (0, _react.useState)(valueProp || defaultValue),
      value = _useState[0],
      setValue = _useState[1];

  (0, _react.useEffect)(function () {
    if (valueProp !== undefined && valueProp !== value) {
      setValue(valueProp);
    }
  }, [value, valueProp]);

  var _useState2 = (0, _react.useState)(messagesProp),
      messages = _useState2[0],
      setMessages = _useState2[1];

  (0, _react.useEffect)(function () {
    return setMessages(messagesProp);
  }, [messagesProp]);

  var _useState3 = (0, _react.useState)(errorsProp || {}),
      errors = _useState3[0],
      setErrors = _useState3[1];

  (0, _react.useEffect)(function () {
    return setErrors(errorsProp || {});
  }, [errorsProp]);

  var _useState4 = (0, _react.useState)(infosProp || {}),
      infos = _useState4[0],
      setInfos = _useState4[1];

  (0, _react.useEffect)(function () {
    return setInfos(infosProp || {});
  }, [infosProp]);

  var _useState5 = (0, _react.useState)({}),
      touched = _useState5[0],
      setTouched = _useState5[1];

  var validations = (0, _react.useRef)({});
  (0, _react.useEffect)(function () {}, [value, errors, infos]);
  var update = (0, _react.useCallback)(function (name, data, initial) {
    setValue(function (prevValue) {
      var nextValue = _extends({}, prevValue);

      nextValue[name] = data; // re-run any validations, in case the validation
      // is checking across fields

      setErrors(function (prevErrors) {
        var nextErrors = _extends({}, prevErrors);

        Object.keys(prevErrors).forEach(function (errName) {
          if (validations.current[errName]) {
            var nextError = validations.current[errName](data, nextValue);
            updateErrors(nextErrors, errName, nextError);
          }
        });
        return nextErrors;
      });
      setInfos(function (prevInfos) {
        var nextInfos = _extends({}, prevInfos); // re-run any validations that have infos, in case the validation
        // is checking across fields


        Object.keys(nextInfos).forEach(function (infoName) {
          if (validations.current[infoName]) {
            var nextInfo = validations.current[infoName](data, nextValue);
            updateInfos(nextInfos, infoName, nextInfo);
          }
        });
        return nextInfos;
      });
      if (onChange) onChange(nextValue);
      return nextValue;
    });
    if (!initial) setTouched(function (prevTouched) {
      var nextTouched = _extends({}, prevTouched);

      nextTouched[name] = true;
      return nextTouched;
    });
  }, [onChange]);

  var useFormContext = function useFormContext(name, componentValue, defaultComponentValue) {
    var valueData = name && value[name] || defaultComponentValue;

    var _useState6 = (0, _react.useState)(componentValue !== undefined ? componentValue : valueData),
        data = _useState6[0],
        setData = _useState6[1];

    if (componentValue !== undefined) {
      if (componentValue !== data) {
        setData(componentValue);
        if (name) update(name, componentValue);
      } else if (name && value[name] === undefined) {
        update(name, componentValue, true);
      }
    } else if (valueData !== data) {
      setData(valueData);
    }

    return [data, function (nextData) {
      // only set if the caller hasn't supplied a specific value
      if (componentValue === undefined) {
        if (name) update(name, nextData);
        setData(nextData);
      }
    }];
  };

  return _react["default"].createElement("form", _extends({
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

      var nextInfos = _extends({}, infos);

      Object.keys(validations.current).forEach(function (name) {
        var nextError = validations.current[name](value[name], value);
        updateErrors(nextErrors, name, nextError);
        updateInfos(nextInfos, name, nextError);
      });
      setErrors(nextErrors);
      setInfos(nextInfos);

      if (Object.keys(nextErrors).length === 0 && _onSubmit) {
        event.persist(); // extract from React's synthetic event pool

        var adjustedEvent = event;
        adjustedEvent.value = value;
        adjustedEvent.touched = touched;

        _onSubmit(adjustedEvent);
      }
    }
  }), _react["default"].createElement(_FormContext.FormContext.Provider, {
    value: {
      addValidation: function addValidation(name, validation) {
        validations.current[name] = validation;
      },
      removeValidation: function removeValidation(name) {
        delete validations.current[name];
      },
      onBlur: validate === 'blur' ? function (name) {
        if (validations.current[name]) {
          var error = validations.current[name](value[name], value);
          setErrors(function (prevErrors) {
            var nextErrors = _extends({}, prevErrors);

            updateErrors(nextErrors, name, error);
            return nextErrors;
          });
          setInfos(function (prevInfos) {
            var nextInfos = _extends({}, prevInfos);

            updateInfos(nextInfos, name, error);
            return nextInfos;
          });
        }
      } : undefined,
      errors: errors,
      get: function get(name) {
        return value[name];
      },
      infos: infos,
      messages: messages,
      set: function set(name, nextValue) {
        return update(name, nextValue);
      },
      touched: touched,
      update: update,
      useFormContext: useFormContext,
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
exports.Form = FormWrapper;