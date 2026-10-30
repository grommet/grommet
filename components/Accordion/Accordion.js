"use strict";

exports.__esModule = true;
exports.Accordion = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = require("./propTypes");
var _Box = require("../Box");
var _AccordionContext = require("./AccordionContext");
var _excluded = ["activeIndex", "animate", "children", "level", "multiple", "onActive"]; // SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var activeAsArray = function activeAsArray(active) {
  return typeof active === 'number' ? [active] : active;
};
var Accordion = exports.Accordion = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var activeIndex = _ref.activeIndex,
    _ref$animate = _ref.animate,
    animate = _ref$animate === void 0 ? true : _ref$animate,
    children = _ref.children,
    level = _ref.level,
    multiple = _ref.multiple,
    onActive = _ref.onActive,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useState = (0, _react.useState)([]),
    activeIndexes = _useState[0],
    setActiveIndexes = _useState[1];
  var _useState2 = (0, _react.useState)(),
    stateActiveIndex = _useState2[0],
    setStateActiveIndex = _useState2[1];

  // Derived state from props
  // https://reactjs.org/docs/hooks-faq.html#how-do-i-implement-getderivedstatefromprops
  var derivedActiveIndexes = activeAsArray(activeIndex) || [];
  if ((typeof activeIndex !== 'undefined' || activeIndex !== stateActiveIndex) && derivedActiveIndexes.join() !== activeIndexes.join()) {
    setActiveIndexes(derivedActiveIndexes);
    setStateActiveIndex(activeIndex);
  }
  var getAccordionContext = (0, _react.useCallback)(function (index) {
    var _onPanelChange = function onPanelChange(nextIndex) {
      var nextActiveIndexes = [].concat(activeIndexes || []);
      var nextActiveIndex = nextActiveIndexes.indexOf(nextIndex);
      if (nextActiveIndex > -1) {
        nextActiveIndexes.splice(nextActiveIndex, 1);
      } else if (multiple) {
        nextActiveIndexes.push(nextIndex);
      } else {
        nextActiveIndexes = [nextIndex];
      }
      setActiveIndexes(nextActiveIndexes);
      if (onActive) {
        onActive(nextActiveIndexes);
      }
    };
    return {
      active: activeIndexes.indexOf(index) > -1,
      animate: animate,
      level: level,
      onPanelChange: function onPanelChange() {
        return _onPanelChange(index);
      }
    };
  }, [activeIndexes, animate, level, multiple, onActive]);
  return /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({
    ref: ref
  }, rest), _react.Children.toArray(children).filter(function (child) {
    return child;
  }).map(function (child, index) {
    return /*#__PURE__*/_react["default"].createElement(_AccordionContext.AccordionContext.Provider, {
      // eslint-disable-next-line react/no-array-index-key
      key: index,
      value: getAccordionContext(index)
    }, child);
  }));
});
Accordion.propTypes = _propTypes.AccordionPropTypes;