function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { forwardRef, isValidElement, useContext, useState, useRef, useEffect } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { controlBorderStyle, normalizeColor } from '../../utils';
import { defaultProps } from '../../default-props';
import { Box } from '../Box';
import { DropButton } from '../DropButton';
import { Keyboard } from '../Keyboard';
import { FormContext } from '../Form/FormContext';
import { TextInput } from '../TextInput';
import { SelectContainer } from './SelectContainer';
var SelectTextInput = styled(TextInput).withConfig({
  displayName: "Select__SelectTextInput",
  componentId: "sc-17idtfo-0"
})(["cursor:pointer;"]);
var StyledSelectDropButton = styled(DropButton).withConfig({
  displayName: "Select__StyledSelectDropButton",
  componentId: "sc-17idtfo-1"
})(["", ";", ";", ";"], function (props) {
  return !props.plain && controlBorderStyle;
}, function (props) {
  return props.theme.select && props.theme.select.control && props.theme.select.control.extend;
}, function (props) {
  return props.open && props.theme.select.control.open;
});
StyledSelectDropButton.defaultProps = {};
Object.setPrototypeOf(StyledSelectDropButton.defaultProps, defaultProps);
var Select = forwardRef(function (_ref, ref) {
  var a11yTitle = _ref.a11yTitle,
      alignSelf = _ref.alignSelf,
      children = _ref.children,
      _ref$closeOnChange = _ref.closeOnChange,
      closeOnChange = _ref$closeOnChange === void 0 ? true : _ref$closeOnChange,
      disabled = _ref.disabled,
      disabledKey = _ref.disabledKey,
      _ref$dropAlign = _ref.dropAlign,
      dropAlign = _ref$dropAlign === void 0 ? {
    top: 'bottom',
    left: 'left'
  } : _ref$dropAlign,
      dropHeight = _ref.dropHeight,
      dropProps = _ref.dropProps,
      dropTarget = _ref.dropTarget,
      emptySearchMessage = _ref.emptySearchMessage,
      focusIndicator = _ref.focusIndicator,
      gridArea = _ref.gridArea,
      id = _ref.id,
      icon = _ref.icon,
      labelKey = _ref.labelKey,
      margin = _ref.margin,
      _ref$messages = _ref.messages,
      messages = _ref$messages === void 0 ? {
    multiple: 'multiple'
  } : _ref$messages,
      multiple = _ref.multiple,
      name = _ref.name,
      onChange = _ref.onChange,
      onClose = _ref.onClose,
      onKeyDown = _ref.onKeyDown,
      onMore = _ref.onMore,
      onOpen = _ref.onOpen,
      onSearch = _ref.onSearch,
      propOpen = _ref.open,
      options = _ref.options,
      placeholder = _ref.placeholder,
      plain = _ref.plain,
      replace = _ref.replace,
      searchPlaceholder = _ref.searchPlaceholder,
      selected = _ref.selected,
      size = _ref.size,
      valueProp = _ref.value,
      valueKey = _ref.valueKey,
      valueLabel = _ref.valueLabel,
      rest = _objectWithoutPropertiesLoose(_ref, ["a11yTitle", "alignSelf", "children", "closeOnChange", "disabled", "disabledKey", "dropAlign", "dropHeight", "dropProps", "dropTarget", "emptySearchMessage", "focusIndicator", "gridArea", "id", "icon", "labelKey", "margin", "messages", "multiple", "name", "onChange", "onClose", "onKeyDown", "onMore", "onOpen", "onSearch", "open", "options", "placeholder", "plain", "replace", "searchPlaceholder", "selected", "size", "value", "valueKey", "valueLabel"]);

  var theme = useContext(ThemeContext) || defaultProps.theme;
  var inputRef = useRef();
  var formContext = useContext(FormContext);

  var _formContext$useFormC = formContext.useFormContext(name, valueProp),
      value = _formContext$useFormC[0],
      setValue = _formContext$useFormC[1];

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
    if (closeOnChange) onRequestClose();
    setValue(event.value);

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    if (onChange) onChange.apply(void 0, [_extends({}, event, {
      target: inputRef.current
    })].concat(args));
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
  } // const dark = theme.select.background
  // ? colorIsDark(theme.select.background)
  // : theme.dark;


  var iconColor = normalizeColor(theme.select.icons.color || 'control', theme);
  return React.createElement(Keyboard, {
    onDown: onRequestOpen,
    onUp: onRequestOpen
  }, React.createElement(StyledSelectDropButton, {
    ref: ref,
    id: id,
    disabled: disabled === true || undefined,
    dropAlign: dropAlign,
    dropTarget: dropTarget,
    open: open,
    alignSelf: alignSelf,
    focusIndicator: focusIndicator,
    gridArea: gridArea,
    margin: margin,
    onOpen: onRequestOpen,
    onClose: onRequestClose,
    dropContent: React.createElement(SelectContainer, {
      disabled: disabled,
      disabledKey: disabledKey,
      dropHeight: dropHeight,
      emptySearchMessage: emptySearchMessage,
      id: id,
      labelKey: labelKey,
      multiple: multiple,
      name: name,
      onChange: onSelectChange,
      onKeyDown: onKeyDown,
      onMore: onMore,
      onSearch: onSearch,
      options: options,
      replace: replace,
      searchPlaceholder: searchPlaceholder,
      selected: selected,
      value: value,
      valueKey: valueKey
    }, children),
    plain: plain,
    dropProps: dropProps,
    theme: theme
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
    name: name,
    ref: inputRef
  }, rest, {
    tabIndex: "-1",
    type: "text",
    placeholder: placeholder,
    plain: true,
    readOnly: true,
    value: inputValue,
    size: size,
    theme: theme,
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
});
Select.defaultProps = _extends({}, defaultProps);
Select.displayName = 'Select';
var SelectDoc;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  SelectDoc = require('./doc').doc(Select);
}

var SelectWrapper = SelectDoc || Select;
export { SelectWrapper as Select };