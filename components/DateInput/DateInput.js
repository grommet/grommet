"use strict";

exports.__esModule = true;
exports.DateInput = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = require("styled-components");

var _Calendar = require("grommet-icons/icons/Calendar");

var _defaultProps = require("../../default-props");

var _Box = require("../Box");

var _Calendar2 = require("../Calendar");

var _Drop = require("../Drop");

var _DropButton = require("../DropButton");

var _Form = require("../Form");

var _Keyboard = require("../Keyboard");

var _MaskedInput = require("../MaskedInput");

var _utils = require("../../utils");

var _utils2 = require("./utils");

var _propTypes = require("./propTypes");

var _excluded = ["buttonProps", "calendarProps", "defaultValue", "disabled", "dropProps", "format", "id", "inline", "inputProps", "name", "onChange", "onFocus", "value"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var DateInput = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, refArg) {
  var buttonProps = _ref.buttonProps,
      calendarProps = _ref.calendarProps,
      defaultValue = _ref.defaultValue,
      disabled = _ref.disabled,
      dropProps = _ref.dropProps,
      format = _ref.format,
      id = _ref.id,
      _ref$inline = _ref.inline,
      inline = _ref$inline === void 0 ? false : _ref$inline,
      inputProps = _ref.inputProps,
      name = _ref.name,
      _onChange = _ref.onChange,
      _onFocus = _ref.onFocus,
      valueArg = _ref.value,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded);

  var theme = (0, _react.useContext)(_styledComponents.ThemeContext) || _defaultProps.defaultProps.theme;

  var iconSize = theme.dateInput.icon && theme.dateInput.icon.size || 'medium';

  var _useContext = (0, _react.useContext)(_Form.FormContext),
      useFormInput = _useContext.useFormInput;

  var ref = (0, _utils.useForwardedRef)(refArg);

  var _useFormInput = useFormInput(name, valueArg, defaultValue),
      value = _useFormInput[0],
      setValue = _useFormInput[1]; // do we expect multiple dates?


  var range = Array.isArray(value) || format && format.includes('-'); // parse format and build a formal schema we can use elsewhere

  var schema = (0, _react.useMemo)(function () {
    return (0, _utils2.formatToSchema)(format);
  }, [format]); // mask is only used when a format is provided

  var mask = (0, _react.useMemo)(function () {
    return (0, _utils2.schemaToMask)(schema);
  }, [schema]); // textValue is only used when a format is provided

  var _useState = (0, _react.useState)(schema ? (0, _utils2.valueToText)(value, schema) : undefined),
      textValue = _useState[0],
      setTextValue = _useState[1]; // We need to distinguish between the caller changing a Form value
  // and the user typing a date that he isn't finished with yet.
  // To handle this, we see if we have a value and the text value
  // associated with it doesn't align to it, then we update the text value.
  // We compare using textToValue to avoid "06/01/2021" not
  // matching "06/1/2021".


  (0, _react.useEffect)(function () {
    if (schema && value !== undefined) {
      var nextTextValue = (0, _utils2.valueToText)(value, schema);

      if (!(0, _utils2.valuesAreEqual)((0, _utils2.textToValue)(textValue, schema, value, range), (0, _utils2.textToValue)(nextTextValue, schema, value, range))) {
        setTextValue(nextTextValue);
      }
    }
  }, [range, schema, textValue, value]); // when format and not inline, whether to show the Calendar in a Drop

  var _useState2 = (0, _react.useState)(),
      open = _useState2[0],
      setOpen = _useState2[1];

  var calendar = /*#__PURE__*/_react["default"].createElement(_Calendar2.Calendar, _extends({
    ref: inline ? ref : undefined,
    id: inline && !format ? id : undefined,
    range: range,
    date: range ? undefined : value // when caller initializes with empty array, dates should be undefined
    // allowing the user to select both begin and end of the range
    ,
    dates: range && value.length ? [value] : undefined,
    onSelect: disabled ? undefined : function (nextValue) {
      var normalizedValue;

      if (range && Array.isArray(nextValue)) {
        normalizedValue = nextValue[0];
      } // clicking an edge date removes it
      else if (range) normalizedValue = [nextValue, nextValue];else normalizedValue = nextValue;

      if (schema) setTextValue((0, _utils2.valueToText)(normalizedValue, schema));
      setValue(normalizedValue);
      if (_onChange) _onChange({
        value: normalizedValue
      });
      if (open && !range) setOpen(false);
    }
  }, calendarProps));

  if (!format) {
    // When no format is specified, we don't give the user a way to type
    if (inline) return calendar;
    return /*#__PURE__*/_react["default"].createElement(_DropButton.DropButton, _extends({
      ref: ref,
      id: id,
      dropProps: _extends({
        align: {
          top: 'bottom',
          left: 'left'
        }
      }, dropProps),
      dropContent: calendar,
      icon: /*#__PURE__*/_react["default"].createElement(_Calendar.Calendar, {
        size: iconSize
      })
    }, buttonProps));
  }

  var input = /*#__PURE__*/_react["default"].createElement(_Form.FormContext.Provider, {
    key: "input" // don't let MaskedInput drive the Form
    ,
    value: {
      useFormInput: function useFormInput(_, val) {
        return [val, function () {}];
      }
    }
  }, /*#__PURE__*/_react["default"].createElement(_Keyboard.Keyboard, {
    onEsc: open ? function () {
      return setOpen(false);
    } : undefined
  }, /*#__PURE__*/_react["default"].createElement(_MaskedInput.MaskedInput, _extends({
    ref: ref,
    id: id,
    name: name,
    icon: /*#__PURE__*/_react["default"].createElement(_Calendar.Calendar, {
      size: iconSize
    }),
    reverse: true,
    disabled: disabled,
    mask: mask
  }, inputProps, rest, {
    value: textValue,
    onChange: function onChange(event) {
      var nextTextValue = event.target.value;
      setTextValue(nextTextValue);
      var nextValue = (0, _utils2.textToValue)(nextTextValue, schema, value, range); // update value even when undefined

      setValue(nextValue);

      if (_onChange) {
        event.persist(); // extract from React synthetic event pool

        var adjustedEvent = event;
        adjustedEvent.value = nextValue;

        _onChange(adjustedEvent);
      }
    },
    onFocus: function onFocus(event) {
      setOpen(true);
      if (_onFocus) _onFocus(event);
    },
    onClick: function onClick() {
      return setOpen(true);
    }
  }))));

  if (inline) {
    return /*#__PURE__*/_react["default"].createElement(_Box.Box, null, input, calendar);
  }

  if (open) {
    return [input, /*#__PURE__*/_react["default"].createElement(_Drop.Drop, _extends({
      overflow: "visible",
      key: "drop",
      id: id ? id + "__drop" : undefined,
      target: ref.current,
      align: _extends({
        top: 'bottom',
        left: 'left'
      }, dropProps),
      onEsc: function onEsc() {
        return setOpen(false);
      },
      onClickOutside: function onClickOutside(_ref2) {
        var target = _ref2.target;
        if (target !== ref.current) setOpen(false);
      }
    }, dropProps), calendar)];
  }

  return input;
});
exports.DateInput = DateInput;
DateInput.displayName = 'DateInput';
DateInput.propTypes = _propTypes.DateInputPropTypes;