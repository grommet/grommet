var _excluded = ["buttonProps", "calendarProps", "defaultValue", "disabled", "dropProps", "format", "id", "inline", "inputProps", "name", "onChange", "onFocus", "value"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { forwardRef, useContext, useEffect, useMemo, useState } from 'react';
import { ThemeContext } from 'styled-components';
import { Calendar as CalendarIcon } from 'grommet-icons/icons/Calendar';
import { defaultProps } from '../../default-props';
import { Box } from '../Box';
import { Calendar } from '../Calendar';
import { Drop } from '../Drop';
import { DropButton } from '../DropButton';
import { FormContext } from '../Form';
import { Keyboard } from '../Keyboard';
import { MaskedInput } from '../MaskedInput';
import { useForwardedRef } from '../../utils';
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
      _ref$inline = _ref.inline,
      inline = _ref$inline === void 0 ? false : _ref$inline,
      inputProps = _ref.inputProps,
      name = _ref.name,
      _onChange = _ref.onChange,
      _onFocus = _ref.onFocus,
      valueArg = _ref.value,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded);

  var theme = useContext(ThemeContext) || defaultProps.theme;
  var iconSize = theme.dateInput.icon && theme.dateInput.icon.size || 'medium';

  var _useContext = useContext(FormContext),
      useFormInput = _useContext.useFormInput;

  var ref = useForwardedRef(refArg);

  var _useFormInput = useFormInput(name, valueArg, defaultValue),
      value = _useFormInput[0],
      setValue = _useFormInput[1]; // do we expect multiple dates?


  var range = Array.isArray(value) || format && format.includes('-'); // parse format and build a formal schema we can use elsewhere

  var schema = useMemo(function () {
    return formatToSchema(format);
  }, [format]); // mask is only used when a format is provided

  var mask = useMemo(function () {
    return schemaToMask(schema);
  }, [schema]); // textValue is only used when a format is provided

  var _useState = useState(schema ? valueToText(value, schema) : undefined),
      textValue = _useState[0],
      setTextValue = _useState[1]; // We need to distinguish between the caller changing a Form value
  // and the user typing a date that he isn't finished with yet.
  // To handle this, we see if we have a value and the text value
  // associated with it doesn't align to it, then we update the text value.
  // We compare using textToValue to avoid "06/01/2021" not
  // matching "06/1/2021".


  useEffect(function () {
    if (schema && value !== undefined) {
      var nextTextValue = valueToText(value, schema);

      if (!valuesAreEqual(textToValue(textValue, schema, value, range), textToValue(nextTextValue, schema, value, range))) {
        setTextValue(nextTextValue);
      }
    }
  }, [range, schema, textValue, value]); // when format and not inline, whether to show the Calendar in a Drop

  var _useState2 = useState(),
      open = _useState2[0],
      setOpen = _useState2[1];

  var calendar = /*#__PURE__*/React.createElement(Calendar, _extends({
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

      if (schema) setTextValue(valueToText(normalizedValue, schema));
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
    return /*#__PURE__*/React.createElement(DropButton, _extends({
      ref: ref,
      id: id,
      dropProps: _extends({
        align: {
          top: 'bottom',
          left: 'left'
        }
      }, dropProps),
      dropContent: calendar,
      icon: /*#__PURE__*/React.createElement(CalendarIcon, {
        size: iconSize
      })
    }, buttonProps));
  }

  var input = /*#__PURE__*/React.createElement(FormContext.Provider, {
    key: "input" // don't let MaskedInput drive the Form
    ,
    value: {
      useFormInput: function useFormInput(_, val) {
        return [val, function () {}];
      }
    }
  }, /*#__PURE__*/React.createElement(Keyboard, {
    onEsc: open ? function () {
      return setOpen(false);
    } : undefined
  }, /*#__PURE__*/React.createElement(MaskedInput, _extends({
    ref: ref,
    id: id,
    name: name,
    icon: /*#__PURE__*/React.createElement(CalendarIcon, {
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
      var nextValue = textToValue(nextTextValue, schema, value, range); // update value even when undefined

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
    return /*#__PURE__*/React.createElement(Box, null, input, calendar);
  }

  if (open) {
    return [input, /*#__PURE__*/React.createElement(Drop, _extends({
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
DateInput.displayName = 'DateInput';
DateInput.propTypes = DateInputPropTypes;
export { DateInput };