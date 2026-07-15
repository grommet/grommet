"use strict";

exports.__esModule = true;
exports["default"] = exports.PaginatedGrid = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var data = [];
for (var i = 0; i < 95; i += 1) {
  data.push({
    entry: "entry-" + (i + 1)
  });
}
var CardResult = function CardResult(_ref) {
  var item = _ref.item;
  return /*#__PURE__*/_react["default"].createElement(_grommet.Card, {
    fill: true,
    pad: "medium"
  }, item.entry);
};
var PaginatedGrid = exports.PaginatedGrid = function PaginatedGrid() {
  var _useState = (0, _react.useState)(data.slice(0, 10)),
    currentData = _useState[0],
    setCurrentData = _useState[1];
  var _useState2 = (0, _react.useState)([0, 10]),
    indices = _useState2[0],
    setIndices = _useState2[1];
  var handleChange = function handleChange(_ref2) {
    var startIndex = _ref2.startIndex,
      endIndex = _ref2.endIndex;
    var nextData = data.slice(startIndex, endIndex);
    setCurrentData(nextData);
    setIndices([startIndex, Math.min(endIndex, data.length)]);
  };
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      pad: "large",
      gap: "medium"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      height: {
        min: 'medium'
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Grid, {
      columns: "small",
      rows: "small",
      gap: "medium",
      justify: "center"
    }, currentData.map(function (datum) {
      return /*#__PURE__*/_react["default"].createElement(CardResult, {
        item: datum,
        key: datum.entry
      });
    }))), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      align: "center",
      direction: "row",
      justify: "between"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Showing ", indices[0] + 1, " - ", indices[1], " of ", data.length), /*#__PURE__*/_react["default"].createElement(_grommet.Pagination, {
      numberItems: data.length,
      onChange: handleChange
    })))
    // </Grommet>
  );
};
PaginatedGrid.storyName = 'Grid';
PaginatedGrid.args = {
  full: true
};
var _default = exports["default"] = {
  title: 'Controls/Pagination/Grid'
};