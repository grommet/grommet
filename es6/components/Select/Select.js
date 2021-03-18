function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { forwardRef, isValidElement, useCallback, useContext, useMemo, useState, useRef, useEffect } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { controlBorderStyle, normalizeColor } from '../../utils';
import { defaultProps } from '../../default-props';
import { Box } from '../Box';
import { DropButton } from '../DropButton';
import { Keyboard } from '../Keyboard';
import { FormContext } from '../Form/FormContext';
import { TextInput } from '../TextInput';
import { SelectContainer } from './SelectContainer';
import { applyKey } from './utils';
var SelectTextInput = styled(TextInput).withConfig({
  displayName: "Select__SelectTextInput",
  componentId: "sc-17idtfo-0"
})(["cursor:", ";"], function (props) {
  return props.defaultCursor ? 'default' : 'pointer';
});
var StyledSelectDropButton = styled(DropButton).withConfig({
  displayName: "Select__StyledSelectDropButton",
  componentId: "sc-17idtfo-1"
})(["", ";", ";", ";"], function (props) {
  return !props.callerPlain && controlBorderStyle;
}, function (props) {
  return props.theme.select && props.theme.select.control && props.theme.select.control.extend;
}, function (props) {
  return props.open && props.theme.select.control.open;
});
StyledSelectDropButton.defaultProps = {};
Object.setPrototypeOf(StyledSelectDropButton.defaultProps, defaultProps);
var defaultDropAlign = {
  top: 'bottom',
  left: 'left'
};
var defaultMessages = {
  multiple: 'multiple'
};
var Select = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var a11yTitle = _ref.a11yTitle,
      alignSelf = _ref.alignSelf,
      children = _ref.children,
      _ref$clear = _ref.clear,
      clear = _ref$clear === void 0 ? false : _ref$clear,
      _ref$closeOnChange = _ref.closeOnChange,
      closeOnChange = _ref$closeOnChange === void 0 ? true : _ref$closeOnChange,
      defaultValue = _ref.defaultValue,
      disabled = _ref.disabled,
      disabledKey = _ref.disabledKey,
      _ref$dropAlign = _ref.dropAlign,
      dropAlign = _ref$dropAlign === void 0 ? defaultDropAlign : _ref$dropAlign,
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
      messages = _ref$messages === void 0 ? defaultMessages : _ref$messages,
      multiple = _ref.multiple,
      name = _ref.name,
      onChange = _ref.onChange,
      onClick = _ref.onClick,
      onClose = _ref.onClose,
      onKeyDown = _ref.onKeyDown,
      onMore = _ref.onMore,
      onOpen = _ref.onOpen,
      onSearch = _ref.onSearch,
      propOpen = _ref.open,
      optionsProp = _ref.options,
      placeholder = _ref.placeholder,
      plain = _ref.plain,
      replace = _ref.replace,
      searchPlaceholder = _ref.searchPlaceholder,
      selected = _ref.selected,
      size = _ref.size,
      valueProp = _ref.value,
      valueKey = _ref.valueKey,
      valueLabel = _ref.valueLabel,
      rest = _objectWithoutPropertiesLoose(_ref, ["a11yTitle", "alignSelf", "children", "clear", "closeOnChange", "defaultValue", "disabled", "disabledKey", "dropAlign", "dropHeight", "dropProps", "dropTarget", "emptySearchMessage", "focusIndicator", "gridArea", "id", "icon", "labelKey", "margin", "messages", "multiple", "name", "onChange", "onClick", "onClose", "onKeyDown", "onMore", "onOpen", "onSearch", "open", "options", "placeholder", "plain", "replace", "searchPlaceholder", "selected", "size", "value", "valueKey", "valueLabel"]);

  var theme = useContext(ThemeContext) || defaultProps.theme;
  var inputRef = useRef();
  var formContext = useContext(FormContext); // value is used for what we receive in valueProp and the basis for
  // what we send with onChange

  var _formContext$useFormI = formContext.useFormInput(name, valueProp, defaultValue || ''),
      value = _formContext$useFormI[0],
      setValue = _formContext$useFormI[1]; // valuedValue is the value mapped with any valueKey applied


  var valuedValue = useMemo(function () {
    if (Array.isArray(value)) return value.map(function (v) {
      return valueKey && valueKey.reduce ? v : applyKey(v, valueKey);
    });
    return valueKey && valueKey.reduce ? value : applyKey(value, valueKey);
  }, [value, valueKey]); // search input value

  var _useState = useState(),
      search = _useState[0],
      setSearch = _useState[1]; // All select option indices and values


  var _useState2 = useState(optionsProp),
      allOptions = _useState2[0],
      setAllOptions = _useState2[1]; // Track changes to options property, except when options are being
  // updated due to search activity. Allows option's initial index value
  // to be referenced when filtered by search.


  useEffect(function () {
    if (!search) setAllOptions(optionsProp);
  }, [optionsProp, search]); // the option indexes present in the value

  var optionIndexesInValue = useMemo(function () {
    var result = [];
    allOptions.forEach(function (option, index) {
      if (selected !== undefined) {
        if (Array.isArray(selected)) {
          if (selected.indexOf(index) !== -1) result.push(index);
        } else if (index === selected) {
          result.push(index);
        }
      } else if (Array.isArray(valuedValue)) {
        if (valuedValue.some(function (v) {
          return v === applyKey(option, valueKey);
        })) {
          result.push(index);
        }
      } else if (valuedValue === applyKey(option, valueKey)) {
        result.push(index);
      }
    });
    return result;
  }, [allOptions, selected, valueKey, valuedValue]);

  var _useState3 = useState(propOpen),
      open = _useState3[0],
      setOpen = _useState3[1];

  useEffect(function () {
    return setOpen(propOpen);
  }, [propOpen]);
  var onRequestOpen = useCallback(function () {
    if (open) return;
    setOpen(true);
    if (onOpen) onOpen();
  }, [onOpen, open]);
  var onRequestClose = useCallback(function () {
    setOpen(false);
    if (onClose) onClose();
  }, [onClose]);
  var onSelectChange = useCallback(function (event, _ref2) {
    var option = _ref2.option,
        nextValue = _ref2.value,
        nextSelected = _ref2.selected;
    if (closeOnChange) onRequestClose();
    setValue(nextValue);

    if (onChange) {
      event.persist();
      var adjustedEvent = event;
      adjustedEvent.target = inputRef.current;
      adjustedEvent.value = nextValue;
      adjustedEvent.option = option;
      adjustedEvent.selected = nextSelected;
      onChange(adjustedEvent);
    }

    setSearch();
  }, [closeOnChange, onChange, onRequestClose, setValue]);
  var SelectIcon;

  switch (icon) {
    case false:
      break;

    case true:
    case undefined:
      SelectIcon = open && theme.select.icons.up ? theme.select.icons.up : theme.select.icons.down;
      break;

    default:
      SelectIcon = icon;
  } // element to show, trumps inputValue


  var selectValue = useMemo(function () {
    if (valueLabel) return valueLabel;
    if ( /*#__PURE__*/React.isValidElement(value)) return value; // deprecated

    return undefined;
  }, [value, valueLabel]); // text to show

  var inputValue = useMemo(function () {
    if (!selectValue) {
      if (optionIndexesInValue.length === 0) return '';
      if (optionIndexesInValue.length === 1) return applyKey(allOptions[optionIndexesInValue[0]], labelKey);
      return messages.multiple;
    }

    return undefined;
  }, [labelKey, messages, optionIndexesInValue, allOptions, selectValue]);
  var iconColor = normalizeColor(theme.select.icons.color || 'control', theme);
  return /*#__PURE__*/React.createElement(Keyboard, {
    onDown: onRequestOpen,
    onUp: onRequestOpen
  }, /*#__PURE__*/React.createElement(StyledSelectDropButton, {
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
    onClick: onClick,
    dropContent: /*#__PURE__*/React.createElement(SelectContainer, {
      clear: clear,
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
      options: optionsProp,
      allOptions: allOptions,
      optionIndexesInValue: optionIndexesInValue,
      replace: replace,
      searchPlaceholder: searchPlaceholder,
      search: search,
      setSearch: setSearch,
      selected: selected,
      value: value,
      valueKey: valueKey
    }, children) // StyledDropButton needs to know if the border should be shown
    ,
    callerPlain: plain,
    plain: true // Button should be plain
    ,
    dropProps: dropProps,
    theme: theme
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    direction: "row",
    justify: "between",
    background: theme.select.background
  }, /*#__PURE__*/React.createElement(Box, {
    direction: "row",
    flex: true,
    basis: "auto"
  }, selectValue || /*#__PURE__*/React.createElement(SelectTextInput, _extends({
    a11yTitle: a11yTitle && "" + a11yTitle + (value && typeof value === 'string' ? ", " + value : '') // When Select is disabled, we want to show a default cursor
    // but not have disabled styling come from TextInput
    // Disabled can be a bool or an array of options to disable.
    // We only want to disable the TextInput if the control
    // button should be disabled which occurs when disabled
    // equals true.
    ,
    defaultCursor: disabled === true || undefined,
    focusIndicator: false,
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
    theme: theme
  }))), SelectIcon && /*#__PURE__*/React.createElement(Box, {
    margin: theme.select.icons.margin,
    flex: false,
    style: {
      minWidth: 'auto'
    }
  }, /*#__PURE__*/isValidElement(SelectIcon) ? SelectIcon : /*#__PURE__*/React.createElement(SelectIcon, {
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