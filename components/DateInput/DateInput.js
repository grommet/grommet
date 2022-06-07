"use strict";

exports.__esModule = true;
exports.DateInput = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = require("styled-components");

var _Calendar = require("grommet-icons/icons/Calendar");

var _defaultProps = require("../../default-props");

var _AnnounceContext = require("../../contexts/AnnounceContext");

var _MessageContext = require("../../contexts/MessageContext");

var _Box = require("../Box");

var _Button = require("../Button");

var _Calendar2 = require("../Calendar");

var _Drop = require("../Drop");

var _DropButton = require("../DropButton");

var _Form = require("../Form");

var _Keyboard = require("../Keyboard");

var _MaskedInput = require("../MaskedInput");

var _utils = require("../../utils");

var _utils2 = require("../Calendar/utils");

var _utils3 = require("./utils");

var _propTypes = require("./propTypes");

var _excluded = ["buttonProps", "calendarProps", "defaultValue", "disabled", "dropProps", "format", "id", "icon", "inline", "inputProps", "name", "onChange", "onFocus", "plain", "reverse", "value", "messages"],
    _excluded2 = ["icon"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var DateInput = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, refArg) {
  var buttonProps = _ref.buttonProps,
      calendarProps = _ref.calendarProps,
      defaultValue = _ref.defaultValue,
      disabled = _ref.disabled,
      dropProps = _ref.dropProps,
      format = _ref.format,
      id = _ref.id,
      icon = _ref.icon,
      _ref$inline = _ref.inline,
      inline = _ref$inline === void 0 ? false : _ref$inline,
      inputProps = _ref.inputProps,
      name = _ref.name,
      _onChange = _ref.onChange,
      _onFocus = _ref.onFocus,
      plain = _ref.plain,
      _ref$reverse = _ref.reverse,
      reverseProp = _ref$reverse === void 0 ? false : _ref$reverse,
      valueArg = _ref.value,
      messages = _ref.messages,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded);

  var theme = (0, _react.useContext)(_styledComponents.ThemeContext) || _defaultProps.defaultProps.theme;

  var announce = (0, _react.useContext)(_AnnounceContext.AnnounceContext);

  var _useContext = (0, _react.useContext)(_MessageContext.MessageContext),
      formatMessage = _useContext.format;

  var iconSize = theme.dateInput.icon && theme.dateInput.icon.size || 'medium';

  var _useContext2 = (0, _react.useContext)(_Form.FormContext),
      useFormInput = _useContext2.useFormInput;

  var ref = (0, _utils.useForwardedRef)(refArg);
  var containerRef = (0, _react.useRef)();

  var _useFormInput = useFormInput({
    name: name,
    value: valueArg,
    initialValue: defaultValue
  }),
      value = _useFormInput[0],
      setValue = _useFormInput[1];

  var timestamp = (0, _react.useMemo)(function () {
    if (Array.isArray(defaultValue) && defaultValue.length) return (0, _utils2.getTimestamp)(defaultValue[0]);
    if (typeof defaultValue === 'string') return (0, _utils2.getTimestamp)(defaultValue);
    if (Array.isArray(value) && value.length) return (0, _utils2.getTimestamp)(value[0]); // check to see if value is not an empty string
    // empty string should behave like undefined

    if (typeof value === 'string' && value.length) return (0, _utils2.getTimestamp)(value);
    return undefined;
  }, [defaultValue, value]); // whether or not we should normalize the date based on the timestamp.
  // will be set to false if the initial timestamp is undefined (meaning
  // a user did not provide a defaultValue or value). in this case, we
  // will just rely on the UTC timestamp and don't need to normalize.

  var _useState = (0, _react.useState)(true),
      normalize = _useState[0],
      setNormalize = _useState[1]; // normalize value based on timestamp vs user's local timezone


  var normalizedDate = (0, _utils2.normalizeForTimezone)(value, timestamp, normalize); // do we expect multiple dates?

  var range = Array.isArray(value) || format && format.includes('-'); // parse format and build a formal schema we can use elsewhere

  var schema = (0, _react.useMemo)(function () {
    return (0, _utils3.formatToSchema)(format);
  }, [format]); // mask is only used when a format is provided

  var mask = (0, _react.useMemo)(function () {
    return (0, _utils3.schemaToMask)(schema);
  }, [schema]); // textValue is only used when a format is provided

  var _useState2 = (0, _react.useState)(schema ? (0, _utils3.valueToText)(normalizedDate, schema) : undefined),
      textValue = _useState2[0],
      setTextValue = _useState2[1]; // Setting the icon through `inputProps` is deprecated.
  // The `icon` prop should be used instead.


  var _ref2 = inputProps || {},
      MaskedInputIcon = _ref2.icon,
      restOfInputProps = _objectWithoutPropertiesLoose(_ref2, _excluded2);

  if (MaskedInputIcon) {
    console.warn("Customizing the DateInput icon through inputProps is deprecated. \nUse the icon prop instead.");
  }

  var reverse = reverseProp || restOfInputProps.reverse;
  var calendarDropdownAlign = {
    top: 'bottom',
    left: 'left'
  }; // We need to distinguish between the caller changing a Form value
  // and the user typing a date that he isn't finished with yet.
  // To handle this, we see if we have a value and the text value
  // associated with it doesn't align to it, then we update the text value.
  // We compare using textToValue to avoid "06/01/2021" not
  // matching "06/1/2021".

  (0, _react.useEffect)(function () {
    if (schema && value !== undefined) {
      var nextTextValue = (0, _utils3.valueToText)(normalizedDate, schema);

      if (!(0, _utils3.valuesAreEqual)((0, _utils3.textToValue)(textValue, schema, range, timestamp), (0, _utils3.textToValue)(nextTextValue, schema, range, timestamp)) || textValue === '' && nextTextValue !== '') {
        setTextValue(nextTextValue);
      }
    }
  }, [range, schema, textValue, value, normalizedDate, timestamp]); // when format and not inline, whether to show the Calendar in a Drop

  var _useState3 = (0, _react.useState)(),
      open = _useState3[0],
      setOpen = _useState3[1];

  var openCalendar = (0, _react.useCallback)(function () {
    setOpen(true);
    announce(formatMessage({
      id: 'dateInput.enterCalendar',
      messages: messages
    }));
  }, [announce, formatMessage, messages]);
  var closeCalendar = (0, _react.useCallback)(function () {
    setOpen(false);
    announce(formatMessage({
      id: 'dateInput.exitCalendar',
      messages: messages
    }));
  }, [announce, formatMessage, messages]);

  var calendar = /*#__PURE__*/_react["default"].createElement(_Calendar2.Calendar, _extends({
    ref: inline ? ref : undefined,
    id: inline && !format ? id : undefined,
    range: range,
    date: range ? undefined : normalizedDate // when caller initializes with empty array, dates should be undefined
    // allowing the user to select both begin and end of the range
    ,
    dates: range && value.length ? [normalizedDate] : undefined // places focus on days grid when Calendar opens
    ,
    initialFocus: open ? 'days' : undefined,
    normalize: normalize,
    onSelect: disabled ? undefined : function (nextValue) {
      var normalizedValue;

      if (range && Array.isArray(nextValue)) {
        normalizedValue = nextValue[0];
      } // clicking an edge date removes it
      else if (range) normalizedValue = [nextValue, nextValue];else normalizedValue = nextValue; // timestamp will be undefined if no defaultValue or value have
      // been passed in, indicating that we should stay local if the
      // user first picks a date via the Calendar.


      var nextNormalize = normalize;

      if (timestamp === undefined) {
        nextNormalize = false;
        setNormalize(nextNormalize);
      }

      if (schema) setTextValue((0, _utils3.valueToText)((0, _utils2.normalizeForTimezone)(normalizedValue, undefined, nextNormalize), schema));
      setValue(normalizedValue);
      if (_onChange) _onChange({
        value: normalizedValue
      });

      if (open && !range) {
        closeCalendar();
        setTimeout(function () {
          return ref.current.focus();
        }, 1);
      }
    }
  }, _extends({}, calendarProps, {
    timestamp: timestamp
  })));

  var formContextValue = (0, _react.useMemo)(function () {
    return {
      useFormInput: function useFormInput(_ref3) {
        var valueProp = _ref3.value;
        return [valueProp, function () {}];
      }
    };
  }, []);

  if (!format) {
    // When no format is specified, we don't give the user a way to type
    if (inline) return calendar;
    return /*#__PURE__*/_react["default"].createElement(_DropButton.DropButton, _extends({
      ref: ref,
      id: id,
      dropProps: _extends({
        align: calendarDropdownAlign
      }, dropProps),
      dropContent: calendar,
      icon: icon || MaskedInputIcon || /*#__PURE__*/_react["default"].createElement(_Calendar.Calendar, {
        size: iconSize
      })
    }, buttonProps));
  }

  var calendarButton = /*#__PURE__*/_react["default"].createElement(_Button.Button, {
    onClick: open ? closeCalendar : openCalendar,
    plain: true,
    icon: icon || MaskedInputIcon || /*#__PURE__*/_react["default"].createElement(_Calendar.Calendar, {
      size: iconSize
    }),
    margin: reverse ? {
      left: 'small'
    } : {
      right: 'small'
    }
  });

  var input = /*#__PURE__*/_react["default"].createElement(_Form.FormContext.Provider, {
    key: "input" // don't let MaskedInput drive the Form
    ,
    value: formContextValue
  }, /*#__PURE__*/_react["default"].createElement(_Keyboard.Keyboard, {
    onEsc: open ? function () {
      return closeCalendar();
    } : undefined,
    onSpace: function onSpace(event) {
      event.preventDefault();
      openCalendar();
    }
  }, /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    ref: containerRef,
    border: !plain,
    round: "xxsmall",
    direction: "row",
    fill: true
  }, reverse && calendarButton, /*#__PURE__*/_react["default"].createElement(_MaskedInput.MaskedInput, _extends({
    ref: ref,
    id: id,
    name: name,
    reverse: true,
    disabled: disabled,
    mask: mask,
    plain: true
  }, restOfInputProps, rest, {
    value: textValue,
    onChange: function onChange(event) {
      var nextTextValue = event.target.value;
      setTextValue(nextTextValue);
      var localTimestamp; // get the UTC timestamp relative to the user's timezone
      // once a date is complete

      if (timestamp === undefined && Date.parse(nextTextValue)) {
        var _Date$toISOString$spl = new Date(nextTextValue).toISOString().split('T');

        localTimestamp = _Date$toISOString$spl[1];
      } // timestamp will be undefined if no defaultValue or value have
      // been passed in, indicating that we should stay local


      var nextNormalize = normalize;

      if (timestamp === undefined) {
        nextNormalize = false;
        setNormalize(nextNormalize);
      }

      var nextValue = (0, _utils3.textToValue)(nextTextValue, schema, range, timestamp || localTimestamp, nextNormalize); // reset to original state

      if (nextValue === undefined) setNormalize(true); // update value even when undefined

      setValue(nextValue);

      if (_onChange) {
        event.persist(); // extract from React synthetic event pool

        var adjustedEvent = event;
        adjustedEvent.value = nextValue;

        _onChange(adjustedEvent);
      }
    },
    onFocus: function onFocus(event) {
      announce(formatMessage({
        id: 'dateInput.openCalendar',
        messages: messages
      }));
      if (_onFocus) _onFocus(event);
    }
  })), !reverse && calendarButton)));

  if (inline) {
    return /*#__PURE__*/_react["default"].createElement(_Box.Box, null, input, calendar);
  }

  if (open) {
    return [input, /*#__PURE__*/_react["default"].createElement(_Keyboard.Keyboard, {
      key: "drop",
      onEsc: function onEsc() {
        return ref.current.focus();
      }
    }, /*#__PURE__*/_react["default"].createElement(_Drop.Drop, _extends({
      overflow: "visible",
      id: id ? id + "__drop" : undefined,
      target: containerRef.current,
      align: _extends({}, calendarDropdownAlign, dropProps),
      onEsc: closeCalendar,
      onClickOutside: function onClickOutside(_ref4) {
        var target = _ref4.target;

        if (target !== containerRef.current && !containerRef.current.contains(target)) {
          closeCalendar();
        }
      }
    }, dropProps), calendar))];
  }

  return input;
});
exports.DateInput = DateInput;
DateInput.displayName = 'DateInput';
DateInput.propTypes = _propTypes.DateInputPropTypes;