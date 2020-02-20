function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { Children, cloneElement, forwardRef, useContext, useEffect, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { parseMetricToNum } from '../../utils';
import { Box } from '../Box';
import { CheckBox } from '../CheckBox';
import { RadioButtonGroup } from '../RadioButtonGroup';
import { Text } from '../Text';
import { TextInput } from '../TextInput';
import { FormContext } from '../Form/FormContext';
var grommetInputNames = ['TextInput', 'Select', 'MaskedInput', 'TextArea'];
var grommetInputPadNames = ['CheckBox', 'RadioButtonGroup', 'RangeInput'];

var validateField = function validateField(required, validate, messages) {
  return function (value, data) {
    var error;

    if (required && (value === undefined || value === '')) {
      error = messages.required;
    } else if (validate) {
      if (Array.isArray(validate)) {
        validate.some(function (oneValidate) {
          error = validateField(false, oneValidate, messages)(value, data);
          return !!error;
        });
      } else if (typeof validate === 'function') {
        error = validate(value, data);
      } else if (validate.regexp) {
        if (!validate.regexp.test(value)) {
          error = validate.message || messages.invalid;

          if (validate.status) {
            error = {
              message: error,
              status: validate.status
            };
          }
        }
      }
    }

    return error;
  };
};

var FormFieldBox = styled(Box).withConfig({
  displayName: "FormField__FormFieldBox",
  componentId: "m9hood-0"
})(["", ""], function (props) {
  return props.theme.formField && props.theme.formField.extend;
});
var FormField = forwardRef(function (_ref, ref) {
  var checked = _ref.checked,
      children = _ref.children,
      className = _ref.className,
      component = _ref.component,
      disabled = _ref.disabled,
      error = _ref.error,
      help = _ref.help,
      htmlFor = _ref.htmlFor,
      info = _ref.info,
      label = _ref.label,
      margin = _ref.margin,
      name = _ref.name,
      _onBlur = _ref.onBlur,
      _onFocus = _ref.onFocus,
      pad = _ref.pad,
      required = _ref.required,
      style = _ref.style,
      validate = _ref.validate,
      valueProp = _ref.value,
      rest = _objectWithoutPropertiesLoose(_ref, ["checked", "children", "className", "component", "disabled", "error", "help", "htmlFor", "info", "label", "margin", "name", "onBlur", "onFocus", "pad", "required", "style", "validate", "value"]);

  var theme = useContext(ThemeContext);
  var context = useContext(FormContext);

  var _useState = useState(valueProp),
      value = _useState[0],
      setValue = _useState[1];

  useEffect(function () {
    return setValue(valueProp);
  }, [valueProp]);
  useEffect(function () {
    if (context && context.value && context.value[name] === undefined && (value !== undefined || checked !== undefined)) {
      context.update(name, value !== undefined ? value : checked, true);
    }
  });

  var _useState2 = useState(),
      focus = _useState2[0],
      setFocus = _useState2[1];

  var renderInput = function renderInput(formValue, invalid) {
    var Input = component || TextInput;

    if (Input === CheckBox) {
      return React.createElement(Input, _extends({
        name: name,
        label: label,
        checked: formValue[name] !== undefined ? formValue[name] : checked || false,
        "aria-invalid": invalid || undefined
      }, rest));
    }

    return React.createElement(Input, _extends({
      name: name,
      value: formValue[name] !== undefined ? formValue[name] : valueProp || '',
      plain: true,
      focusIndicator: false,
      "aria-invalid": invalid || undefined
    }, rest));
  };

  var formField = theme.formField;
  var border = formField.border; // This is here for backwards compatibility. In case the child is a grommet
  // input component, set plain and focusIndicator props, if they aren't
  // already set.

  var wantContentPad = component && (component === CheckBox || component === RadioButtonGroup);
  var contents = border && children && Children.map(children, function (child) {
    if (child && child.type && grommetInputPadNames.indexOf(child.type.displayName) !== -1) {
      wantContentPad = true;
    }

    if (child && child.type && grommetInputNames.indexOf(child.type.displayName) !== -1 && child.props.plain === undefined && child.props.focusIndicator === undefined) {
      return cloneElement(child, {
        plain: true,
        focusIndicator: false
      });
    }

    return child;
  }) || children;
  var normalizedError = error;
  var normalizedInfo = info;
  var onFieldBlur; // put rest on container, unless we use renderInput()

  var containerRest = rest;

  if (context && context.addValidation) {
    var addValidation = context.addValidation,
        errors = context.errors,
        infos = context.infos,
        onContextBlur = context.onBlur,
        formValue = context.value,
        messages = context.messages;
    addValidation(name, validateField(required, validate, messages));
    normalizedError = error || errors[name];
    normalizedInfo = info || infos[name];
    if (!contents) containerRest = {};
    contents = contents || renderInput(formValue, !!normalizedError);

    if (onContextBlur) {
      onFieldBlur = function onFieldBlur() {
        return onContextBlur(name);
      };
    }
  }

  var contentProps = pad || wantContentPad ? _extends({}, formField.content) : {};

  if (border.position === 'inner') {
    if (normalizedError && formField.error) {
      contentProps.background = formField.error.background;
    } else if (disabled && formField.disabled) {
      contentProps.background = formField.disabled.background;
    }
  }

  contents = React.createElement(Box, contentProps, contents);
  var borderColor;

  if (focus && !normalizedError) {
    borderColor = 'focus';
  } else if (normalizedError) {
    borderColor = border && border.error.color || 'status-critical';
  } else {
    borderColor = border && border.color || 'border';
  }

  var abut;
  var abutMargin;
  var outerStyle = style;

  if (border) {
    contents = React.createElement(Box, {
      border: border.position === 'inner' ? _extends({}, border, {
        side: border.side || 'bottom',
        color: borderColor
      }) : undefined,
      round: border.position === 'inner' ? formField.round : undefined
    }, contents);
    var mergedMargin = margin || formField.margin;
    abut = border.position === 'outer' && (border.side === 'all' || border.side === 'horizontal' || !border.side) && !(mergedMargin && (typeof mergedMargin === 'string' && mergedMargin !== 'none' || mergedMargin.bottom && mergedMargin.bottom !== 'none' || mergedMargin.horizontal && mergedMargin.horizontal !== 'none'));

    if (abut) {
      // marginBottom is set to overlap adjacent fields
      abutMargin = {
        bottom: '-1px'
      };

      if (margin) {
        abutMargin = margin;
      } else if (border.size) {
        // if the user defines a margin,
        // then the default margin below will be overriden
        abutMargin = {
          bottom: "-" + parseMetricToNum(theme.global.borderSize[border.size] || border.size) + "px"
        };
      }

      outerStyle = _extends({
        position: focus ? 'relative' : undefined,
        zIndex: focus ? 10 : undefined
      }, style);
    }
  }

  var outerBackground;

  if (border.position === 'outer') {
    if (normalizedError && formField.error) {
      outerBackground = formField.error.background;
    } else if (disabled && formField.disabled) {
      outerBackground = formField.disabled.background;
    }
  }

  return React.createElement(FormFieldBox, _extends({
    ref: ref,
    className: className,
    border: border && border.position === 'outer' ? _extends({}, border, {
      color: borderColor
    }) : undefined,
    background: outerBackground,
    margin: abut ? abutMargin : margin || _extends({}, formField.margin),
    round: border.position === 'outer' ? formField.round : undefined,
    style: outerStyle,
    onFocus: function onFocus(event) {
      setFocus(true);
      if (_onFocus) _onFocus(event);
    },
    onBlur: function onBlur(event) {
      setFocus(false);
      if (onFieldBlur) onFieldBlur(event);
      if (_onBlur) _onBlur(event);
    }
  }, containerRest), label && component !== CheckBox || help ? React.createElement(React.Fragment, null, label && component !== CheckBox && React.createElement(Text, _extends({
    as: "label",
    htmlFor: htmlFor
  }, formField.label), label), help && React.createElement(Text, formField.help, help)) : undefined, contents, normalizedError && React.createElement(Text, formField.error, normalizedError), normalizedInfo && React.createElement(Text, formField.info, normalizedInfo));
});
FormField.displayName = 'FormField';
var FormFieldDoc;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  FormFieldDoc = require('./doc').doc(FormField);
}

var FormFieldWrapper = FormFieldDoc || FormField;
export { FormFieldWrapper as FormField };