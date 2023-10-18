"use strict";

exports.__esModule = true;
exports["default"] = exports.Overflow = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
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