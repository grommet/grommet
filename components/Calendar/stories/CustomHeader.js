"use strict";

exports.__esModule = true;
exports["default"] = exports.CustomHeaderCalendar = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _grommetIcons = require("grommet-icons");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var CustomHeaderCalendar = exports.CustomHeaderCalendar = function CustomHeaderCalendar() {
  var _useState = (0, _react.useState)(),
    date = _useState[0],
    setDate = _useState[1];
  var onSelect = function onSelect(nextDate) {
    setDate(nextDate !== date ? nextDate : undefined);
  };
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      align: "center",
      pad: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Calendar, {
      date: date,
      onSelect: onSelect,
      size: "small",
      bounds: ['2020-09-08', '2025-12-13'],
      header: function header(_ref) {
        var currentDate = _ref.date,
          locale = _ref.locale,
          onPreviousMonth = _ref.onPreviousMonth,
          onNextMonth = _ref.onNextMonth,
          previousInBound = _ref.previousInBound,
          nextInBound = _ref.nextInBound;
        return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
          direction: "row",
          align: "center",
          justify: "between"
        }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
          disabled: !previousInBound,
          onClick: onPreviousMonth
        }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, null, /*#__PURE__*/_react["default"].createElement(_grommetIcons.FormPreviousLink, null))), /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
          size: "small"
        }, /*#__PURE__*/_react["default"].createElement("strong", null, currentDate.toLocaleDateString(locale, {
          month: 'long',
          year: 'numeric'
        }))), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
          disabled: !nextInBound,
          onClick: onNextMonth
        }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, null, /*#__PURE__*/_react["default"].createElement(_grommetIcons.FormNextLink, null))));
      }
    }))
    // </Grommet>
  );
};

CustomHeaderCalendar.storyName = 'Header';
var _default = exports["default"] = {
  title: 'Visualizations/Calendar/Header'
};