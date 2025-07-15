"use strict";

exports.__esModule = true;
exports.SelectMultiple = void 0;
var _react = _interopRequireWildcard(require("react"));
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _utils = require("../../utils");
var _Box = require("../Box");
var _DropButton = require("../DropButton");
var _Keyboard = require("../Keyboard");
var _FormContext = require("../Form/FormContext");
var _SelectMultipleValue = require("./SelectMultipleValue");
var _SelectMultipleContainer = require("./SelectMultipleContainer");
var _StyledSelect = require("../Select/StyledSelect");
var _utils2 = require("../Select/utils");
var _DefaultSelectTextInput = require("../Select/DefaultSelectTextInput");
var _MessageContext = require("../../contexts/MessageContext");
var _propTypes = require("./propTypes");
var _useThemeValue2 = require("../../utils/useThemeValue");
var _excluded = ["a11yTitle", "aria-label", "aria-labelledby", "alignSelf", "children", "defaultValue", "disabled", "disabledKey", "dropAlign", "dropHeight", "dropProps", "dropTarget", "emptySearchMessage", "focusIndicator", "gridArea", "help", "id", "icon", "labelKey", "limit", "margin", "messages", "name", "onBlur", "onChange", "onClick", "onClose", "onFocus", "onKeyDown", "onMore", "onOpen", "onSearch", "open", "options", "placeholder", "plain", "replace", "searchPlaceholder", "size", "sortSelectedOnClose", "value", "valueKey", "valueLabel", "showSelectedInline", "width"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var StyledSelectBox = (0, _styledComponents["default"])(_Box.Box).withConfig({
  displayName: "SelectMultiple__StyledSelectBox",
  componentId: "sc-18zwyth-0"
})(["", ";", ";", ";"], function (props) {
  return !props.plainSelect && _utils.controlBorderStyle;
}, function (props) {
  var _props$theme$select;
  return (_props$theme$select = props.theme.select) == null || (_props$theme$select = _props$theme$select.control) == null ? void 0 : _props$theme$select.extend;
}, function (props) {
  var _props$theme$select$c;
  return props.open && ((_props$theme$select$c = props.theme.select.control) == null ? void 0 : _props$theme$select$c.open);
});
var SelectMultiple = exports.SelectMultiple = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var a11yTitle = _ref.a11yTitle,
    ariaLabel = _ref['aria-label'],
    ariaLabelledByProp = _ref['aria-labelledby'],
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
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme,
    passThemeFlag = _useThemeValue.passThemeFlag;
  var inputRef = (0, _react.useRef)();
  var formContext = (0, _react.useContext)(_FormContext.FormContext);
  var _useContext = (0, _react.useContext)(_MessageContext.MessageContext),
    format = _useContext.format;
  var selectBoxRef = (0, _react.useRef)();
  var dropButtonRef = (0, _utils.useForwardedRef)(ref);
  var usingKeyboard = (0, _utils.useKeyboard)();
  var formFieldData = formContext == null ? void 0 : formContext.useFormField({});
  var dropAlign = (0, _react.useMemo)(function () {
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
  var _useState = (0, _react.useState)(),
    ariaLabelledBy = _useState[0],
    setAriaLabelledBy = _useState[1];
  (0, _react.useEffect)(function () {
    if (formFieldData != null && formFieldData.inForm && id && !ariaLabel && !placeholder) {
      var labelElement = document.getElementById("grommet-" + id + "__input__label");
      if (labelElement) {
        setAriaLabelledBy("grommet-" + id + "__input__label " + id);
      }
    }
  }, [formFieldData == null ? void 0 : formFieldData.inForm, id, ariaLabel, placeholder]);

  // normalizedValue is the value mapped with any valueKey applied
  // When the options array contains objects, this property indicates how
  // to retrieve the value of each option.
  // If a string is provided, it is used as the key to retrieve a
  // property of an option object.
  // If a function is provided, it is called with the option and should
  // return the value.
  // If reduce is true, this value will be used for the 'value'
  // delivered via 'onChange'.
  var normalizedValue = (0, _react.useMemo)(function () {
    return (0, _utils2.getNormalizedValue)(value, valueKey);
  }, [value, valueKey]);
  // search input value
  var _useState2 = (0, _react.useState)(),
    search = _useState2[0],
    setSearch = _useState2[1];
  // All select option indices and values
  var _useState3 = (0, _react.useState)(optionsProp),
    allOptions = _useState3[0],
    setAllOptions = _useState3[1];
  var _useState4 = (0, _react.useState)(),
    orderedOptions = _useState4[0],
    setOrderedOptions = _useState4[1];
  // Track changes to options property, except when options are being
  // updated due to search activity. Allows option's initial index value
  // to be referenced when filtered by search.
  (0, _react.useEffect)(function () {
    if (!search) setAllOptions(optionsProp);
  }, [optionsProp, search]);
  (0, _react.useEffect)(function () {
    if (search && optionsProp && optionsProp.length > 0) {
      var additionalOptions = [].concat(allOptions);
      optionsProp.forEach(function (i) {
        return !additionalOptions.some(function (j) {
          return typeof i === 'object' ? (0, _utils2.applyKey)(i, valueKey) === (0, _utils2.applyKey)(j, valueKey) : i === j;
        }) && additionalOptions.push(i);
      });
      if (allOptions.length !== additionalOptions.length) setAllOptions(additionalOptions);
    }
  }, [allOptions, optionsProp, search, valueKey]);
  (0, _react.useEffect)(function () {
    if (sortSelectedOnClose) setOrderedOptions(optionsProp);
  }, [optionsProp, sortSelectedOnClose]);

  // the option indexes present in the value
  var optionIndexesInValue = (0, _react.useMemo)(function () {
    var result = [];
    if (!Array.isArray(normalizedValue)) {
      return result;
    }
    normalizedValue.forEach(function (v) {
      var index = allOptions.map(function (option) {
        return (0, _utils2.applyKey)(option, valueKey);
      }).indexOf(v);
      if (index !== -1) result.push(index);
    });
    return result;
  }, [allOptions, valueKey, normalizedValue]);
  var _useState5 = (0, _react.useState)(openProp),
    open = _useState5[0],
    setOpen = _useState5[1];
  (0, _react.useEffect)(function () {
    return setOpen(openProp);
  }, [openProp]);
  var onRequestOpen = (0, _react.useCallback)(function () {
    if (open) return;
    setOpen(true);
    if (onOpen) onOpen();
  }, [onOpen, open]);

  // On drop close if sortSelectedOnClose is true, sort options so that
  // selected options appear first, followed by unselected options.
  (0, _react.useEffect)(function () {
    if (sortSelectedOnClose && value && !open) {
      var selectedOptions = optionsProp.filter(function (option) {
        return (0, _utils2.arrayIncludes)(value, valueKey && valueKey.reduce ? (0, _utils2.applyKey)(option, valueKey) : option, valueKey || labelKey);
      });
      var unselectedOptions = optionsProp.filter(function (i) {
        return !(0, _utils2.arrayIncludes)(selectedOptions, i, valueKey || labelKey);
      });
      var nextOrderedOptions = selectedOptions.concat(unselectedOptions);
      setOrderedOptions(nextOrderedOptions);
    }
  }, [labelKey, open, sortSelectedOnClose, optionsProp, value, valueKey]);
  var onRequestClose = (0, _react.useCallback)(function () {
    setOpen(false);
    if (onClose) onClose();
    setSearch();
  }, [onClose]);
  var triggerChangeEvent = (0, _react.useCallback)(function (nextValue) {
    return (0, _utils2.changeEvent)(inputRef, nextValue);
  }, []);
  var onSelectChange = (0, _react.useCallback)(function (event, _ref2) {
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
  var SelectIcon = (0, _utils2.getSelectIcon)(icon, theme, open);

  // element to show, trumps inputValue
  var selectValue = (0, _react.useMemo)(function () {
    var result;
    if (valueLabel) {
      result = value && valueLabel instanceof Function ? valueLabel(value) : valueLabel;
    } else if ((value == null ? void 0 : value.length) > 0 && showSelectedInline) {
      result = /*#__PURE__*/_react["default"].createElement(_SelectMultipleValue.SelectMultipleValue, {
        allOptions: allOptions,
        disabled: disabled,
        disabledKey: disabledKey,
        dropButtonRef: dropButtonRef,
        labelKey: labelKey,
        messages: messages,
        onRequestOpen: onRequestOpen,
        onSelectChange: onSelectChange,
        theme: theme,
        value: value,
        valueKey: valueKey
      }, children);
    }
    return result;
  }, [allOptions, children, disabled, disabledKey, dropButtonRef, labelKey, messages, onRequestOpen, onSelectChange, showSelectedInline, theme, value, valueKey, valueLabel]);
  var displayLabelKey = (0, _react.useMemo)(function () {
    return (0, _utils2.getDisplayLabelKey)(labelKey, allOptions, optionIndexesInValue, selectValue);
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
  var inputValue = (0, _react.useMemo)(function () {
    if (!selectValue) {
      if (optionIndexesInValue.length === 0) return '';
      if (optionIndexesInValue.length === 1) return (0, _utils2.applyKey)(allOptions[optionIndexesInValue[0]], labelKey);
      // keeping messages.multiple for backwards compatibility
      if (messages != null && messages.multiple && !messages.summarizedValue) {
        return format({
          id: 'select.multiple',
          messages: messages
        });
      }
      return format({
        id: 'selectMultiple.summarizedValue',
        messages: messages,
        values: {
          selected: optionIndexesInValue.length,
          total: allOptions.length
        }
      });
    }
    return undefined;
  }, [selectValue, optionIndexesInValue, allOptions, labelKey, format, messages]);
  var iconColor = (0, _utils2.getIconColor)(theme);
  var displaySelectIcon = SelectIcon && /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    alignSelf: "center",
    margin: theme.select.icons.margin,
    width: {
      min: 'auto'
    }
  }, /*#__PURE__*/(0, _react.isValidElement)(SelectIcon) ? SelectIcon : /*#__PURE__*/_react["default"].createElement(SelectIcon, {
    color: iconColor,
    size: size
  }));
  var dropContent = /*#__PURE__*/_react["default"].createElement(_SelectMultipleContainer.SelectMultipleContainer, {
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
    messages: messages,
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
    a11yTitle: (ariaLabel || a11yTitle || placeholder || format({
      id: 'selectMultiple.open',
      messages: messages
    })) + ". " + format({
      id: 'selectMultiple.selected',
      values: {
        selected: (value == null ? void 0 : value.length) || 0,
        total: allOptions.length
      }
    }),
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
  return /*#__PURE__*/_react["default"].createElement(_Keyboard.Keyboard, {
    onDown: onRequestOpen,
    onUp: onRequestOpen
  }, showSelectedInline ? /*#__PURE__*/_react["default"].createElement(StyledSelectBox, _extends({
    disabled: disabled === true || undefined,
    alignSelf: alignSelf,
    direction: "row",
    alignContent: "start",
    background: theme.select.background,
    ref: selectBoxRef,
    flex: false,
    plainSelect: plain,
    width: width
  }, passThemeFlag), /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    width: "100%"
  }, /*#__PURE__*/_react["default"].createElement(_DropButton.DropButton, _extends({
    fill: "horizontal",
    alignSelf: "start"
  }, dropButtonProps, {
    dropAlign: dropAlign,
    dropTarget: dropTarget || selectBoxRef.current
  }), selectValue || displayLabelKey ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    direction: "row"
  }, /*#__PURE__*/_react["default"].createElement(_StyledSelect.SelectTextInput, _extends({
    a11yTitle: ariaLabel || a11yTitle,
    defaultCursor: disabled === true || undefined,
    focusIndicator: false,
    id: id ? (0, _utils2.selectInputId)(id) : undefined,
    inert: _utils2.inertTrueValue,
    name: name,
    width: "100%"
  }, rest, {
    tabIndex: "-1",
    type: "text",
    placeholder: !value || (value == null ? void 0 : value.length) === 0 ? placeholder || selectValue || displayLabelKey : format({
      id: onMore ? 'selectMultiple.selected' : 'selectMultiple.selectedOfTotal',
      messages: messages,
      values: _extends({
        selected: (value == null ? void 0 : value.length) || 0
      }, !onMore ? {
        total: allOptions.length
      } : {})
    }),
    plain: true,
    readOnly: true,
    value: "",
    theme: theme
  })), displaySelectIcon), /*#__PURE__*/_react["default"].createElement(_StyledSelect.HiddenInput, {
    type: "text",
    name: name,
    id: id ? (0, _utils2.selectInputId)(id) : undefined,
    inert: _utils2.inertTrueValue,
    value: inputValue,
    ref: inputRef,
    readOnly: true
  })) : /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    direction: "row"
  }, /*#__PURE__*/_react["default"].createElement(_DefaultSelectTextInput.DefaultSelectTextInput, _extends({
    a11yTitle: ariaLabel || a11yTitle,
    disabled: disabled,
    id: id,
    inert: _utils2.inertTrueValue,
    name: name,
    ref: inputRef,
    placeholder: placeholder || 'Select',
    value: inputValue,
    size: size,
    theme: theme
  }, rest)), displaySelectIcon)), !open && (value == null ? void 0 : value.length) > 0 && (selectValue || displayLabelKey))) : /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    width: width
  }, /*#__PURE__*/_react["default"].createElement(_StyledSelect.StyledSelectDropButton, _extends({}, dropButtonProps, {
    dropAlign: dropAlign,
    dropTarget: dropTarget,
    alignSelf: alignSelf,
    tabIndex: "0",
    "aria-labelledby": ariaLabelledByProp || ariaLabelledBy
  }), /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    align: "center",
    direction: "row",
    justify: "between",
    background: theme.select.background
  }, /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    direction: "row",
    flex: true,
    basis: "auto"
  }, selectValue || displayLabelKey ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, selectValue || displayLabelKey, /*#__PURE__*/_react["default"].createElement(_StyledSelect.HiddenInput, {
    type: "text",
    name: name,
    id: id ? (0, _utils2.selectInputId)(id) : undefined,
    inert: _utils2.inertTrueValue,
    value: inputValue,
    ref: inputRef,
    readOnly: true
  })) : /*#__PURE__*/_react["default"].createElement(_DefaultSelectTextInput.DefaultSelectTextInput, _extends({
    a11yTitle: ariaLabel || a11yTitle,
    disabled: disabled,
    id: id,
    inert: _utils2.inertTrueValue,
    name: name,
    ref: inputRef,
    placeholder: placeholder,
    value: inputValue,
    size: size,
    theme: theme
  }, rest))), displaySelectIcon))));
});
SelectMultiple.displayName = 'SelectMultiple';
SelectMultiple.propTypes = _propTypes.SelectMultiplePropTypes;