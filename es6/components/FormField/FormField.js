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

var isGrommetInput = function isGrommetInput(comp) {
  return comp && (grommetInputNames.indexOf(comp.displayName) !== -1 || grommetInputPadNames.indexOf(comp.displayName) !== -1);
};

var FormFieldBox = styled(Box).withConfig({
  displayName: "FormField__FormFieldBox",
  componentId: "m9hood-0"
})(["", ""], function (props) {
  return props.theme.formField && props.theme.formField.extend;
});

var Message = function Message(_ref) {
  var message = _ref.message,
      rest = _objectWithoutPropertiesLoose(_ref, ["message"]);

  if (message) {
    if (typeof message === 'string') return React.createElement(Text, rest, message);
    return React.createElement(Box, rest, message);
  }

  return null;
};

var FormField = forwardRef(function (_ref2, ref) {
  var children = _ref2.children,
      className = _ref2.className,
      component = _ref2.component,
      disabled = _ref2.disabled,
      error = _ref2.error,
      help = _ref2.help,
      htmlFor = _ref2.htmlFor,
      info = _ref2.info,
      label = _ref2.label,
      margin = _ref2.margin,
      name = _ref2.name,
      _onBlur = _ref2.onBlur,
      _onFocus = _ref2.onFocus,
      pad = _ref2.pad,
      required = _ref2.required,
      style = _ref2.style,
      validate = _ref2.validate,
      rest = _objectWithoutPropertiesLoose(_ref2, ["children", "className", "component", "disabled", "error", "help", "htmlFor", "info", "label", "margin", "name", "onBlur", "onFocus", "pad", "required", "style", "validate"]);

  var theme = useContext(ThemeContext);
  var context = useContext(FormContext);
  useEffect(function () {
    if (context && context.addValidation) {
      var addValidation = context.addValidation,
          messages = context.messages,
          removeValidation = context.removeValidation;

      var validateSingle = function validateSingle(aValidate, value2, data) {
        var result;

        if (typeof aValidate === 'function') {
          result = aValidate(value2, data);
        } else if (validate.regexp) {
          if (!validate.regexp.test(value2)) {
            result = validate.message || messages.invalid;

            if (validate.status) {
              result = {
                message: error,
                status: validate.status
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
        } else if (validate) {
          if (Array.isArray(validate)) {
            validate.some(function (aValidate) {
              result = validateSingle(aValidate, value2, data);
              return !!result;
            });
          } else {
            result = validateSingle(validate, value2, data);
          }
        }

        return result;
      };

      if (validate || required) {
        addValidation(name, validateField);
        return function () {
          return removeValidation(name, validateField);
        };
      }

      removeValidation(name, validateField);
    }

    return undefined;
  }, [context, error, name, required, validate]);

  var _useState = useState(),
      focus = _useState[0],
      setFocus = _useState[1];

  var renderInput = function renderInput(formValue, invalid) {
    var Input = component || TextInput;

    if (Input === CheckBox) {
      return React.createElement(Input, _extends({
        name: name,
        label: label,
        disabled: disabled,
        "aria-invalid": invalid || undefined
      }, rest));
    }

    return React.createElement(Input, _extends({
      name: name,
      value: !isGrommetInput(component) ? formValue[name] : undefined,
      disabled: disabled,
      plain: true,
      focusIndicator: false,
      "aria-invalid": invalid || undefined
    }, rest, {
      onChange: // Grommet input components already check for FormContext
      // and, using their `name`, end up calling the context.update()
      // already. For custom components, we expect they will call
      // this onChange() and we'll call context.update() here, primarily
      // for backwards compatibility.
      isGrommetInput(component) ? rest.onChange : function (event) {
        context.update(name, event.target.value);
        if (rest.onChange) rest.onChange(event);
      }
    }));
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
    var errors = context.errors,
        infos = context.infos,
        onContextBlur = context.onBlur,
        formValue = context.value;
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
  }, formField.label), label), React.createElement(Message, _extends({
    message: help
  }, formField.help))) : undefined, contents, React.createElement(Message, _extends({
    message: normalizedError
  }, formField.error)), React.createElement(Message, _extends({
    message: normalizedInfo
  }, formField.info)));
});
FormField.displayName = 'FormField';
var FormFieldDoc;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  FormFieldDoc = require('./doc').doc(FormField);
}

var FormFieldWrapper = FormFieldDoc || FormField;
export { FormFieldWrapper as FormField };