"use strict";

exports.__esModule = true;
exports.ToggleGroup = void 0;
var _react = _interopRequireWildcard(require("react"));
var _styledComponents = require("styled-components");
var _Box = require("../Box");
var _Keyboard = require("../Keyboard");
var _propTypes = require("./propTypes");
var _StyledToggleGroup = require("./StyledToggleGroup");
var _excluded = ["defaultValue", "multiple", "options", "onToggle", "value"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var useControlled = function useControlled(_ref) {
  var prop = _ref.prop,
    defaultProp = _ref.defaultProp,
    _ref$onChange = _ref.onChange,
    onChange = _ref$onChange === void 0 ? function () {} : _ref$onChange;
  var _useState = (0, _react.useState)(defaultProp),
    uncontrolledProp = _useState[0],
    setUncontrolledProp = _useState[1];
  var controlled = prop !== undefined;
  var value = controlled ? prop : uncontrolledProp;
  var handleChange = (0, _react.useCallback)(onChange, [onChange]);
  var setValue = (0, _react.useCallback)(function (event) {
    // only update internal value in uncontrolled cases
    if (!controlled) {
      setUncontrolledProp(event.value);
    }
    handleChange(event);
  }, [controlled, setUncontrolledProp, handleChange]);
  return [value, setValue];
};
var ToggleGroup = exports.ToggleGroup = function ToggleGroup(_ref2) {
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
  var theme = (0, _react.useContext)(_styledComponents.ThemeContext);
  var ref = (0, _react.useRef)();
  var buttonRefs = (0, _react.useRef)([]);
  var values = options.map(function (option) {
    return typeof option === 'object' ? option.value : option;
  });
  var getFocusableIndex = (0, _react.useCallback)(function () {
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
  var _useState2 = (0, _react.useState)(function () {
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
  return /*#__PURE__*/_react["default"].createElement(_Keyboard.Keyboard, {
    onUp: onPrevious,
    onDown: onNext,
    onLeft: onPrevious,
    onRight: onNext
  }, /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({
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
  }, rest), options.map(function (option, index) {
    var label;
    var icon;
    var optionValue;
    if (typeof option === 'object') {
      icon = option.icon;
      label = option.label;
      optionValue = option.value;
    } else {
      label = option;
      optionValue = option;
    }
    var active = Array.isArray(value) ? !!value.includes(optionValue) : value === optionValue;
    var round = 0;
    // round corners of first and last buttons to match container
    if (typeof theme.toggleGroup.container.round === 'string' && (index === 0 || index === options.length - 1)) {
      round = {
        corner: index === 0 ? 'left' : 'right',
        size: theme.toggleGroup.container.round
      };
    }
    return /*#__PURE__*/_react["default"].createElement(_Box.Box, {
      border: index < options.length - 1 ? {
        side: 'right',
        color: theme.toggleGroup.divider.color
      } : undefined,
      key: optionValue || index
    }, /*#__PURE__*/_react["default"].createElement(_StyledToggleGroup.StyledButton, {
      active: active,
      "aria-pressed": multiple && active,
      "aria-checked": !multiple && active,
      icon: icon,
      label: label,
      onClick: function onClick(event) {
        return handleToggle(event, optionValue);
      },
      ref: function ref(r) {
        buttonRefs.current[index] = r;
      },
      role: !multiple ? 'radio' : undefined,
      round: round,
      tabIndex: index === focusableIndex ? '0' : '-1'
    }));
  })));
};
ToggleGroup.displayName = 'ToggleGroup';
ToggleGroup.propTypes = _propTypes.ToggleGroupPropTypes;