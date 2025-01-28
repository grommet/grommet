var _excluded = ["defaultValue", "multiple", "options", "onToggle", "value"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React, { useCallback, useState, useRef, useMemo } from 'react';
import { Box } from '../Box';
import { Keyboard } from '../Keyboard';
import { ToggleGroupPropTypes } from './propTypes';
import { StyledButton, StyledBox } from './StyledToggleGroup';
import { useThemeValue } from '../../utils/useThemeValue';
var useControlled = function useControlled(_ref) {
  var prop = _ref.prop,
    defaultProp = _ref.defaultProp,
    _ref$onChange = _ref.onChange,
    onChange = _ref$onChange === void 0 ? function () {} : _ref$onChange;
  var _useState = useState(defaultProp),
    uncontrolledProp = _useState[0],
    setUncontrolledProp = _useState[1];
  var controlled = prop !== undefined;
  var value = controlled ? prop : uncontrolledProp;
  var handleChange = useCallback(onChange, [onChange]);
  var setValue = useCallback(function (event) {
    // only update internal value in uncontrolled cases
    if (!controlled) {
      setUncontrolledProp(event.value);
    }
    handleChange(event);
  }, [controlled, setUncontrolledProp, handleChange]);
  return [value, setValue];
};
var ToggleGroup = function ToggleGroup(_ref2) {
  var defaultValue = _ref2.defaultValue,
    multiple = _ref2.multiple,
    options = _ref2.options,
    onToggle = _ref2.onToggle,
    valueProp = _ref2.value,
    rest = _objectWithoutPropertiesLoose(_ref2, _excluded);
  var _useControlled = useControlled({
      prop: valueProp,
      defaultProp: defaultValue,
      onChange: onToggle
    }),
    _useControlled$ = _useControlled[0],
    value = _useControlled$ === void 0 ? multiple ? [] : '' : _useControlled$,
    setValue = _useControlled[1];
  var _useThemeValue = useThemeValue(),
    theme = _useThemeValue.theme,
    passThemeFlag = _useThemeValue.passThemeFlag;
  var ref = useRef();
  var buttonRefs = useRef([]);
  var values = options == null ? void 0 : options.map(function (option) {
    return typeof option === 'object' ? option.value : option;
  });
  var getFocusableIndex = useCallback(function () {
    var defaultIndex = 0;
    if (value.length) {
      // set earliest button that's part of value to active
      // assume that value might not be ordered the same as options
      defaultIndex = values.indexOf(values.find(function (option) {
        return value.includes(option);
      }));
    }
    return defaultIndex;
  }, [value, values]);
  var _useState2 = useState(function () {
      return getFocusableIndex();
    }),
    focusableIndex = _useState2[0],
    setFocusableIndex = _useState2[1];
  var onNext = function onNext(e) {
    // prevent page scroll
    e.preventDefault();
    var nextIndex = focusableIndex + 1 <= options.length - 1 ? focusableIndex + 1 : 0;
    setFocusableIndex(nextIndex);
    buttonRefs.current[nextIndex].focus();
  };
  var onPrevious = function onPrevious(e) {
    // prevent page scroll
    e.preventDefault();
    var nextIndex = focusableIndex - 1 >= 0 ? focusableIndex - 1 : options.length - 1;
    setFocusableIndex(nextIndex);
    buttonRefs.current[nextIndex].focus();
  };
  var handleToggle = function handleToggle(event, option) {
    var adjustedEvent = event;
    var nextValue;
    if (!multiple) {
      nextValue = option;
    } else {
      nextValue = value.includes(option) ? value.filter(function (item) {
        return item !== option;
      }) : [].concat(value, [option]);
    }
    adjustedEvent.value = nextValue;
    setValue(adjustedEvent);
  };

  // if caller defines a button "kind", respect that kind style
  var kind = useMemo(function () {
    return theme.toggleGroup.button.kind;
  }, [theme.toggleGroup.button]);
  return /*#__PURE__*/React.createElement(Keyboard, {
    onUp: onPrevious,
    onDown: onNext,
    onLeft: onPrevious,
    onRight: onNext
  }, /*#__PURE__*/React.createElement(StyledBox, _extends({
    ref: ref,
    alignSelf: "start",
    direction: "row",
    flex: false,
    onBlur: function onBlur(e) {
      if (!(ref != null && ref.current.contains(e.relatedTarget))) {
        setFocusableIndex(getFocusableIndex());
      }
    }
  }, theme.toggleGroup.container, {
    // match button rounding
    responsive: false,
    role: multiple ? 'group' : 'radiogroup'
  }, rest), options == null ? void 0 : options.map(function (option, index) {
    var label;
    var icon;
    var optionValue;
    var tip;
    if (typeof option === 'object') {
      icon = option.icon;
      label = option.label;
      tip = option.tip;
      optionValue = option.value;
    } else {
      label = option;
      optionValue = option;
    }
    var active = Array.isArray(value) ? !!value.includes(optionValue) : value === optionValue;
    var round;
    if (!kind) {
      var _theme$toggleGroup$bu;
      if ((_theme$toggleGroup$bu = theme.toggleGroup.button.border) != null && _theme$toggleGroup$bu.radius) {
        round = theme.toggleGroup.button.border.radius;
      } else if (typeof theme.toggleGroup.container.round === 'string' && (index === 0 || index === options.length - 1)) {
        // round corners of first and last buttons to match container
        round = {
          corner: index === 0 ? 'left' : 'right',
          size: theme.toggleGroup.container.round
        };
      } else round = 0;
    }
    return /*#__PURE__*/React.createElement(Box, {
      border: index < options.length - 1 && theme.toggleGroup.divider ? {
        side: 'right',
        color: theme.toggleGroup.divider.color
      } : undefined,
      key: optionValue || index
    }, /*#__PURE__*/React.createElement(StyledButton, _extends({
      active: active,
      "aria-pressed": multiple ? active : undefined,
      "aria-checked": !multiple ? active : undefined,
      icon: icon,
      kind: kind,
      label: label,
      tip: tip,
      onClick: function onClick(event) {
        return handleToggle(event, optionValue);
      },
      ref: function ref(r) {
        buttonRefs.current[index] = r;
      },
      role: !multiple ? 'radio' : undefined,
      round: round,
      tabIndex: index === focusableIndex ? '0' : '-1'
    }, passThemeFlag)));
  })));
};
ToggleGroup.displayName = 'ToggleGroup';
ToggleGroup.propTypes = ToggleGroupPropTypes;
export { ToggleGroup };