"use strict";

exports.__esModule = true;
exports["default"] = exports.ShowAdjacent = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _Box = require("../../Box");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure " + obj); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var Container = function Container(_ref) {
  var rest = _extends({}, (_objectDestructuringEmpty(_ref), _ref));
  return /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({
    align: "center",
    border: true,
    gap: "small",
    pad: "medium"
  }, rest));
};
var ShowAdjacent = exports.ShowAdjacent = function ShowAdjacent() {
  var _useState = (0, _react.useState)(new Date(2020, 6, 15).toDateString()),
    date = _useState[0],
    setDate = _useState[1];
  var onSelect = function onSelect(nextDate) {
    setDate(nextDate !== date ? nextDate : undefined);
  };
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Grid, {
      columns: {
        count: 'fit',
        size: ['small', 'auto']
      },
      gap: "medium"
    }, /*#__PURE__*/_react["default"].createElement(Container, null, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      size: "small"
    }, "showAdjacentDays = false"), /*#__PURE__*/_react["default"].createElement(_grommet.Calendar, {
      date: date,
      onSelect: onSelect,
      size: "small",
      bounds: ['2018-09-08', '2020-12-13'],
      showAdjacentDays: false
    })), /*#__PURE__*/_react["default"].createElement(Container, null, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      size: "small"
    }, "showAdjacentDays = true"), /*#__PURE__*/_react["default"].createElement(_grommet.Calendar, {
      date: date,
      onSelect: onSelect,
      size: "small",
      bounds: ['2018-09-08', '2020-12-13']
    })), /*#__PURE__*/_react["default"].createElement(Container, null, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      size: "small"
    }, "showAdjacentDays = \"trim\""), /*#__PURE__*/_react["default"].createElement(_grommet.Calendar, {
      date: date,
      onSelect: onSelect,
      size: "small",
      bounds: ['2018-09-08', '2020-12-13'],
      showAdjacentDays: "trim"
    })))
    // </Grommet>
  );
};

ShowAdjacent.storyName = 'Show adjacent days';
var _default = exports["default"] = {
  title: "Visualizations/Calendar/Show adjacent days"
};