function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { Children, cloneElement, forwardRef, useContext, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { defaultProps } from '../../default-props';
import { focusStyle, parseMetricToNum } from '../../utils';
import { Box } from '../Box';
import { CheckBox } from '../CheckBox';
import { CheckBoxGroup } from '../CheckBoxGroup';
import { RadioButtonGroup } from '../RadioButtonGroup';
import { Text } from '../Text';
import { TextInput } from '../TextInput';
import { FormContext } from '../Form/FormContext';
var grommetInputNames = ['TextInput', 'Select', 'MaskedInput', 'TextArea', 'DateInput'];
var grommetInputPadNames = ['CheckBox', 'CheckBoxGroup', 'RadioButtonGroup', 'RangeInput'];

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

var Input = function Input(_ref2) {
  var component = _ref2.component,
      disabled = _ref2.disabled,
      invalid = _ref2.invalid,
      name = _ref2.name,
      _onChange = _ref2.onChange,
      rest = _objectWithoutPropertiesLoose(_ref2, ["component", "disabled", "invalid", "name", "onChange"]);

  var formContext = useContext(FormContext);

  var _formContext$useFormI = formContext.useFormInput(name, rest.value),
      value = _formContext$useFormI[0],
      setValue = _formContext$useFormI[1];

  var InputComponent = component || TextInput; // Grommet input components already check for FormContext
  // and, using their `name`, end up calling the useFormInput.setValue()
  // already. For custom components, we expect they will call
  // this onChange() and we'll call setValue() here, primarily
  // for backwards compatibility.

  var extraProps = isGrommetInput(InputComponent) ? {
    focusIndicator: false,
    onChange: _onChange,
    plain: true
  } : {
    value: value,
    onChange: function onChange(event) {
      setValue(event.value !== undefined ? event.value : event.target.value);
      if (_onChange) _onChange(event);
    }
  };
  return /*#__PURE__*/React.createElement(InputComponent, _extends({
    name: name,
    disabled: disabled,
    "aria-invalid": invalid || undefined
  }, rest, extraProps));
};

var FormField = /*#__PURE__*/forwardRef(function (_ref3, ref) {
  var children = _ref3.children,
      className = _ref3.className,
      component = _ref3.component,
      contentProps = _ref3.contentProps,
      disabled = _ref3.disabled,
      errorProp = _ref3.error,
      help = _ref3.help,
      htmlFor = _ref3.htmlFor,
      infoProp = _ref3.info,
      label = _ref3.label,
      margin = _ref3.margin,
      name = _ref3.name,
      _onBlur = _ref3.onBlur,
      _onFocus = _ref3.onFocus,
      pad = _ref3.pad,
      required = _ref3.required,
      style = _ref3.style,
      validate = _ref3.validate,
      rest = _objectWithoutPropertiesLoose(_ref3, ["children", "className", "component", "contentProps", "disabled", "error", "help", "htmlFor", "info", "label", "margin", "name", "onBlur", "onFocus", "pad", "required", "style", "validate"]);

  var theme = useContext(ThemeContext) || defaultProps.theme;
  var formContext = useContext(FormContext);

  var _formContext$useFormF = formContext.useFormField({
    error: errorProp,
    info: infoProp,
    name: name,
    required: required,
    validate: validate
  }),
      error = _formContext$useFormF.error,
      info = _formContext$useFormF.info,
      inForm = _formContext$useFormF.inForm,
      contextOnBlur = _formContext$useFormF.onBlur;

  var _useState = useState(),
      focus = _useState[0],
      setFocus = _useState[1];

  var formFieldTheme = theme.formField;
  var themeBorder = formFieldTheme.border; // This is here for backwards compatibility. In case the child is a grommet
  // input component, set plain and focusIndicator props, if they aren't
  // already set.

  var wantContentPad = component && (component === CheckBox || component === CheckBoxGroup || component === RadioButtonGroup);
  var contents = themeBorder && children && Children.map(children, function (child) {
    if (child && child.type && grommetInputPadNames.indexOf(child.type.displayName) !== -1) {
      wantContentPad = true;
    }

    if (child && child.type && grommetInputNames.indexOf(child.type.displayName) !== -1 && child.props.plain === undefined && child.props.focusIndicator === undefined) {
      return /*#__PURE__*/cloneElement(child, {
        plain: true,
        focusIndicator: false
      });
    }

    return child;
  }) || children; // put rest on container, unless we use internal Input

  var containerRest = rest;

  if (inForm) {
    if (!contents) containerRest = {};
    contents = contents || /*#__PURE__*/React.createElement(Input, _extends({
      component: component,
      disabled: disabled,
      invalid: !!error,
      name: name,
      label: component === CheckBox ? label : undefined
    }, rest));
  }

  var themeContentProps = _extends({}, formFieldTheme.content);

  if (!pad && !wantContentPad) {
    themeContentProps.pad = undefined;
  }

  if (themeBorder && themeBorder.position === 'inner') {
    if (error && formFieldTheme.error) {
      themeContentProps.background = formFieldTheme.error.background;
    } else if (disabled && formFieldTheme.disabled) {
      themeContentProps.background = formFieldTheme.disabled.background;
    }
  }

  if (!themeBorder) {
    contents = /*#__PURE__*/React.createElement(Box, _extends({}, themeContentProps, contentProps), contents);
  }

  var borderColor;

  if (disabled && formFieldTheme.disabled.border && formFieldTheme.disabled.border.color) {
    borderColor = formFieldTheme.disabled.border.color;
  } else if (error && themeBorder && themeBorder.error.color) {
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
      border: _extends({}, themeBorder, {
        side: themeBorder.side || 'bottom',
        color: borderColor
      }),
      round: formFieldTheme.round,
      focus: focus
    } : {};
    contents = /*#__PURE__*/React.createElement(FormFieldContentBox, _extends({}, themeContentProps, innerProps, contentProps), contents);
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

  if (themeBorder && themeBorder.position === 'outer') {
    if (error && formFieldTheme.error && formFieldTheme.error.background) {
      outerBackground = formFieldTheme.error.background;
    } else if (focus && formFieldTheme.focus && formFieldTheme.focus.background && formFieldTheme.focus.background.color) {
      outerBackground = formFieldTheme.focus.background.color;
    } else if (disabled && formFieldTheme.disabled && formFieldTheme.disabled.background) {
      outerBackground = formFieldTheme.disabled.background;
    }
  }

  var outerProps = themeBorder && themeBorder.position === 'outer' ? {
    border: _extends({}, themeBorder, {
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
      if (contextOnBlur) contextOnBlur(event);
      if (_onBlur) _onBlur(event);
    }
  }, containerRest), label && component !== CheckBox || help ? /*#__PURE__*/React.createElement(React.Fragment, null, label && component !== CheckBox && /*#__PURE__*/React.createElement(Text, _extends({
    as: "label",
    htmlFor: htmlFor
  }, labelStyle), label), /*#__PURE__*/React.createElement(Message, _extends({
    message: help
  }, formFieldTheme.help))) : undefined, contents, /*#__PURE__*/React.createElement(Message, _extends({
    message: error
  }, formFieldTheme.error)), /*#__PURE__*/React.createElement(Message, _extends({
    message: info
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