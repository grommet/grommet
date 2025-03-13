"use strict";

exports.__esModule = true;
exports.DateInput = void 0;
var _react = _interopRequireWildcard(require("react"));
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _Calendar = require("grommet-icons/icons/Calendar");
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
var _readOnly = require("../../utils/readOnly");
var _utils2 = require("./utils");
var _propTypes = require("./propTypes");
var _Calendar3 = require("../Calendar/Calendar");
var _CopyButton = require("../TextInput/CopyButton");
var _useThemeValue2 = require("../../utils/useThemeValue");
var _excluded = ["buttonProps", "calendarProps", "defaultValue", "disabled", "dropProps", "format", "id", "icon", "inline", "inputProps", "name", "onChange", "onFocus", "plain", "readOnly", "readOnlyCopy", "reverse", "value", "messages"],
  _excluded2 = ["icon"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var StyledDateInputContainer = (0, _styledComponents["default"])(_Box.Box).withConfig({
  // to not pass props on dom through Box
  shouldForwardProp: function shouldForwardProp(prop) {
    return prop !== 'disabled';
  }
}).withConfig({
  displayName: "DateInput__StyledDateInputContainer",
  componentId: "sc-1jfta23-0"
})(["", " ", "}"], function (props) {
  return props.disabled && (0, _utils.disabledStyle)();
}, function (props) {
  return props.readOnlyProp && (0, _readOnly.readOnlyStyle)(props.theme);
});
var getReference = function getReference(value) {
  var adjustedDate;
  var res;
  if (typeof value === 'string') res = value;else if (Array.isArray(value) && Array.isArray(value[0])) res = value[0].find(function (date) {
    return date;
  });else if (Array.isArray(value) && value.length) {
    res = value[0];
  }
  if (res) {
    adjustedDate = (0, _utils.setHoursWithOffset)(res);
  }
  return adjustedDate;
};
var DateInput = exports.DateInput = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, refArg) {
  var _theme$icon, _theme$dateInput$icon;
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
    readOnlyProp = _ref.readOnly,
    readOnlyCopy = _ref.readOnlyCopy,
    _ref$reverse = _ref.reverse,
    reverseProp = _ref$reverse === void 0 ? false : _ref$reverse,
    valueArg = _ref.value,
    messages = _ref.messages,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme,
    passThemeFlag = _useThemeValue.passThemeFlag;
  var announce = (0, _react.useContext)(_AnnounceContext.AnnounceContext);
  var _useContext = (0, _react.useContext)(_MessageContext.MessageContext),
    formatMessage = _useContext.format;
  var iconSize = ((_theme$icon = theme.icon) == null ? void 0 : _theme$icon.matchSize) && rest.size || ((_theme$dateInput$icon = theme.dateInput.icon) == null ? void 0 : _theme$dateInput$icon.size) || 'medium';
  var _useContext2 = (0, _react.useContext)(_Form.FormContext),
    useFormInput = _useContext2.useFormInput;
  var ref = (0, _utils.useForwardedRef)(refArg);
  var containerRef = (0, _react.useRef)();
  var readOnly = readOnlyProp || readOnlyCopy;
  var _useFormInput = useFormInput({
      name: name,
      value: valueArg,
      initialValue: defaultValue
    }),
    value = _useFormInput[0],
    setValue = _useFormInput[1];
  var _useState = (0, _react.useState)((0, _Calendar3.getOutputFormat)(value)),
    outputFormat = _useState[0],
    setOutputFormat = _useState[1];
  (0, _react.useEffect)(function () {
    setOutputFormat(function (previousFormat) {
      var nextFormat = (0, _Calendar3.getOutputFormat)(value);
      // when user types, date could become something like 07//2020
      // and value becomes undefined. don't lose the format from the
      // previous valid date
      return previousFormat !== nextFormat ? previousFormat : nextFormat;
    });
  }, [value]);

  // keep track of timestamp from original date(s)
  var _useState2 = (0, _react.useState)(getReference(value)),
    reference = _useState2[0],
    setReference = _useState2[1];

  // do we expect multiple dates?
  var range = Array.isArray(value) || format && format.includes('-');

  // parse format and build a formal schema we can use elsewhere
  var schema = (0, _react.useMemo)(function () {
    return (0, _utils2.formatToSchema)(format);
  }, [format]);

  // mask is only used when a format is provided
  var mask = (0, _react.useMemo)(function () {
    return (0, _utils2.schemaToMask)(schema);
  }, [schema]);

  // textValue is only used when a format is provided
  var _useState3 = (0, _react.useState)(schema ? (0, _utils2.valueToText)(value, schema) : undefined),
    textValue = _useState3[0],
    setTextValue = _useState3[1];
  var readOnlyCopyValidation = formatMessage({
    id: 'input.readOnlyCopy.validation',
    messages: messages
  });
  var readOnlyCopyPrompt = formatMessage({
    id: 'input.readOnlyCopy.prompt',
    messages: messages
  });
  var _useState4 = (0, _react.useState)(readOnlyCopyPrompt),
    tip = _useState4[0],
    setTip = _useState4[1];

  // Setting the icon through `inputProps` is deprecated.
  // The `icon` prop should be used instead.
  var _ref2 = inputProps || {},
    MaskedInputIcon = _ref2.icon,
    restOfInputProps = _objectWithoutPropertiesLoose(_ref2, _excluded2);
  if (MaskedInputIcon) {
    console.warn("Customizing the DateInput icon through inputProps is deprecated.\nUse the icon prop instead.");
  }
  var reverse = reverseProp || restOfInputProps.reverse;
  var calendarDropdownAlign = {
    top: 'bottom',
    left: 'left'
  };

  // We need to distinguish between the caller changing a Form value
  // and the user typing a date that he isn't finished with yet.
  // To handle this, we see if we have a value and the text value
  // associated with it doesn't align to it, then we update the text value.
  // We compare using textToValue to avoid "06/01/2021" not
  // matching "06/1/2021".
  (0, _react.useEffect)(function () {
    if (schema && value !== undefined) {
      var nextTextValue = (0, _utils2.valueToText)(value, schema);
      if (!(0, _utils2.valuesAreEqual)((0, _utils2.textToValue)(textValue, schema, range, reference), (0, _utils2.textToValue)(nextTextValue, schema, range, reference)) || textValue === '' && nextTextValue !== '') {
        setTextValue(nextTextValue);
      }
    }
  }, [range, schema, textValue, reference, value]);

  // textValue of MaskedInput is controlled.
  // for uncontrolled forms, ensure the reset event
  // resets the textValue
  (0, _react.useEffect)(function () {
    var _ref$current;
    var form = ref == null || (_ref$current = ref.current) == null ? void 0 : _ref$current.form;
    var handleFormReset = function handleFormReset(e) {
      if (schema && ref.current && e.target.contains(ref.current)) {
        setTextValue('');
      }
    };
    // place the listener on the form directly. if listener is on window,
    // the event could get blocked if caller has e.stopPropagation(), etc. in
    // their form onReset
    form == null || form.addEventListener('reset', handleFormReset);
    return function () {
      return form == null ? void 0 : form.removeEventListener('reset', handleFormReset);
    };
  }, [schema, ref]);

  // when format and not inline, whether to show the Calendar in a Drop
  var _useState5 = (0, _react.useState)(),
    open = _useState5[0],
    setOpen = _useState5[1];
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
  var dates = (0, _react.useMemo)(function () {
    return range && value != null && value.length ? [value] : undefined;
  }, [range, value]);
  var calendar = /*#__PURE__*/_react["default"].createElement(_Calendar2.Calendar, _extends({
    ref: inline ? ref : undefined,
    id: inline && !format ? id : undefined,
    range: range,
    date: range ? undefined : value
    // when caller initializes with empty array, dates should be undefined
    // allowing the user to select both begin and end of the range
    ,
    dates: dates
    // places focus on days grid when Calendar opens
    ,
    initialFocus: open ? 'days' : undefined,
    onSelect: disabled ? undefined : function (nextValue) {
      var normalizedValue;
      if (range && Array.isArray(nextValue)) {
        normalizedValue = nextValue[0];
      } // clicking an edge date removes it
      else if (range && nextValue) normalizedValue = [nextValue, nextValue];else normalizedValue = nextValue;
      if (schema) setTextValue((0, _utils2.valueToText)(normalizedValue, schema));
      setValue(normalizedValue);
      setReference(getReference(nextValue));
      if (_onChange) _onChange({
        value: normalizedValue
      });
      if (open && !range) {
        closeCalendar();
        setTimeout(function () {
          var _ref$current2;
          return (_ref$current2 = ref.current) == null ? void 0 : _ref$current2.focus();
        }, 1);
      }
    }
  }, calendarProps));
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
  var onClickCopy = function onClickCopy() {
    global.navigator.clipboard.writeText(textValue);
    announce(readOnlyCopyValidation, 'assertive');
    setTip(readOnlyCopyValidation);
  };
  var onBlurCopy = function onBlurCopy() {
    if (tip === readOnlyCopyValidation) setTip(readOnlyCopyPrompt);
  };
  var DateInputButton = readOnlyCopy ? /*#__PURE__*/_react["default"].createElement(_CopyButton.CopyButton, {
    onBlurCopy: onBlurCopy,
    onClickCopy: onClickCopy,
    readOnlyCopyPrompt: readOnlyCopyPrompt,
    tip: tip,
    value: value
  }) : /*#__PURE__*/_react["default"].createElement(_Button.Button, {
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
    key: "input"
    // don't let MaskedInput drive the Form
    ,
    value: formContextValue
  }, /*#__PURE__*/_react["default"].createElement(_Keyboard.Keyboard, {
    onEsc: open ? function () {
      return closeCalendar();
    } : undefined,
    onSpace: function onSpace(event) {
      if (!readOnlyCopy) {
        event.preventDefault();
        if (!readOnly) openCalendar();
      }
    }
  }, /*#__PURE__*/_react["default"].createElement(StyledDateInputContainer, _extends({
    ref: containerRef,
    border: !plain,
    round: theme.dateInput.container.round,
    direction: "row",
    disabled: disabled
    // readOnly prop shouldn't get passed to the dom here
    ,
    readOnlyProp: readOnly,
    fill: true
  }, passThemeFlag), reverse && (!readOnly || readOnlyCopy) && DateInputButton, /*#__PURE__*/_react["default"].createElement(_MaskedInput.MaskedInput, _extends({
    readOnly: readOnly,
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
      var nextValue = (0, _utils2.textToValue)(nextTextValue, schema, range, reference, outputFormat);
      var validatedNextValue = (0, _utils2.validateBounds)(calendarProps == null ? void 0 : calendarProps.bounds, nextValue);
      if (!validatedNextValue && nextValue) {
        setTextValue('');
      }
      if (validatedNextValue !== undefined) setReference(getReference(validatedNextValue));
      // update value even when undefined
      setValue(validatedNextValue);
      if (_onChange) {
        event.persist(); // extract from React synthetic event pool
        var adjustedEvent = event;
        adjustedEvent.value = validatedNextValue;
        _onChange(adjustedEvent);
      }
    },
    onFocus: function onFocus(event) {
      if (!readOnly) {
        announce(formatMessage({
          id: 'dateInput.openCalendar',
          messages: messages
        }));
      }
      if (_onFocus) _onFocus(event);
    }
  })), !reverse && (!readOnly || readOnlyCopy) && DateInputButton)));
  if (inline) {
    return /*#__PURE__*/_react["default"].createElement(_Box.Box, null, input, calendar);
  }
  if (open && !readOnly) {
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
DateInput.displayName = 'DateInput';
DateInput.propTypes = _propTypes.DateInputPropTypes;