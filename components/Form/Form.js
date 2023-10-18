"use strict";

exports.__esModule = true;
exports.Form = void 0;
var _react = _interopRequireWildcard(require("react"));
var _contexts = require("../../contexts");
var _MessageContext = require("../../contexts/MessageContext");
var _utils = require("../../utils");
var _FormContext = require("./FormContext");
var _propTypes = require("./propTypes");
var _excluded = ["children", "errors", "infos", "messages", "kind", "onChange", "onReset", "onSubmit", "onValidate", "validate", "value"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var defaultValue = {};
var defaultTouched = {};
var defaultValidationResults = {
  errors: {},
  infos: {}
};
var stringToArray = function stringToArray(string) {
  var match = string == null ? void 0 : string.match(/^(.+)\[([0-9]+)\]\.(.*)$/);
  if (match) {
    var arrayName = match[1],
      indexOfArray = match[2],
      arrayObjName = match[3];
    return {
      indexOfArray: indexOfArray,
      arrayName: arrayName,
      arrayObjName: arrayObjName
    };
  }
  return undefined;
};
var getValueAt = function getValueAt(valueObject, pathArg) {
  if (valueObject === undefined) return undefined;
  var path = Array.isArray(pathArg) ? pathArg : pathArg.split('.');
  if (path.length === 1) return valueObject[path];
  return getValueAt(valueObject[path.shift()], path);
};
var setValueAt = function setValueAt(valueObject, pathArg, value) {
  var object = valueObject;
  var path = Array.isArray(pathArg) ? pathArg : pathArg.split('.');
  if (path.length === 1) object[path] = value;else {
    var key = path.shift();
    if (!object[key]) object[key] = {};
    setValueAt(object[key], path, value);
  }
};
var getFieldValue = function getFieldValue(name, value) {
  var isArrayField = stringToArray(name);
  if (isArrayField) {
    var _value$arrayName;
    var indexOfArray = isArrayField.indexOfArray,
      arrayName = isArrayField.arrayName,
      arrayObjName = isArrayField.arrayObjName;
    var obj = (_value$arrayName = value[arrayName]) == null ? void 0 : _value$arrayName[indexOfArray];
    return arrayObjName ? obj == null ? void 0 : obj[arrayObjName] : obj;
  }
  return getValueAt(value, name);
};
var setFieldValue = function setFieldValue(name, componentValue, prevValue) {
  var nextValue = _extends({}, prevValue);
  var isArrayField = stringToArray(name);
  if (isArrayField) {
    var indexOfArray = isArrayField.indexOfArray,
      arrayName = isArrayField.arrayName,
      arrayObjName = isArrayField.arrayObjName;
    if (!nextValue[arrayName]) nextValue[arrayName] = [];
    if (arrayObjName) {
      var _nextValue$arrayName$;
      if (!nextValue[arrayName][indexOfArray]) nextValue[arrayName][indexOfArray] = (_nextValue$arrayName$ = {}, _nextValue$arrayName$[arrayObjName] = componentValue, _nextValue$arrayName$);
      nextValue[arrayName][indexOfArray][arrayObjName] = componentValue;
    } else nextValue[arrayName][indexOfArray] = componentValue;
  } else {
    setValueAt(nextValue, name, componentValue);
  }
  return nextValue;
};

// Apply validation rule to field value and send correct messaging.
var validate = function validate(rule, fieldValue, formValue, format, messages) {
  var result;
  if (typeof rule === 'function') {
    result = rule(fieldValue, formValue);
  } else if (rule.regexp) {
    if (!rule.regexp.test(fieldValue)) {
      result = rule.message || format({
        id: 'form.invalid',
        messages: messages
      });
      if (rule.status) {
        result = {
          message: result,
          status: rule.status
        };
      }
    }
  }
  return result;
};

// Validates particular key in formValue
var validateName = function validateName(validationRules, required) {
  return function (name, formValue, format, messages) {
    var fieldValue = getFieldValue(name, formValue);
    var validationResult;
    if (required && (
    // false is for CheckBox
    fieldValue === undefined || fieldValue === '' || fieldValue === false || Array.isArray(fieldValue) && !fieldValue.length)) {
      validationResult = format({
        id: 'form.required',
        messages: messages
      });
    } else if (validationRules) {
      if (Array.isArray(validationRules)) {
        validationRules.some(function (rule) {
          validationResult = validate(rule, fieldValue, formValue, format, messages);
          return !!validationResult;
        });
      } else {
        validationResult = validate(validationRules, fieldValue, formValue, format, messages);
      }
    }
    return validationResult;
  };
};

// Validates all keys in formValue
var validateForm = function validateForm(validationRules, formValue, format, messages, omitValid) {
  var nextErrors = {};
  var nextInfos = {};
  validationRules.forEach(function (_ref) {
    var name = _ref[0],
      _ref$ = _ref[1],
      field = _ref$.field,
      input = _ref$.input,
      validateOn = _ref$.validateOn;
    if (!omitValid) {
      nextErrors[name] = undefined;
      nextInfos[name] = undefined;
    }
    if (!validateOn) return;
    var result;
    if (input) {
      // input() a validation function supplied through useFormInput()
      result = input(name, formValue, format, messages);
    }
    if (field && !result) {
      // field() a validation function supplied through useFormField()
      result = field(name, formValue, format, messages);
    }
    // typeof error === 'object' is implied for both cases of error with
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
var isInstantValidate = function isInstantValidate(validateOn) {
  return ['blur', 'change'].includes(validateOn);
};
var Form = exports.Form = /*#__PURE__*/(0, _react.forwardRef)(function (_ref2, ref) {
  var children = _ref2.children,
    _ref2$errors = _ref2.errors,
    errorsProp = _ref2$errors === void 0 ? defaultValidationResults.errors : _ref2$errors,
    _ref2$infos = _ref2.infos,
    infosProp = _ref2$infos === void 0 ? defaultValidationResults.infos : _ref2$infos,
    messages = _ref2.messages,
    kind = _ref2.kind,
    onChange = _ref2.onChange,
    _onReset = _ref2.onReset,
    _onSubmit = _ref2.onSubmit,
    onValidate = _ref2.onValidate,
    _ref2$validate = _ref2.validate,
    validateOnProp = _ref2$validate === void 0 ? 'submit' : _ref2$validate,
    valueProp = _ref2.value,
    rest = _objectWithoutPropertiesLoose(_ref2, _excluded);
  var formRef = (0, _utils.useForwardedRef)(ref);
  var _useContext = (0, _react.useContext)(_MessageContext.MessageContext),
    format = _useContext.format;
  var _useState = (0, _react.useState)(valueProp || defaultValue),
    valueState = _useState[0],
    setValueState = _useState[1];
  var value = (0, _react.useMemo)(function () {
    return valueProp || valueState;
  }, [valueProp, valueState]);
  var _useState2 = (0, _react.useState)(defaultTouched),
    touched = _useState2[0],
    setTouched = _useState2[1];
  var _useState3 = (0, _react.useState)(validateOnProp),
    validateOn = _useState3[0],
    setValidateOn = _useState3[1];
  var _useState4 = (0, _react.useState)({
      errors: errorsProp,
      infos: infosProp
    }),
    validationResults = _useState4[0],
    setValidationResults = _useState4[1];
  // maintain a copy of validationResults in a ref for useEffects
  // which can't depend on validationResults directly without
  // causing infinite renders.
  var validationResultsRef = (0, _react.useRef)({});
  // Simulated onMount state. Consider Form to be mounted once it has
  // accounted for values originating from controlled inputs (available
  // at second rendering).
  var _useState5 = (0, _react.useState)('unmounted'),
    mounted = _useState5[0],
    setMounted = _useState5[1];
  (0, _react.useEffect)(function () {
    if (!mounted) setMounted('mounting');else if (mounted === 'mounting') setMounted('mounted');
  }, [mounted]);
  // `pendingValidation` is the name of the FormField awaiting validation.
  var _useState6 = (0, _react.useState)(undefined),
    pendingValidation = _useState6[0],
    setPendingValidation = _useState6[1];
  var validationRulesRef = (0, _react.useRef)({});
  var requiredFields = (0, _react.useRef)([]);
  var analyticsRef = (0, _react.useRef)({
    start: new Date(),
    errors: {}
  });
  var sendAnalytics = (0, _contexts.useAnalytics)();
  var buildValid = (0, _react.useCallback)(function (nextErrors) {
    var valid = false;
    valid = requiredFields.current.filter(function (n) {
      return Object.keys(validationRulesRef.current).includes(n);
    }).every(function (field) {
      return value[field] && (value[field] !== '' || value[field] !== false);
    });
    if (Object.keys(nextErrors).length > 0) valid = false;
    return valid;
  }, [value]);

  // Only keep validation results for current form fields. In the case of a
  // dynamic form, a field possessing an error may have been removed from the
  // form; need to clean up any previous related validation results.
  var filterRemovedFields = function filterRemovedFields(prevValidations) {
    var nextValidations = prevValidations;
    return Object.keys(nextValidations).filter(function (n) {
      return !validationRulesRef.current[n] || nextValidations[n] === undefined;
    }).forEach(function (n) {
      return delete nextValidations[n];
    });
  };
  var updateAnalytics = function updateAnalytics() {
    var _validationResultsRef;
    var errorFields = Object.keys((_validationResultsRef = validationResultsRef.current) == null ? void 0 : _validationResultsRef.errors);
    var errorCounts = analyticsRef.current.errors;
    if (errorFields.length > 0) {
      errorFields.forEach(function (key) {
        errorCounts[key] = (errorCounts[key] || 0) + 1;
      });
    }
  };
  var applyValidationRules = (0, _react.useCallback)(function (validationRules) {
    var _validateForm = validateForm(validationRules, value, format, messages),
      validatedErrors = _validateForm[0],
      validatedInfos = _validateForm[1];
    setValidationResults(function (prevValidationResults) {
      // Keep any previous errors and infos for untouched keys,
      // these may have come from a Submit.
      var nextErrors = _extends({}, prevValidationResults.errors, validatedErrors);
      var nextInfos = _extends({}, prevValidationResults.infos, validatedInfos);
      // Remove previous errors and infos for keys no longer in the
      // form, these may have been fields removed from a dynamic form.
      filterRemovedFields(nextErrors);
      filterRemovedFields(nextInfos);
      var nextValidationResults = {
        errors: nextErrors,
        infos: nextInfos
      };
      if (onValidate) onValidate(_extends({}, nextValidationResults, {
        valid: buildValid(nextErrors)
      }));
      validationResultsRef.current = nextValidationResults;
      updateAnalytics();
      return nextValidationResults;
    });
  }, [buildValid, format, messages, onValidate, value]);

  // Validate all fields holding values onMount if set to
  // validate when blur or change.
  (0, _react.useEffect)(function () {
    var validationRules = Object.entries(validationRulesRef.current);
    // Use simulated onMount state to account for values provided by
    // controlled inputs.
    if (mounted !== 'mounted' && (isInstantValidate(validateOn) || validationRules.some(function (_ref3) {
      var v = _ref3[1];
      return isInstantValidate(v.validateOn);
    })) && Object.keys(value).length > 0 && Object.keys(touched).length === 0) {
      applyValidationRules(validationRules.filter(function (_ref4) {
        var n = _ref4[0],
          v = _ref4[1];
        return getFieldValue(n, value) && v.validateOn;
      })
      // Exlude empty arrays which may be initial values in
      // an input such as DateInput.
      .filter(function (_ref5) {
        var n = _ref5[0];
        return !(Array.isArray(getFieldValue(n, value)) && getFieldValue(n, value).length === 0);
      }));
    }
  }, [applyValidationRules, mounted, touched, validateOn, value]);

  // Run validation against fields with pendingValidations from onBlur
  // and/or onChange.
  (0, _react.useEffect)(function () {
    var validationRules = Object.entries(validationRulesRef.current);
    var timer = setTimeout(function () {
      if (pendingValidation && (isInstantValidate(validateOn) || validationRules.some(function (_ref6) {
        var v = _ref6[1];
        return isInstantValidate(v.validateOn);
      }))) {
        applyValidationRules(validationRules.filter(function (_ref7) {
          var n = _ref7[0],
            v = _ref7[1];
          return (touched[n] || pendingValidation.includes(n)) && v.validateOn;
        }));
        setPendingValidation(undefined);
      }
      // Complete any potential click events before running onBlur validation.
      // Otherwise, click events like reset, etc. may not be registered. For a
      // detailed scenario/discussion, see: https://github.com/grommet/grommet/issues/4863
      // Values empirically tested; 120 was selected because it is the largest
      // Chrome: 100, Safari: 120, Firefox: 80
    }, 120);
    return function () {
      return clearTimeout(timer);
    };
  }, [applyValidationRules, pendingValidation, touched, validateOn]);

  // Re-run validation rules for all fields with prior errors.
  // if validate=blur this helps re-validate if there are errors
  // as the user fixes them (basically act like validate=change for that)
  (0, _react.useEffect)(function () {
    var _validationResultsRef2;
    var validationRules = Object.entries(validationRulesRef.current);
    if ((_validationResultsRef2 = validationResultsRef.current) != null && _validationResultsRef2.errors && Object.keys(validationResultsRef.current.errors).length > 0) {
      applyValidationRules(validationRules.filter(function (_ref8) {
        var n = _ref8[0];
        return touched[n] && validationResultsRef.current.errors[n];
      }));
    }
  }, [applyValidationRules, touched]);
  (0, _react.useEffect)(function () {
    var element = formRef.current;
    analyticsRef.current = {
      start: new Date(),
      errors: {}
    };
    sendAnalytics({
      type: 'formOpen',
      element: element
    });
    return function () {
      if (!analyticsRef.current.submitted) {
        sendAnalytics({
          type: 'formClose',
          element: element,
          errors: analyticsRef.current.errors,
          elapsed: new Date().getTime() - analyticsRef.current.start.getTime()
        });
      }
    };
  }, [sendAnalytics, formRef]);

  // There are three basic patterns of handling form input value state:
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
  var formContextValue = (0, _react.useMemo)(function () {
    var useFormInput = function useFormInput(_ref9) {
      var name = _ref9.name,
        componentValue = _ref9.value,
        initialValue = _ref9.initialValue,
        validateArg = _ref9.validate;
      var _useState7 = (0, _react.useState)(initialValue),
        inputValue = _useState7[0],
        setInputValue = _useState7[1];
      var formValue = name ? getFieldValue(name, value) : undefined;
      // for dynamic forms, we need to track when an input has been added to
      // the form value. if the input is unmounted, we will delete its
      // key/value from the form value.
      var keyCreated = (0, _react.useRef)(false);

      // This effect is for pattern #2, where the controlled input
      // component is driving the value via componentValue.
      (0, _react.useEffect)(function () {
        if (name &&
        // we have somewhere to put this
        componentValue !== undefined &&
        // input driving
        componentValue !== formValue // don't already have it
        ) {
          setValueState(function (prevValue) {
            return setFieldValue(name, componentValue, prevValue);
          });
          // don't onChange on programmatic changes
        }
      }, [componentValue, formValue, name]);

      // on unmount, if the form is uncontrolled, remove the key/value
      // from the form value
      (0, _react.useEffect)(function () {
        return function () {
          if (keyCreated.current) {
            keyCreated.current = false;
            setValueState(function (prevValue) {
              var nextValue = _extends({}, prevValue);
              var isArrayField = stringToArray(name);
              if (isArrayField) {
                var arrayName = isArrayField.arrayName;
                delete nextValue[arrayName];
              } else {
                delete nextValue[name];
              }
              return nextValue;
            });
          }
        };
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [] // only run onmount and unmount
      );

      // Create validation rules for fields
      (0, _react.useEffect)(function () {
        if (validateArg) {
          if (!validationRulesRef.current[name]) {
            validationRulesRef.current[name] = {};
          }
          validationRulesRef.current[name].input = validateName(validateArg);
          return function () {
            return delete validationRulesRef.current[name].input;
          };
        }
        return undefined;
      }, [validateArg, name]);
      var useValue;
      if (componentValue !== undefined)
        // input component drives, pattern #2
        useValue = componentValue;else if (valueProp && name && formValue !== undefined)
        // form drives, pattern #1
        useValue = formValue;else if (formValue === undefined && name)
        // form has reset, so reset input value as well
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

          // if nextValue doesn't have a key for name, this must be
          // uncontrolled form. we will flag this field was added so
          // we know to remove its value from the form if it is dynamically
          // removed
          if (!(name in value)) keyCreated.current = true;
          var nextValue = setFieldValue(name, nextComponentValue, value);
          setValueState(nextValue);
          if (onChange) onChange(nextValue, {
            touched: nextTouched
          });
        }
        if (initialValue !== undefined) setInputValue(nextComponentValue);
      }];
    };
    var useFormField = function useFormField(_ref10) {
      var errorArg = _ref10.error,
        infoArg = _ref10.info,
        name = _ref10.name,
        required = _ref10.required,
        disabled = _ref10.disabled,
        validateArg = _ref10.validate,
        validateOnArg = _ref10.validateOn;
      var error = disabled ? undefined : errorArg || validationResults.errors[name];
      var info = infoArg || validationResults.infos[name];
      (0, _react.useEffect)(function () {
        setValidateOn(function (prevValues) {
          var _extends2;
          if (typeof prevValues === 'string') {
            var _ref11;
            return _ref11 = {}, _ref11[name] = validateOnArg || validateOnProp, _ref11;
          }
          return _extends({}, prevValues, (_extends2 = {}, _extends2[name] = validateOnArg || validateOnProp, _extends2));
        });
      }, [validateOnArg, name]);

      // Create validation rules for field
      (0, _react.useEffect)(function () {
        var index = requiredFields.current.indexOf(name);
        if (required) {
          if (index === -1) requiredFields.current.push(name);
        } else if (index !== -1) requiredFields.current.splice(index, 1);
        if (validateArg || required) {
          if (!validationRulesRef.current[name]) {
            validationRulesRef.current[name] = {};
          }
          validationRulesRef.current[name].field = validateName(validateArg, required);

          // priority is given to validateOn prop on formField, if it is
          // undefined, then we will use the validate prop value of Form.
          // The reason we don't want to add validateOn = "submit" here is
          // because we don't want to trigger validation of "submit" field
          // when the user is typing in the instant (blur, change)
          // validation fields.
          if (validateOnArg && validateOnArg !== 'submit') {
            validationRulesRef.current[name].validateOn = validateOnArg;
          } else if (!validateOnArg && validateOnProp !== 'submit') {
            validationRulesRef.current[name].validateOn = validateOnProp;
          }
          return function () {
            delete validationRulesRef.current[name].field;
            delete validationRulesRef.current[name].validateOn;
            var requiredFieldIndex = requiredFields.current.indexOf(name);
            if (requiredFieldIndex !== -1) {
              requiredFields.current.splice(requiredFieldIndex, 1);
            }
          };
        }
        return undefined;
      }, [error, name, required, validateArg, disabled, validateOnArg]);
      return {
        error: error,
        info: info,
        inForm: true,
        onBlur: validateOnArg === 'blur' || validateOn[name] === 'blur' ? function () {
          return setPendingValidation(pendingValidation ? [].concat(pendingValidation, [name]) : [name]);
        } : undefined,
        onChange: validateOnArg === 'change' || validateOn[name] === 'change' ? function () {
          return setPendingValidation(pendingValidation ? [].concat(pendingValidation, [name]) : [name]);
        } : undefined
      };
    };
    return {
      useFormField: useFormField,
      useFormInput: useFormInput,
      kind: kind
    };
  }, [onChange, kind, pendingValidation, touched, validateOn, validationResults.errors, validationResults.infos, value, valueProp, validateOnProp]);
  return /*#__PURE__*/_react["default"].createElement("form", _extends({
    ref: formRef
  }, rest, {
    onReset: function onReset(event) {
      sendAnalytics({
        type: 'formReset',
        element: formRef.current,
        data: event,
        errors: analyticsRef.current.errors,
        elapsed: new Date().getTime() - analyticsRef.current.start.getTime()
      });
      setPendingValidation(undefined);
      if (!valueProp) {
        setValueState(defaultValue);
        if (onChange) onChange(defaultValue, {
          touched: defaultTouched
        });
      }
      setTouched(defaultTouched);
      setValidationResults(defaultValidationResults);
      analyticsRef.current = {
        start: new Date(),
        errors: {}
      };
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
      setPendingValidation(undefined);
      // adding validateOn: "submit" prop to the undefined validateOn fields
      // as we want to trigger "submit" validation once form is submitted
      var newValidationRulesRef = Object.keys(validationRulesRef.current).reduce(function (acc, key) {
        acc[key] = validationRulesRef.current[key];
        if (!acc[key].validateOn) {
          acc[key] = _extends({}, validationRulesRef.current[key], {
            validateOn: 'submit'
          });
        }
        return acc;
      }, {});
      var _validateForm2 = validateForm(Object.entries(newValidationRulesRef), value, format, messages, true),
        nextErrors = _validateForm2[0],
        nextInfos = _validateForm2[1];
      setValidationResults(function () {
        var nextValidationResults = {
          errors: nextErrors,
          infos: nextInfos,
          // Show form's validity when clicking on Submit
          valid: buildValid(nextErrors)
        };
        if (onValidate) onValidate(nextValidationResults);
        validationResultsRef.current = nextValidationResults;
        updateAnalytics();
        return nextValidationResults;
      });
      if (Object.keys(nextErrors).length === 0 && _onSubmit) {
        event.persist(); // extract from React's synthetic event pool
        var adjustedEvent = event;
        adjustedEvent.value = value;
        adjustedEvent.touched = touched;
        _onSubmit(adjustedEvent);
        sendAnalytics({
          type: 'formSubmit',
          element: formRef.current,
          data: adjustedEvent,
          errors: analyticsRef.current.errors,
          elapsed: new Date().getTime() - analyticsRef.current.start.getTime()
        });
        analyticsRef.current.errors = {};
        analyticsRef.current.submitted = true;
      }
    }
  }), /*#__PURE__*/_react["default"].createElement(_FormContext.FormContext.Provider, {
    value: formContextValue
  }, children));
});
Form.displayName = 'Form';
Form.propTypes = _propTypes.FormPropTypes;