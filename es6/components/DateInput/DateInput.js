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
import { useForwardedRef } from '../../utils';
import { getTimestamp, normalizeForTimezone } from '../Calendar/utils';
import { formatToSchema, schemaToMask, valuesAreEqual, valueToText, textToValue } from './utils';
import { DateInputPropTypes } from './propTypes';
var DateInput = /*#__PURE__*/forwardRef(function (_ref, refArg) {
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

  var iconSize = theme.dateInput.icon && theme.dateInput.icon.size || 'medium';

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

  var timestamp = useMemo(function () {
    if (Array.isArray(defaultValue) && defaultValue.length) return getTimestamp(defaultValue[0]);
    if (typeof defaultValue === 'string') return getTimestamp(defaultValue);
    if (Array.isArray(value) && value.length) return getTimestamp(value[0]); // check to see if value is not an empty string
    // empty string should behave like undefined

    if (typeof value === 'string' && value.length) return getTimestamp(value);
    return undefined;
  }, [defaultValue, value]); // whether or not we should normalize the date based on the timestamp.
  // will be set to false if the initial timestamp is undefined (meaning
  // a user did not provide a defaultValue or value). in this case, we
  // will just rely on the UTC timestamp and don't need to normalize.

  var _useState = useState(true),
      normalize = _useState[0],
      setNormalize = _useState[1]; // normalize value based on timestamp vs user's local timezone


  var normalizedDate = normalizeForTimezone(value, timestamp, normalize); // do we expect multiple dates?

  var range = Array.isArray(value) || format && format.includes('-'); // parse format and build a formal schema we can use elsewhere

  var schema = useMemo(function () {
    return formatToSchema(format);
  }, [format]); // mask is only used when a format is provided

  var mask = useMemo(function () {
    return schemaToMask(schema);
  }, [schema]); // textValue is only used when a format is provided

  var _useState2 = useState(schema ? valueToText(normalizedDate, schema) : undefined),
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

  useEffect(function () {
    if (schema && value !== undefined) {
      var nextTextValue = valueToText(normalizedDate, schema);

      if (!valuesAreEqual(textToValue(textValue, schema, range, timestamp), textToValue(nextTextValue, schema, range, timestamp)) || textValue === '' && nextTextValue !== '') {
        setTextValue(nextTextValue);
      }
    }
  }, [range, schema, textValue, value, normalizedDate, timestamp]); // when format and not inline, whether to show the Calendar in a Drop

  var _useState3 = useState(),
      open = _useState3[0],
      setOpen = _useState3[1];

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
  var calendar = /*#__PURE__*/React.createElement(Calendar, _extends({
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

      if (schema) setTextValue(valueToText(normalizeForTimezone(normalizedValue, undefined, nextNormalize), schema));
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
    key: "input" // don't let MaskedInput drive the Form
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
    round: "xxsmall",
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

      var nextValue = textToValue(nextTextValue, schema, range, timestamp || localTimestamp, nextNormalize); // reset to original state

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