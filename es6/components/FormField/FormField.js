function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { Children, cloneElement, forwardRef, useContext, useEffect, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { defaultProps } from '../../default-props';
import { focusStyle, parseMetricToNum } from '../../utils';
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
})(["", " ", ""], function (props) {
  return props.focus && focusStyle({
    justBorder: true
  });
}, function (props) {
  return props.theme.formField && props.theme.formField.extend;
});
var FormFieldContentBox = styled(Box).withConfig({
  displayName: "FormField__FormFieldContentBox",
  componentId: "m9hood-1"
})(["", ""], function (props) {
  return props.focus && focusStyle({
    justBorder: true
  });
});

var Message = function Message(_ref) {
  var message = _ref.message,
      rest = _objectWithoutPropertiesLoose(_ref, ["message"]);

  if (message) {
    if (typeof message === 'string') return /*#__PURE__*/React.createElement(Text, rest, message);
    return /*#__PURE__*/React.createElement(Box, rest, message);
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

  var theme = useContext(ThemeContext) || defaultProps.theme;
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
      return /*#__PURE__*/React.createElement(Input, _extends({
        name: name,
        label: label,
        disabled: disabled,
        "aria-invalid": invalid || undefined
      }, rest));
    }

    return /*#__PURE__*/React.createElement(Input, _extends({
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

  var formFieldTheme = theme.formField;
  var themeBorder = formFieldTheme.border; // This is here for backwards compatibility. In case the child is a grommet
  // input component, set plain and focusIndicator props, if they aren't
  // already set.

  var wantContentPad = component && (component === CheckBox || component === RadioButtonGroup);
  var contents = themeBorder && children && Children.map(children, function (child) {
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

  var contentProps = pad || wantContentPad ? _extends({}, formFieldTheme.content) : {};

  if (themeBorder.position === 'inner') {
    if (normalizedError && formFieldTheme.error) {
      contentProps.background = formFieldTheme.error.background;
    } else if (disabled && formFieldTheme.disabled) {
      contentProps.background = formFieldTheme.disabled.background;
    }
  }

  contents = /*#__PURE__*/React.createElement(Box, contentProps, contents);
  var borderColor;

  if (disabled && formFieldTheme.disabled.border && formFieldTheme.disabled.border.color) {
    borderColor = formFieldTheme.disabled.border.color;
  } else if (normalizedError && themeBorder && themeBorder.error.color) {
    borderColor = themeBorder.error.color || 'status-critical';
  } else if (focus && formFieldTheme.focus && formFieldTheme.focus.border && formFieldTheme.focus.border.color) {
    borderColor = formFieldTheme.focus.border.color;
  } else {
    borderColor = themeBorder && themeBorder.color || 'border';
  }

  var labelStyle = _extends({}, formFieldTheme.label);

  if (disabled) {
    labelStyle.color = formFieldTheme.disabled && formFieldTheme.disabled.label ? formFieldTheme.disabled.label.color : labelStyle.color;
  }

  var abut;
  var abutMargin;
  var outerStyle = style;

  if (themeBorder) {
    var innerProps = themeBorder.position === 'inner' ? {
      border: _extends(_extends({}, themeBorder), {}, {
        side: themeBorder.side || 'bottom',
        color: borderColor
      }),
      round: formFieldTheme.round,
      focus: focus
    } : {};
    contents = /*#__PURE__*/React.createElement(FormFieldContentBox, _extends({
      overflow: "hidden"
    }, innerProps), contents);
    var mergedMargin = margin || formFieldTheme.margin;
    abut = themeBorder.position === 'outer' && (themeBorder.side === 'all' || themeBorder.side === 'horizontal' || !themeBorder.side) && !(mergedMargin && (typeof mergedMargin === 'string' && mergedMargin !== 'none' || mergedMargin.bottom && mergedMargin.bottom !== 'none' || mergedMargin.horizontal && mergedMargin.horizontal !== 'none'));

    if (abut) {
      // marginBottom is set to overlap adjacent fields
      abutMargin = {
        bottom: '-1px'
      };

      if (margin) {
        abutMargin = margin;
      } else if (themeBorder.size) {
        // if the user defines a margin,
        // then the default margin below will be overridden
        abutMargin = {
          bottom: "-" + parseMetricToNum(theme.global.borderSize[themeBorder.size] || themeBorder.size) + "px"
        };
      }

      outerStyle = _extends({
        position: focus ? 'relative' : undefined,
        zIndex: focus ? 10 : undefined
      }, style);
    }
  }

  var outerBackground;

  if (themeBorder.position === 'outer') {
    if (normalizedError && formFieldTheme.error && formFieldTheme.error.background) {
      outerBackground = formFieldTheme.error.background;
    } else if (focus && formFieldTheme.focus && formFieldTheme.focus.background && formFieldTheme.focus.background.color) {
      outerBackground = formFieldTheme.focus.background.color;
    } else if (disabled && formFieldTheme.disabled && formFieldTheme.disabled.background) {
      outerBackground = formFieldTheme.disabled.background;
    }
  }

  var outerProps = themeBorder && themeBorder.position === 'outer' ? {
    border: _extends(_extends({}, themeBorder), {}, {
      color: borderColor
    }),
    round: formFieldTheme.round,
    focus: focus
  } : {};
  return /*#__PURE__*/React.createElement(FormFieldBox, _extends({
    ref: ref,
    className: className,
    background: outerBackground,
    margin: abut ? abutMargin : margin || _extends({}, formFieldTheme.margin)
  }, outerProps, {
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
  }, containerRest), label && component !== CheckBox || help ? /*#__PURE__*/React.createElement(React.Fragment, null, label && component !== CheckBox && /*#__PURE__*/React.createElement(Text, _extends({
    as: "label",
    htmlFor: htmlFor
  }, labelStyle), label), /*#__PURE__*/React.createElement(Message, _extends({
    message: help
  }, formFieldTheme.help))) : undefined, contents, /*#__PURE__*/React.createElement(Message, _extends({
    message: normalizedError
  }, formFieldTheme.error)), /*#__PURE__*/React.createElement(Message, _extends({
    message: normalizedInfo
  }, formFieldTheme.info)));
});
FormField.displayName = 'FormField';
var FormFieldDoc;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  FormFieldDoc = require('./doc').doc(FormField);
}

var FormFieldWrapper = FormFieldDoc || FormField;
export { FormFieldWrapper as FormField };