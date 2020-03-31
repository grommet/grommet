"use strict";

exports.__esModule = true;
exports.Select = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _utils = require("../../utils");

var _defaultProps = require("../../default-props");

var _Box = require("../Box");

var _DropButton = require("../DropButton");

var _Keyboard = require("../Keyboard");

var _FormContext = require("../Form/FormContext");

var _TextInput = require("../TextInput");

var _SelectContainer = require("./SelectContainer");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var SelectTextInput = (0, _styledComponents["default"])(_TextInput.TextInput).withConfig({
  displayName: "Select__SelectTextInput",
  componentId: "sc-17idtfo-0"
})(["cursor:pointer;"]);
var StyledSelectDropButton = (0, _styledComponents["default"])(_DropButton.DropButton).withConfig({
  displayName: "Select__StyledSelectDropButton",
  componentId: "sc-17idtfo-1"
})(["", ";", ";", ";"], function (props) {
  return !props.plain && _utils.controlBorderStyle;
}, function (props) {
  return props.theme.select && props.theme.select.control && props.theme.select.control.extend;
}, function (props) {
  return props.open && props.theme.select.control.open;
});
StyledSelectDropButton.defaultProps = {};
Object.setPrototypeOf(StyledSelectDropButton.defaultProps, _defaultProps.defaultProps);
var Select = (0, _react.forwardRef)(function (_ref, ref) {
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

  var theme = (0, _react.useContext)(_styledComponents.ThemeContext) || _defaultProps.defaultProps.theme;

  var inputRef = (0, _react.useRef)();
  var formContext = (0, _react.useContext)(_FormContext.FormContext); // normalize the value prop to not be objects

  var normalizedValueProp = (0, _react.useMemo)(function () {
    if (Array.isArray(valueProp)) {
      if (valueProp.length === 0) return valueProp;

      if (typeof valueProp[0] === 'object' && valueKey) {
        return valueProp.map(function (v) {
          return v[valueKey];
        });
      }

      return valueProp;
    }

    if (typeof valueProp === 'object' && valueKey) return valueProp[valueKey];
    return valueProp;
  }, [valueKey, valueProp]);

  var _formContext$useFormC = formContext.useFormContext(name, normalizedValueProp, ''),
      value = _formContext$useFormC[0],
      setValue = _formContext$useFormC[1]; // track which options are present in the value


  var valueOptions = (0, _react.useMemo)(function () {
    return options.filter(function (option, index) {
      if (selected !== undefined) {
        if (Array.isArray(selected)) return selected.indexOf(index) !== -1;
        return index === selected;
      }

      if (typeof option === 'object' && valueKey) {
        if (Array.isArray(value)) {
          return value.indexOf(option[valueKey]) !== -1;
        }

        return option[valueKey] === value;
      }

      if (Array.isArray(value)) {
        return value.indexOf(option) !== -1;
      }

      return option === value;
    });
  }, [options, selected, value, valueKey]);

  var _useState = (0, _react.useState)(propOpen),
      open = _useState[0],
      setOpen = _useState[1];

  (0, _react.useEffect)(function () {
    return setOpen(propOpen);
  }, [propOpen]);

  var onRequestOpen = function onRequestOpen() {
    setOpen(true);
    if (onOpen) onOpen();
  };

  var onRequestClose = function onRequestClose() {
    setOpen(false);
    if (onClose) onClose();
  };

  var onSelectChange = function onSelectChange(event, _ref2) {
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
  } // element to show, trumps inputValue


  var selectValue = (0, _react.useMemo)(function () {
    if (valueLabel) return valueLabel;
    if (_react["default"].isValidElement(value)) return value;
    return undefined;
  }, [value, valueLabel]); // text to show

  var inputValue = (0, _react.useMemo)(function () {
    if (!selectValue) {
      if (Array.isArray(valueOptions)) {
        if (valueOptions.length === 0) return '';

        if (valueOptions.length === 1) {
          var valueOption = valueOptions[0];

          if (typeof valueOption === 'object' && labelKey) {
            if (typeof labelKey === 'function') {
              return labelKey(valueOption);
            }

            return valueOption[labelKey];
          }

          return valueOption;
        }

        return messages.multiple;
      }

      if (typeof valueOptions === 'object' && labelKey) {
        if (typeof labelKey === 'function') {
          return labelKey(valueOptions);
        }

        return valueOptions[labelKey];
      }

      if (valueOptions !== undefined) return valueOptions;
      return '';
    }

    return undefined;
  }, [labelKey, messages, selectValue, valueOptions]); // const dark = theme.select.background
  // ? colorIsDark(theme.select.background)
  // : theme.dark;

  var iconColor = (0, _utils.normalizeColor)(theme.select.icons.color || 'control', theme);
  return _react["default"].createElement(_Keyboard.Keyboard, {
    onDown: onRequestOpen,
    onUp: onRequestOpen
  }, _react["default"].createElement(StyledSelectDropButton, {
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
    dropContent: _react["default"].createElement(_SelectContainer.SelectContainer, {
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
  }, _react["default"].createElement(_Box.Box, {
    align: "center",
    direction: "row",
    justify: "between",
    background: theme.select.background
  }, _react["default"].createElement(_Box.Box, {
    direction: "row",
    flex: true,
    basis: "auto"
  }, selectValue || _react["default"].createElement(SelectTextInput, _extends({
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
  }))), SelectIcon && _react["default"].createElement(_Box.Box, {
    margin: theme.select.icons.margin,
    flex: false,
    style: {
      minWidth: 'auto'
    }
  }, (0, _react.isValidElement)(SelectIcon) ? SelectIcon : _react["default"].createElement(SelectIcon, {
    color: iconColor,
    size: size
  })))));
});
Select.defaultProps = _extends({}, _defaultProps.defaultProps);
Select.displayName = 'Select';
var SelectDoc;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  SelectDoc = require('./doc').doc(Select);
}

var SelectWrapper = SelectDoc || Select;
exports.Select = SelectWrapper;