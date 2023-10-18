"use strict";

exports.__esModule = true;
exports["default"] = exports.Multiple = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var Multiple = exports.Multiple = function Multiple() {
  var _useState = (0, _react.useState)([]),
    dates = _useState[0],
    setDates = _useState[1];
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      align: "center",
      pad: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Calendar, {
      dates: dates,
      onSelect: function onSelect(date) {
        var nextDates = [].concat(dates);
        var index = nextDates.indexOf(date);
        if (index === -1) {
          nextDates.push(date);
        } else {
          nextDates.splice(index, 1);
        }
        setDates(nextDates);
        console.log('Select iso date:', date, nextDates);
        console.log('Select utc date:', new Date(date));
      },
      bounds: ['2020-09-08', '2025-12-13']
    }))
    // </Grommet>
  );
};
var _default = exports["default"] = {
  title: 'Visualizations/Calendar/Multiple'
};