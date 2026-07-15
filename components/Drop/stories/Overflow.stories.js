"use strict";

exports.__esModule = true;
exports["default"] = exports.Overflow = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var align = {
  top: 'bottom',
  left: 'left'
};
var OverflowDrop = function OverflowDrop() {
  var targetRef = (0, _react.useRef)();
  var inputRef = (0, _react.useRef)();
  var _useState = (0, _react.useState)(undefined),
    date = _useState[0],
    setDate = _useState[1];
  var _useState2 = (0, _react.useState)(false),
    showCalendar = _useState2[0],
    setShowCalendar = _useState2[1];
  var onSelect = function onSelect(nextDate) {
    setDate(nextDate !== date ? nextDate : undefined);
    setShowCalendar(false);
  };
  var _useState3 = (0, _react.useState)(false),
    setShowDrop = _useState3[1];
  (0, _react.useEffect)(function () {
    return setShowDrop(true);
  }, []);
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      fill: true,
      align: "center",
      justify: "center"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      background: "dark-2",
      pad: "medium",
      align: "center",
      justify: "start",
      ref: targetRef
    }, "Target"), targetRef.current && /*#__PURE__*/_react["default"].createElement(_grommet.Drop, {
      responsive: false,
      overflow: "unset",
      align: align,
      target: targetRef.current,
      onClose: function onClose() {
        return setShowCalendar(false);
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      pad: "small",
      height: "small"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
      level: 4
    }, "Select Start Date"), /*#__PURE__*/_react["default"].createElement("div", {
      style: {
        position: 'relative'
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
      ref: inputRef,
      value: date || '',
      placeholder: "Focus on me",
      onFocus: function onFocus() {
        return setShowCalendar(true);
      }
    }), showCalendar && /*#__PURE__*/_react["default"].createElement("div", {
      style: {
        position: 'absolute',
        background: '#eee'
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Calendar, {
      date: date,
      onSelect: onSelect,
      size: "small"
    }))))))
    // </Grommet>
  );
};
var Overflow = exports.Overflow = function Overflow() {
  return /*#__PURE__*/_react["default"].createElement(OverflowDrop, null);
};
Overflow.parameters = {
  chromatic: {
    disable: true
  }
};
Overflow.args = {
  full: true
};
var _default = exports["default"] = {
  title: 'Controls/Drop/Overflow'
};