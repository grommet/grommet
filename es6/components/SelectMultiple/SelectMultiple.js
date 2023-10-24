var _excluded = ["a11yTitle", "aria-label", "alignSelf", "children", "defaultValue", "disabled", "disabledKey", "dropAlign", "dropHeight", "dropProps", "dropTarget", "emptySearchMessage", "focusIndicator", "gridArea", "help", "id", "icon", "labelKey", "limit", "margin", "messages", "name", "onBlur", "onChange", "onClick", "onClose", "onFocus", "onKeyDown", "onMore", "onOpen", "onSearch", "open", "options", "placeholder", "plain", "replace", "searchPlaceholder", "size", "sortSelectedOnClose", "value", "valueKey", "valueLabel", "showSelectedInline", "width"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React, { forwardRef, isValidElement, useCallback, useContext, useMemo, useState, useRef, useEffect } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { controlBorderStyle, useKeyboard, useForwardedRef } from '../../utils';
import { defaultProps } from '../../default-props';
import { Box } from '../Box';
import { DropButton } from '../DropButton';
import { Keyboard } from '../Keyboard';
import { FormContext } from '../Form/FormContext';
import { SelectMultipleValue } from './SelectMultipleValue';
import { SelectMultipleContainer } from './SelectMultipleContainer';
import { HiddenInput, SelectTextInput, StyledSelectDropButton } from '../Select/StyledSelect';
import { applyKey, getNormalizedValue, changeEvent, getSelectIcon, getIconColor, getDisplayLabelKey, arrayIncludes } from '../Select/utils';
import { DefaultSelectTextInput } from '../Select/DefaultSelectTextInput';
import { MessageContext } from '../../contexts/MessageContext';
import { SelectMultiplePropTypes } from './propTypes';
var StyledSelectBox = styled(Box).withConfig({
  displayName: "SelectMultiple__StyledSelectBox",
  componentId: "sc-18zwyth-0"
})(["", ";", ";", ";"], function (props) {
  return !props.plainSelect && controlBorderStyle;
}, function (props) {
  var _props$theme$select;
  return (_props$theme$select = props.theme.select) == null || (_props$theme$select = _props$theme$select.control) == null ? void 0 : _props$theme$select.extend;
}, function (props) {
  var _props$theme$select$c;
  return props.open && ((_props$theme$select$c = props.theme.select.control) == null ? void 0 : _props$theme$select$c.open);
});
StyledSelectDropButton.defaultProps = {};
Object.setPrototypeOf(StyledSelectDropButton.defaultProps, defaultProps);
var SelectMultiple = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var a11yTitle = _ref.a11yTitle,
    ariaLabel = _ref['aria-label'],
    alignSelf = _ref.alignSelf,
    children = _ref.children,
    defaultValue = _ref.defaultValue,
    disabled = _ref.disabled,
    disabledKey = _ref.disabledKey,
    dropAlignProp = _ref.dropAlign,
    dropHeight = _ref.dropHeight,
    dropProps = _ref.dropProps,
    dropTarget = _ref.dropTarget,
    emptySearchMessage = _ref.emptySearchMessage,
    focusIndicator = _ref.focusIndicator,
    gridArea = _ref.gridArea,
    help = _ref.help,
    id = _ref.id,
    icon = _ref.icon,
    labelKey = _ref.labelKey,
    limit = _ref.limit,
    margin = _ref.margin,
    messages = _ref.messages,
    name = _ref.name,
    onBlur = _ref.onBlur,
    onChange = _ref.onChange,
    onClick = _ref.onClick,
    onClose = _ref.onClose,
    onFocus = _ref.onFocus,
    onKeyDown = _ref.onKeyDown,
    onMore = _ref.onMore,
    onOpen = _ref.onOpen,
    onSearch = _ref.onSearch,
    openProp = _ref.open,
    optionsProp = _ref.options,
    placeholder = _ref.placeholder,
    plain = _ref.plain,
    replace = _ref.replace,
    searchPlaceholder = _ref.searchPlaceholder,
    size = _ref.size,
    _ref$sortSelectedOnCl = _ref.sortSelectedOnClose,
    sortSelectedOnClose = _ref$sortSelectedOnCl === void 0 ? true : _ref$sortSelectedOnCl,
    valueProp = _ref.value,
    valueKey = _ref.valueKey,
    valueLabel = _ref.valueLabel,
    _ref$showSelectedInli = _ref.showSelectedInline,
    showSelectedInline = _ref$showSelectedInli === void 0 ? false : _ref$showSelectedInli,
    width = _ref.width,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var theme = useContext(ThemeContext) || defaultProps.theme;
  var inputRef = useRef();
  var formContext = useContext(FormContext);
  var _useContext = useContext(MessageContext),
    format = _useContext.format;
  var selectBoxRef = useRef();
  var dropButtonRef = useForwardedRef(ref);
  var usingKeyboard = useKeyboard();
  var dropAlign = useMemo(function () {
    return dropAlignProp || (showSelectedInline ? {
      top: 'top',
      right: 'right',
      left: 'left'
    } : {
      top: 'bottom',
      left: 'left'
    });
  }, [dropAlignProp, showSelectedInline]);

  // value is used for what we receive in valueProp and the basis for
  // what we send with onChange
  // When 'valueKey' sets 'reduce', the value(s) here should match
  // what the 'valueKey' would return for the corresponding
  // selected option object.
  // Otherwise, the value(s) should match the selected options.

  var _formContext$useFormI = formContext.useFormInput({
      name: name,
      value: valueProp,
      initialValue: defaultValue || ''
    }),
    value = _formContext$useFormI[0],
    setValue = _formContext$useFormI[1];

  // normalizedValue is the value mapped with any valueKey applied
  // When the options array contains objects, this property indicates how
  // to retrieve the value of each option.
  // If a string is provided, it is used as the key to retrieve a
  // property of an option object.
  // If a function is provided, it is called with the option and should
  // return the value.
  // If reduce is true, this value will be used for the 'value'
  // delivered via 'onChange'.
  var normalizedValue = useMemo(function () {
    return getNormalizedValue(value, valueKey);
  }, [value, valueKey]);
  // search input value
  var _useState = useState(),
    search = _useState[0],
    setSearch = _useState[1];
  // All select option indices and values
  var _useState2 = useState(optionsProp),
    allOptions = _useState2[0],
    setAllOptions = _useState2[1];
  var _useState3 = useState(),
    orderedOptions = _useState3[0],
    setOrderedOptions = _useState3[1];
  // Track changes to options property, except when options are being
  // updated due to search activity. Allows option's initial index value
  // to be referenced when filtered by search.
  useEffect(function () {
    if (!search) setAllOptions(optionsProp);
  }, [optionsProp, search]);
  useEffect(function () {
    if (sortSelectedOnClose) setOrderedOptions(optionsProp);
  }, [optionsProp, sortSelectedOnClose]);

  // the option indexes present in the value
  var optionIndexesInValue = useMemo(function () {
    var result = [];
    allOptions.forEach(function (option, index) {
      if (normalizedValue != null && normalizedValue.some != null && normalizedValue.some(function (v) {
        return v === applyKey(option, valueKey);
      })) {
        result.push(index);
      }
    });
    return result;
  }, [allOptions, valueKey, normalizedValue]);
  var _useState4 = useState(openProp),
    open = _useState4[0],
    setOpen = _useState4[1];
  useEffect(function () {
    return setOpen(openProp);
  }, [openProp]);
  var onRequestOpen = useCallback(function () {
    if (open) return;
    setOpen(true);
    if (onOpen) onOpen();
  }, [onOpen, open]);

  // On drop close if sortSelectedOnClose is true, sort options so that
  // selected options appear first, followed by unselected options.
  useEffect(function () {
    if (sortSelectedOnClose && value && !open) {
      var selectedOptions = optionsProp.filter(function (option) {
        return arrayIncludes(value, valueKey && valueKey.reduce ? applyKey(option, valueKey) : option, valueKey || labelKey);
      });
      var unselectedOptions = optionsProp.filter(function (i) {
        return !arrayIncludes(selectedOptions, i, valueKey || labelKey);
      });
      var nextOrderedOptions = selectedOptions.concat(unselectedOptions);
      setOrderedOptions(nextOrderedOptions);
    }
  }, [labelKey, open, sortSelectedOnClose, optionsProp, value, valueKey]);
  var onRequestClose = useCallback(function () {
    setOpen(false);
    if (onClose) onClose();
    setSearch();
  }, [onClose]);
  var triggerChangeEvent = useCallback(function (nextValue) {
    return changeEvent(inputRef, nextValue);
  }, []);
  var onSelectChange = useCallback(function (event, _ref2) {
    var option = _ref2.option,
      nextValue = _ref2.value;
    // nextValue must not be of type object to set value directly on the
    // input. if it is an object, then the user has not provided necessary
    // props to reduce object option
    if (typeof nextValue !== 'object' && nextValue !== event.target.value && inputRef.current) {
      // select registers changing option as a click event or keydown.
      // when in a form, we need to programatically trigger a change
      // event in order for the change event to be registered upstream
      // necessary for change validation in form
      triggerChangeEvent(nextValue);
    }
    setValue(nextValue);
    if (onChange) {
      event.persist();
      var adjustedEvent;
      // support for native event used by Preact
      if (event instanceof Event) {
        adjustedEvent = new event.constructor(event.type, event);
        Object.defineProperties(adjustedEvent, {
          target: {
            value: inputRef.current
          },
          value: {
            value: nextValue
          },
          option: {
            value: option
          }
        });
      } else {
        adjustedEvent = event;
        adjustedEvent.target = inputRef.current;
        adjustedEvent.value = nextValue;
        adjustedEvent.option = option;
      }
      onChange(adjustedEvent);
    }
  }, [onChange, setValue, triggerChangeEvent]);
  var SelectIcon = getSelectIcon(icon, theme, open);

  // element to show, trumps inputValue
  var selectValue = useMemo(function () {
    var result;
    if (valueLabel) {
      result = value && valueLabel instanceof Function ? valueLabel(value) : valueLabel;
    } else if ((value == null ? void 0 : value.length) > 0 && showSelectedInline) {
      result = /*#__PURE__*/React.createElement(SelectMultipleValue, {
        allOptions: allOptions,
        disabled: disabled,
        disabledKey: disabledKey,
        dropButtonRef: dropButtonRef,
        labelKey: labelKey,
        onRequestOpen: onRequestOpen,
        onSelectChange: onSelectChange,
        theme: theme,
        value: value,
        valueKey: valueKey
      }, children);
    }
    return result;
  }, [valueKey, value, valueLabel, showSelectedInline, onRequestOpen, allOptions, children, labelKey, onSelectChange, disabled, disabledKey, dropButtonRef, theme]);
  var displayLabelKey = useMemo(function () {
    return getDisplayLabelKey(labelKey, allOptions, optionIndexesInValue, selectValue);
  }, [labelKey, allOptions, optionIndexesInValue, selectValue]);

  // text to show
  // When the options array contains objects, this property indicates how
  // to retrieve the value of each option.
  // If a string is provided, it is used as the key to retrieve a
  // property of an option object.
  // If a function is provided, it is called with the option and should
  // return the value.
  // If reduce is true, this value will be used for the 'value'
  // delivered via 'onChange'.
  var inputValue = useMemo(function () {
    if (!selectValue) {
      if (optionIndexesInValue.length === 0) return '';
      if (optionIndexesInValue.length === 1) return applyKey(allOptions[optionIndexesInValue[0]], labelKey);
      if (messages) return format({
        id: 'select.multiple',
        messages: messages
      });
      return optionIndexesInValue.length + " selected";
    }
    return undefined;
  }, [labelKey, messages, format, optionIndexesInValue, allOptions, selectValue]);
  var iconColor = getIconColor(theme);
  var displaySelectIcon = SelectIcon && /*#__PURE__*/React.createElement(Box, {
    alignSelf: "center",
    margin: theme.select.icons.margin,
    width: {
      min: 'auto'
    }
  }, /*#__PURE__*/isValidElement(SelectIcon) ? SelectIcon : /*#__PURE__*/React.createElement(SelectIcon, {
    color: iconColor,
    size: size
  }));
  var dropContent = /*#__PURE__*/React.createElement(SelectMultipleContainer, {
    allOptions: allOptions,
    disabled: disabled,
    disabledKey: disabledKey,
    dropHeight: dropHeight,
    emptySearchMessage: emptySearchMessage,
    help: help,
    icon: displaySelectIcon,
    id: id,
    labelKey: labelKey,
    limit: limit,
    onChange: onSelectChange,
    onClose: onRequestClose,
    onKeyDown: onKeyDown,
    onMore: onMore,
    onSearch: onSearch,
    options: orderedOptions || optionsProp,
    optionIndexesInValue: optionIndexesInValue,
    replace: replace,
    searchPlaceholder: searchPlaceholder,
    search: search,
    setSearch: setSearch,
    usingKeyboard: usingKeyboard,
    value: value,
    valueKey: valueKey,
    showSelectedInline: showSelectedInline
  }, children);
  var dropButtonProps = {
    ref: dropButtonRef,
    a11yTitle: (ariaLabel || a11yTitle || placeholder || 'Open Drop') + ". " + ((value == null ? void 0 : value.length) || 0) + " selected.",
    'aria-expanded': Boolean(open),
    'aria-haspopup': 'listbox',
    id: id,
    disabled: disabled === true || undefined,
    open: open,
    focusIndicator: focusIndicator,
    onFocus: onFocus,
    onBlur: onBlur,
    gridArea: gridArea,
    margin: margin,
    onOpen: onRequestOpen,
    onClose: onRequestClose,
    onClick: onClick,
    plainSelect: plain,
    plain: plain,
    // Button should be plain
    dropProps: dropProps,
    dropContent: dropContent,
    theme: theme
  };
  return /*#__PURE__*/React.createElement(Keyboard, {
    onDown: onRequestOpen,
    onUp: onRequestOpen
  }, showSelectedInline ? /*#__PURE__*/React.createElement(StyledSelectBox, {
    disabled: disabled === true || undefined,
    alignSelf: alignSelf,
    direction: "row",
    alignContent: "start",
    background: theme.select.background,
    ref: selectBoxRef,
    flex: false,
    plainSelect: plain,
    width: width
  }, /*#__PURE__*/React.createElement(Box, {
    width: "100%"
  }, /*#__PURE__*/React.createElement(DropButton, _extends({
    fill: "horizontal",
    alignSelf: "start"
  }, dropButtonProps, {
    dropAlign: dropAlign,
    dropTarget: dropTarget || selectBoxRef.current
  }), selectValue || displayLabelKey ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Box, {
    direction: "row"
  }, /*#__PURE__*/React.createElement(SelectTextInput, _extends({
    a11yTitle: ariaLabel || a11yTitle,
    defaultCursor: disabled === true || undefined,
    focusIndicator: false,
    id: id ? id + "__input" : undefined,
    name: name,
    width: "100%"
  }, rest, {
    tabIndex: "-1",
    type: "text",
    placeholder:
    // eslint-disable-next-line no-nested-ternary
    !value || (value == null ? void 0 : value.length) === 0 ? placeholder || selectValue || displayLabelKey : onMore ? ((value == null ? void 0 : value.length) || '0') + " selected" : ((value == null ? void 0 : value.length) || '0') + " selected of " + allOptions.length,
    plain: true,
    readOnly: true,
    value: "",
    theme: theme
  })), displaySelectIcon), /*#__PURE__*/React.createElement(HiddenInput, {
    type: "text",
    name: name,
    id: id ? id + "__input" : undefined,
    value: inputValue,
    ref: inputRef,
    readOnly: true
  })) : /*#__PURE__*/React.createElement(Box, {
    direction: "row"
  }, /*#__PURE__*/React.createElement(DefaultSelectTextInput, _extends({
    a11yTitle: ariaLabel || a11yTitle,
    disabled: disabled,
    id: id,
    name: name,
    ref: inputRef,
    placeholder: placeholder || 'Select',
    value: inputValue,
    size: size,
    theme: theme
  }, rest)), displaySelectIcon)), !open && (value == null ? void 0 : value.length) > 0 && (selectValue || displayLabelKey))) : /*#__PURE__*/React.createElement(Box, {
    width: width
  }, /*#__PURE__*/React.createElement(StyledSelectDropButton, _extends({}, dropButtonProps, {
    dropAlign: dropAlign,
    dropTarget: dropTarget,
    alignSelf: alignSelf,
    tabIndex: "0"
  }), /*#__PURE__*/React.createElement(Box, {
    align: "center",
    direction: "row",
    justify: "between",
    background: theme.select.background
  }, /*#__PURE__*/React.createElement(Box, {
    direction: "row",
    flex: true,
    basis: "auto"
  }, selectValue || displayLabelKey ? /*#__PURE__*/React.createElement(React.Fragment, null, selectValue || displayLabelKey, /*#__PURE__*/React.createElement(HiddenInput, {
    type: "text",
    name: name,
    id: id ? id + "__input" : undefined,
    value: inputValue,
    ref: inputRef,
    readOnly: true
  })) : /*#__PURE__*/React.createElement(DefaultSelectTextInput, _extends({
    a11yTitle: ariaLabel || a11yTitle,
    disabled: disabled,
    id: id,
    name: name,
    ref: inputRef,
    placeholder: placeholder,
    value: inputValue,
    size: size,
    theme: theme
  }, rest))), displaySelectIcon))));
});
SelectMultiple.defaultProps = _extends({}, defaultProps);
SelectMultiple.displayName = 'SelectMultiple';
SelectMultiple.propTypes = SelectMultiplePropTypes;
export { SelectMultiple };