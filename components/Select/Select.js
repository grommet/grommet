"use strict";

exports.__esModule = true;
exports.Select = void 0;
var _react = _interopRequireWildcard(require("react"));
var _styledComponents = require("styled-components");
var _utils = require("../../utils");
var _defaultProps = require("../../default-props");
var _Box = require("../Box");
var _Keyboard = require("../Keyboard");
var _FormContext = require("../Form/FormContext");
var _SelectContainer = require("./SelectContainer");
var _StyledSelect = require("./StyledSelect");
var _utils2 = require("./utils");
var _DefaultSelectTextInput = require("./DefaultSelectTextInput");
var _MessageContext = require("../../contexts/MessageContext");
var _propTypes = require("./propTypes");
var _excluded = ["a11yTitle", "aria-label", "alignSelf", "children", "clear", "closeOnChange", "defaultValue", "disabled", "disabledKey", "dropAlign", "dropHeight", "dropProps", "dropTarget", "emptySearchMessage", "focusIndicator", "gridArea", "id", "icon", "labelKey", "margin", "messages", "multiple", "name", "onBlur", "onChange", "onClick", "onClose", "onFocus", "onKeyDown", "onMore", "onOpen", "onSearch", "open", "options", "placeholder", "plain", "replace", "searchPlaceholder", "selected", "size", "value", "valueKey", "valueLabel"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
_StyledSelect.StyledSelectDropButton.defaultProps = {};
Object.setPrototypeOf(_StyledSelect.StyledSelectDropButton.defaultProps, _defaultProps.defaultProps);
var defaultDropAlign = {
  top: 'bottom',
  left: 'left'
};
var Select = exports.Select = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var a11yTitle = _ref.a11yTitle,
    ariaLabel = _ref['aria-label'],
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
    labelKeyProp = _ref.labelKey,
    margin = _ref.margin,
    messages = _ref.messages,
    multiple = _ref.multiple,
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
    propOpen = _ref.open,
    optionsProp = _ref.options,
    placeholder = _ref.placeholder,
    plain = _ref.plain,
    replace = _ref.replace,
    searchPlaceholder = _ref.searchPlaceholder,
    selected = _ref.selected,
    size = _ref.size,
    valueProp = _ref.value,
    valueKeyProp = _ref.valueKey,
    valueLabel = _ref.valueLabel,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var theme = (0, _react.useContext)(_styledComponents.ThemeContext) || _defaultProps.defaultProps.theme;
  var inputRef = (0, _react.useRef)();
  var formContext = (0, _react.useContext)(_FormContext.FormContext);
  var _useContext = (0, _react.useContext)(_MessageContext.MessageContext),
    format = _useContext.format;
  // For greater resilience, use labelKey if valueKey isn't provided and
  // vice versa. https://github.com/grommet/grommet/pull/6299
  var valueKey = valueKeyProp || labelKeyProp;
  var labelKey = labelKeyProp || valueKeyProp;

  // Determine if the Select is opened with the keyboard. If so,
  // focus should be set on the first option when the drop opens
  // see set initial focus code in SelectContainer.js
  var usingKeyboard = (0, _utils.useKeyboard)();

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
  var normalizedValue = (0, _react.useMemo)(function () {
    return (0, _utils2.getNormalizedValue)(value, valueKey);
  }, [value, valueKey]);
  // search input value
  var _useState = (0, _react.useState)(),
    search = _useState[0],
    setSearch = _useState[1];
  // All select option indices and values
  var _useState2 = (0, _react.useState)(optionsProp),
    allOptions = _useState2[0],
    setAllOptions = _useState2[1];
  // Track changes to options property, except when options are being
  // updated due to search activity. Allows option's initial index value
  // to be referenced when filtered by search.
  (0, _react.useEffect)(function () {
    if (!search) setAllOptions(optionsProp);
  }, [optionsProp, search]);

  // the option indexes present in the value
  var optionIndexesInValue = (0, _react.useMemo)(function () {
    var result = [];
    allOptions.forEach(function (option, index) {
      if (selected !== undefined) {
        if (Array.isArray(selected)) {
          if (selected.indexOf(index) !== -1) result.push(index);
        } else if (index === selected) {
          result.push(index);
        }
      } else if (Array.isArray(normalizedValue)) {
        if (normalizedValue.some(function (v) {
          return v === (0, _utils2.applyKey)(option, valueKey);
        })) {
          result.push(index);
        }
      } else if (normalizedValue === (0, _utils2.applyKey)(option, valueKey)) {
        result.push(index);
      }
    });
    return result;
  }, [allOptions, selected, valueKey, normalizedValue]);
  var _useState3 = (0, _react.useState)(propOpen),
    open = _useState3[0],
    setOpen = _useState3[1];
  (0, _react.useEffect)(function () {
    return setOpen(propOpen);
  }, [propOpen]);
  var onRequestOpen = (0, _react.useCallback)(function () {
    if (open) return;
    setOpen(true);
    if (onOpen) onOpen();
  }, [onOpen, open]);
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
      nextValue = _ref2.value,
      nextSelected = _ref2.selected;
    if (closeOnChange) onRequestClose();
    // nextValue must not be of type object to set value directly on the
    // input. if it is an object, then the user has not provided necessary
    // props to reduce object option
    if ((typeof nextValue !== 'object' || multiple) && nextValue !== event.target.value && inputRef.current) {
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
          },
          selected: {
            value: nextSelected
          }
        });
      } else {
        adjustedEvent = event;
        adjustedEvent.target = inputRef.current;
        adjustedEvent.value = nextValue;
        adjustedEvent.option = option;
        adjustedEvent.selected = nextSelected;
      }
      onChange(adjustedEvent);
    }
  }, [closeOnChange, multiple, onChange, onRequestClose, setValue, triggerChangeEvent]);
  var SelectIcon = (0, _utils2.getSelectIcon)(icon, theme, open);

  // element to show, trumps inputValue
  var selectValue = (0, _react.useMemo)(function () {
    if (valueLabel instanceof Function) {
      if (value || value === 0 || value === false) return valueLabel(value);
    } else if (valueLabel) return valueLabel;else if ( /*#__PURE__*/_react["default"].isValidElement(value)) return value; // deprecated
    return undefined;
  }, [value, valueLabel]);
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
      return format({
        id: 'select.multiple',
        messages: messages
      });
    }
    return undefined;
  }, [labelKey, messages, format, optionIndexesInValue, allOptions, selectValue]);
  var iconColor = (0, _utils2.getIconColor)(theme);
  return /*#__PURE__*/_react["default"].createElement(_Keyboard.Keyboard, {
    onDown: onRequestOpen,
    onUp: onRequestOpen
  }, /*#__PURE__*/_react["default"].createElement(_StyledSelect.StyledSelectDropButton, {
    ref: ref,
    a11yTitle: "" + (ariaLabel || a11yTitle || placeholder || 'Open Drop') + (value ? format({
      id: 'select.selected',
      messages: messages,
      values: {
        currentSelectedValue: value
      }
    }) : ''),
    "aria-expanded": Boolean(open),
    "aria-haspopup": "listbox",
    id: id,
    disabled: disabled === true || undefined,
    dropAlign: dropAlign,
    dropTarget: dropTarget,
    open: open,
    alignSelf: alignSelf,
    focusIndicator: focusIndicator,
    onFocus: onFocus,
    onBlur: onBlur,
    gridArea: gridArea,
    margin: margin,
    onOpen: onRequestOpen,
    onClose: onRequestClose,
    onClick: onClick,
    dropContent: /*#__PURE__*/_react["default"].createElement(_SelectContainer.SelectContainer, {
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
      usingKeyboard: usingKeyboard,
      value: value,
      valueKey: valueKey
    }, children)
    // StyledDropButton needs to know if the border should be shown
    ,
    plainSelect: plain,
    plain: true // Button should be plain
    ,
    dropProps: dropProps,
    theme: theme
  }, /*#__PURE__*/_react["default"].createElement(_Box.Box, {
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
    id: id ? id + "__input" : undefined,
    value: inputValue,
    ref: inputRef,
    readOnly: true
  })) : /*#__PURE__*/_react["default"].createElement(_DefaultSelectTextInput.DefaultSelectTextInput, _extends({
    a11yTitle: (ariaLabel || a11yTitle) && "" + (ariaLabel || a11yTitle) + (value && typeof value === 'string' ? ", " + value : ''),
    disabled: disabled,
    id: id,
    name: name,
    ref: inputRef,
    placeholder: placeholder,
    value: inputValue,
    size: size,
    theme: theme
  }, rest))), SelectIcon && /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    margin: theme.select.icons.margin,
    flex: false,
    style: {
      minWidth: 'auto'
    }
  }, /*#__PURE__*/(0, _react.isValidElement)(SelectIcon) ? SelectIcon : /*#__PURE__*/_react["default"].createElement(SelectIcon, {
    color: iconColor,
    size: size
  })))));
});
Select.defaultProps = _extends({}, _defaultProps.defaultProps);
Select.displayName = 'Select';
Select.propTypes = _propTypes.SelectPropTypes;