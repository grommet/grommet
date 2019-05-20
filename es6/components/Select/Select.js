function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { isValidElement, useState, useRef, useEffect } from 'react';
import { compose } from 'recompose';
import styled, { withTheme } from 'styled-components';
import { controlBorderStyle, normalizeColor } from '../../utils';
import { defaultProps } from '../../default-props';
import { Box } from '../Box';
import { DropButton } from '../DropButton';
import { Keyboard } from '../Keyboard';
import { TextInput } from '../TextInput';
import { withForwardRef } from '../hocs';
import { SelectContainer } from './SelectContainer';
var SelectTextInput = styled(TextInput).withConfig({
  displayName: "Select__SelectTextInput",
  componentId: "sc-17idtfo-0"
})(["cursor:pointer;"]);
var StyledSelectDropButton = styled(DropButton).withConfig({
  displayName: "Select__StyledSelectDropButton",
  componentId: "sc-17idtfo-1"
})(["", ";", ";"], function (props) {
  return !props.plain && controlBorderStyle;
}, function (props) {
  return props.theme.select && props.theme.select.control && props.theme.select.control.extend;
});
StyledSelectDropButton.defaultProps = {};
Object.setPrototypeOf(StyledSelectDropButton.defaultProps, defaultProps);

var Select = function Select(props) {
  var a11yTitle = props.a11yTitle,
      alignSelf = props.alignSelf,
      children = props.children,
      closeOnChange = props.closeOnChange,
      disabled = props.disabled,
      dropAlign = props.dropAlign,
      dropProps = props.dropProps,
      dropTarget = props.dropTarget,
      forwardRef = props.forwardRef,
      gridArea = props.gridArea,
      id = props.id,
      icon = props.icon,
      labelKey = props.labelKey,
      margin = props.margin,
      messages = props.messages,
      onChange = props.onChange,
      onClose = props.onClose,
      onOpen = props.onOpen,
      propOpen = props.open,
      options = props.options,
      placeholder = props.placeholder,
      plain = props.plain,
      selected = props.selected,
      size = props.size,
      theme = props.theme,
      value = props.value,
      valueLabel = props.valueLabel,
      rest = _objectWithoutPropertiesLoose(props, ["a11yTitle", "alignSelf", "children", "closeOnChange", "disabled", "dropAlign", "dropProps", "dropTarget", "forwardRef", "gridArea", "id", "icon", "labelKey", "margin", "messages", "onChange", "onClose", "onOpen", "open", "options", "placeholder", "plain", "selected", "size", "theme", "value", "valueLabel"]);

  var inputRef = useRef();

  var _useState = useState(propOpen),
      open = _useState[0],
      setOpen = _useState[1];

  useEffect(function () {
    setOpen(propOpen);
  }, [propOpen]);

  var onRequestOpen = function onRequestOpen() {
    setOpen(true);

    if (onOpen) {
      onOpen();
    }
  };

  var onRequestClose = function onRequestClose() {
    setOpen(false);

    if (onClose) {
      onClose();
    }
  };

  var onSelectChange = function onSelectChange(event) {
    if (closeOnChange) {
      onRequestClose();
    }

    if (onChange) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      onChange.apply(void 0, [_extends({}, event, {
        target: inputRef.current
      })].concat(args));
    }
  };

  var SelectIcon;

  switch (icon) {
    case false:
      break;

    case true:
    case undefined:
      SelectIcon = theme.select.icons.down;
      break;

    default:
      SelectIcon = icon;
  }

  var selectValue;
  var inputValue = '';

  if (valueLabel) {
    selectValue = valueLabel;
  } else if (Array.isArray(value)) {
    if (value.length > 1) {
      if (React.isValidElement(value[0])) {
        selectValue = value;
      } else {
        inputValue = messages.multiple;
      }
    } else if (value.length === 1) {
      if (React.isValidElement(value[0])) {
        selectValue = value[0];
      } else if (labelKey && typeof value[0] === 'object') {
        if (typeof labelKey === 'function') {
          inputValue = labelKey(value[0]);
        } else {
          inputValue = value[0][labelKey];
        }
      } else {
        inputValue = value[0];
      }
    } else {
      inputValue = '';
    }
  } else if (labelKey && typeof value === 'object') {
    if (typeof labelKey === 'function') {
      inputValue = labelKey(value);
    } else {
      inputValue = value[labelKey];
    }
  } else if (React.isValidElement(value)) {
    selectValue = value; // deprecated in favor of valueLabel
  } else if (selected !== undefined) {
    if (Array.isArray(selected)) {
      if (selected.length > 1) {
        inputValue = messages.multiple;
      } else if (selected.length === 1) {
        inputValue = options[selected[0]];
      }
    } else {
      inputValue = options[selected];
    }
  } else {
    inputValue = value;
  } // const dark = theme.select.background ? colorIsDark(theme.select.background) : theme.dark;


  var iconColor = normalizeColor(theme.select.icons.color || 'control', theme);
  delete rest.onSearch;
  return React.createElement(Keyboard, {
    onDown: onRequestOpen,
    onUp: onRequestOpen
  }, React.createElement(StyledSelectDropButton, {
    ref: forwardRef,
    id: id,
    disabled: disabled === true || undefined,
    dropAlign: dropAlign,
    dropTarget: dropTarget,
    open: open,
    alignSelf: alignSelf,
    gridArea: gridArea,
    margin: margin,
    onOpen: onRequestOpen,
    onClose: onRequestClose,
    dropContent: React.createElement(SelectContainer, _extends({}, props, {
      onChange: onSelectChange
    })),
    plain: plain,
    dropProps: _extends({}, dropProps)
  }, React.createElement(Box, {
    align: "center",
    direction: "row",
    justify: "between",
    background: theme.select.background
  }, React.createElement(Box, {
    direction: "row",
    flex: true,
    basis: "auto"
  }, selectValue || React.createElement(SelectTextInput, _extends({
    a11yTitle: a11yTitle && "" + a11yTitle + (typeof value === 'string' ? ", " + value : ''),
    id: id ? id + "__input" : undefined,
    ref: inputRef
  }, rest, {
    tabIndex: "-1",
    type: "text",
    placeholder: placeholder,
    plain: true,
    readOnly: true,
    value: inputValue,
    size: size,
    onClick: disabled === true ? undefined : onRequestOpen
  }))), SelectIcon && React.createElement(Box, {
    margin: theme.select.icons.margin,
    flex: false,
    style: {
      minWidth: 'auto'
    }
  }, isValidElement(SelectIcon) ? SelectIcon : React.createElement(SelectIcon, {
    color: iconColor,
    size: size
  })))));
};

Select.defaultProps = _extends({
  closeOnChange: true,
  dropAlign: {
    top: 'bottom',
    left: 'left'
  },
  messages: {
    multiple: 'multiple'
  }
}, defaultProps);
var SelectDoc;

if (process.env.NODE_ENV !== 'production') {
  SelectDoc = require('./doc').doc(Select); // eslint-disable-line global-require
}

var SelectWrapper = compose(withTheme, withForwardRef)(SelectDoc || Select);
export { SelectWrapper as Select };