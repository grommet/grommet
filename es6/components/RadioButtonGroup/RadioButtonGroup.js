function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { forwardRef, useContext, useEffect, useRef, useState } from 'react';
import { ThemeContext } from 'styled-components';
import { FormContext } from '../Form/FormContext';
import { defaultProps } from '../../default-props';
import { Keyboard } from '../Keyboard';
import { Box } from '../Box';
import { RadioButton } from '../RadioButton';
var RadioButtonGroup = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var children = _ref.children,
      disabled = _ref.disabled,
      name = _ref.name,
      _onChange = _ref.onChange,
      optionsProp = _ref.options,
      valueProp = _ref.value,
      gap = _ref.gap,
      rest = _objectWithoutPropertiesLoose(_ref, ["children", "disabled", "name", "onChange", "options", "value", "gap"]);

  var formContext = useContext(FormContext);
  var theme = useContext(ThemeContext) || defaultProps.theme; // normalize options to always use an object

  var options = optionsProp.map(function (o) {
    return typeof o !== 'object' ? {
      disabled: disabled,
      id: rest.id ? rest.id + "-" + o : "" + o,
      // force string
      label: typeof o !== 'string' ? JSON.stringify(o) : o,
      value: o
    } : _extends({
      disabled: disabled
    }, o);
  });

  var _formContext$useFormI = formContext.useFormInput(name, valueProp, ''),
      value = _formContext$useFormI[0],
      setValue = _formContext$useFormI[1];

  var _useState = useState(),
      focus = _useState[0],
      setFocus = _useState[1];

  var optionRefs = useRef([]);
  var valueIndex = React.useMemo(function () {
    var result;
    options.some(function (option, index) {
      if (option.value === value) {
        result = index;
        return true;
      }

      return false;
    });
    return result;
  }, [options, value]);
  useEffect(function () {
    if (focus && valueIndex >= 0) optionRefs.current[valueIndex].focus();
  }, [focus, valueIndex]);

  var onNext = function onNext() {
    if (valueIndex !== undefined && valueIndex < options.length - 1) {
      var nextIndex = valueIndex + 1;
      var nextValue = options[nextIndex].value;
      setValue(nextValue);
      if (_onChange) _onChange({
        target: {
          value: nextValue
        }
      });
    }
  };

  var onPrevious = function onPrevious() {
    if (valueIndex > 0) {
      var nextIndex = valueIndex - 1;
      var nextValue = options[nextIndex].value;
      setValue(nextValue);
      if (_onChange) _onChange({
        target: {
          value: nextValue
        }
      });
    }
  };

  var onFocus = function onFocus() {
    // Delay just a wee bit so Chrome doesn't missing turning the button on.
    // Chrome behaves differently in that focus is given to radio buttons
    // when the user selects one, unlike Safari and Firefox.
    setTimeout(function () {
      return !focus && setFocus(true);
    }, 1);
  };

  var onBlur = function onBlur() {
    return focus && setFocus(false);
  };

  return /*#__PURE__*/React.createElement(Keyboard, {
    target: "document",
    onUp: focus ? onPrevious : undefined,
    onDown: focus ? onNext : undefined,
    onLeft: focus ? onPrevious : undefined,
    onRight: focus ? onNext : undefined
  }, /*#__PURE__*/React.createElement(Box, _extends({
    ref: ref
  }, theme.radioButtonGroup.container, {
    gap: gap || (theme.radioButtonGroup.container && theme.radioButtonGroup.container.gap ? theme.radioButtonGroup.container.gap : 'small')
  }, rest), options.map(function (_ref2, index) {
    var optionDisabled = _ref2.disabled,
        id = _ref2.id,
        label = _ref2.label,
        optionValue = _ref2.value,
        optionRest = _objectWithoutPropertiesLoose(_ref2, ["disabled", "id", "label", "value"]);

    return /*#__PURE__*/React.createElement(RadioButton, _extends({
      ref: function ref(aRef) {
        optionRefs.current[index] = aRef;
      },
      key: optionValue,
      name: name,
      label: !children ? label : undefined,
      disabled: optionDisabled,
      checked: optionValue === value,
      focus: focus && (optionValue === value || value === undefined && !index),
      id: id,
      value: optionValue,
      onFocus: onFocus,
      onBlur: onBlur,
      onChange: function onChange(event) {
        setValue(optionValue);
        if (_onChange) _onChange(event);
      }
    }, optionRest), children ? function (state) {
      return children(optionsProp[index], state);
    } : null);
  })));
});
RadioButtonGroup.displayName = 'RadioButtonGroup';
var RadioButtonGroupDoc;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  RadioButtonGroupDoc = require('./doc').doc(RadioButtonGroup);
}

var RadioButtonGroupWrapper = RadioButtonGroupDoc || RadioButtonGroup;
export { RadioButtonGroupWrapper as RadioButtonGroup };