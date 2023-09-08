var _excluded = ["buttonProps", "calendarProps", "defaultValue", "disabled", "dropProps", "format", "id", "icon", "inline", "inputProps", "name", "onChange", "onFocus", "plain", "reverse", "value", "messages"],
  _excluded2 = ["icon"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React, { useRef, forwardRef, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { ThemeContext } from 'styled-components';
import { Calendar as CalendarIcon } from 'grommet-icons/icons/Calendar';
import { defaultProps } from '../../default-props';
import { AnnounceContext } from '../../contexts/AnnounceContext';
import { MessageContext } from '../../contexts/MessageContext';
import { Box } from '../Box';
import { Button } from '../Button';
import { Calendar } from '../Calendar';
import { Drop } from '../Drop';
import { DropButton } from '../DropButton';
import { FormContext } from '../Form';
import { Keyboard } from '../Keyboard';
import { MaskedInput } from '../MaskedInput';
import { useForwardedRef, setHoursWithOffset } from '../../utils';
import { formatToSchema, schemaToMask, valuesAreEqual, valueToText, textToValue, validateBounds } from './utils';
import { DateInputPropTypes } from './propTypes';
import { getOutputFormat } from '../Calendar/Calendar';
var getReference = function getReference(value) {
  var adjustedDate;
  var res;
  if (typeof value === 'string') res = value;else if (Array.isArray(value) && Array.isArray(value[0])) res = value[0].find(function (date) {
    return date;
  });else if (Array.isArray(value) && value.length) {
    res = value[0];
  }
  if (res) {
    adjustedDate = setHoursWithOffset(res);
  }
  return adjustedDate;
};
var DateInput = /*#__PURE__*/forwardRef(function (_ref, refArg) {
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
    _ref$reverse = _ref.reverse,
    reverseProp = _ref$reverse === void 0 ? false : _ref$reverse,
    valueArg = _ref.value,
    messages = _ref.messages,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var theme = useContext(ThemeContext) || defaultProps.theme;
  var announce = useContext(AnnounceContext);
  var _useContext = useContext(MessageContext),
    formatMessage = _useContext.format;
  var iconSize = ((_theme$icon = theme.icon) == null ? void 0 : _theme$icon.matchSize) && rest.size || ((_theme$dateInput$icon = theme.dateInput.icon) == null ? void 0 : _theme$dateInput$icon.size) || 'medium';
  var _useContext2 = useContext(FormContext),
    useFormInput = _useContext2.useFormInput;
  var ref = useForwardedRef(refArg);
  var containerRef = useRef();
  var _useFormInput = useFormInput({
      name: name,
      value: valueArg,
      initialValue: defaultValue
    }),
    value = _useFormInput[0],
    setValue = _useFormInput[1];
  var _useState = useState(getOutputFormat(value)),
    outputFormat = _useState[0],
    setOutputFormat = _useState[1];
  useEffect(function () {
    setOutputFormat(function (previousFormat) {
      var nextFormat = getOutputFormat(value);
      // when user types, date could become something like 07//2020
      // and value becomes undefined. don't lose the format from the
      // previous valid date
      return previousFormat !== nextFormat ? previousFormat : nextFormat;
    });
  }, [value]);

  // keep track of timestamp from original date(s)
  var _useState2 = useState(getReference(value)),
    reference = _useState2[0],
    setReference = _useState2[1];

  // do we expect multiple dates?
  var range = Array.isArray(value) || format && format.includes('-');

  // parse format and build a formal schema we can use elsewhere
  var schema = useMemo(function () {
    return formatToSchema(format);
  }, [format]);

  // mask is only used when a format is provided
  var mask = useMemo(function () {
    return schemaToMask(schema);
  }, [schema]);

  // textValue is only used when a format is provided
  var _useState3 = useState(schema ? valueToText(value, schema) : undefined),
    textValue = _useState3[0],
    setTextValue = _useState3[1];

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
  useEffect(function () {
    if (schema && value !== undefined) {
      var nextTextValue = valueToText(value, schema);
      if (!valuesAreEqual(textToValue(textValue, schema, range, reference), textToValue(nextTextValue, schema, range, reference)) || textValue === '' && nextTextValue !== '') {
        setTextValue(nextTextValue);
      }
    }
  }, [range, schema, textValue, reference, value]);

  // textValue of MaskedInput is controlled.
  // for uncontrolled forms, ensure the reset event
  // resets the textValue
  useEffect(function () {
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
  var _useState4 = useState(),
    open = _useState4[0],
    setOpen = _useState4[1];
  var openCalendar = useCallback(function () {
    setOpen(true);
    announce(formatMessage({
      id: 'dateInput.enterCalendar',
      messages: messages
    }));
  }, [announce, formatMessage, messages]);
  var closeCalendar = useCallback(function () {
    setOpen(false);
    announce(formatMessage({
      id: 'dateInput.exitCalendar',
      messages: messages
    }));
  }, [announce, formatMessage, messages]);
  var dates = useMemo(function () {
    return range && value != null && value.length ? [value] : undefined;
  }, [range, value]);
  var calendar = /*#__PURE__*/React.createElement(Calendar, _extends({
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
      if (schema) setTextValue(valueToText(normalizedValue, schema));
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
  var formContextValue = useMemo(function () {
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
    return /*#__PURE__*/React.createElement(DropButton, _extends({
      ref: ref,
      id: id,
      dropProps: _extends({
        align: calendarDropdownAlign
      }, dropProps),
      dropContent: calendar,
      icon: icon || MaskedInputIcon || /*#__PURE__*/React.createElement(CalendarIcon, {
        size: iconSize
      })
    }, buttonProps));
  }
  var calendarButton = /*#__PURE__*/React.createElement(Button, {
    onClick: open ? closeCalendar : openCalendar,
    plain: true,
    icon: icon || MaskedInputIcon || /*#__PURE__*/React.createElement(CalendarIcon, {
      size: iconSize
    }),
    margin: reverse ? {
      left: 'small'
    } : {
      right: 'small'
    }
  });
  var input = /*#__PURE__*/React.createElement(FormContext.Provider, {
    key: "input"
    // don't let MaskedInput drive the Form
    ,
    value: formContextValue
  }, /*#__PURE__*/React.createElement(Keyboard, {
    onEsc: open ? function () {
      return closeCalendar();
    } : undefined,
    onSpace: function onSpace(event) {
      event.preventDefault();
      openCalendar();
    }
  }, /*#__PURE__*/React.createElement(Box, {
    ref: containerRef,
    border: !plain,
    round: theme.dateInput.container.round,
    direction: "row",
    fill: true
  }, reverse && calendarButton, /*#__PURE__*/React.createElement(MaskedInput, _extends({
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
      var nextValue = textToValue(nextTextValue, schema, range, reference, outputFormat);
      var validatedNextValue = validateBounds(calendarProps == null ? void 0 : calendarProps.bounds, nextValue);
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
      announce(formatMessage({
        id: 'dateInput.openCalendar',
        messages: messages
      }));
      if (_onFocus) _onFocus(event);
    }
  })), !reverse && calendarButton)));
  if (inline) {
    return /*#__PURE__*/React.createElement(Box, null, input, calendar);
  }
  if (open) {
    return [input, /*#__PURE__*/React.createElement(Keyboard, {
      key: "drop",
      onEsc: function onEsc() {
        return ref.current.focus();
      }
    }, /*#__PURE__*/React.createElement(Drop, _extends({
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
DateInput.propTypes = DateInputPropTypes;
export { DateInput };