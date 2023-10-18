"use strict";

exports.__esModule = true;
exports["default"] = exports.Paginated = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
var _Cards = require("../Cards");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var data = [];
for (var i = 0; i < 95; i += 1) {
  data.push("item " + (i + 1));
}
var Paginated = exports.Paginated = function Paginated() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grid, {
    pad: "large",
    columns: [['medium', 'large']],
    justifyContent: "center"
  }, /*#__PURE__*/_react["default"].createElement(_Cards.Cards, {
    data: data,
    step: 9,
    show: {
      page: 7
    },
    paginate: true
  }));
};
var _default = exports["default"] = {
  title: 'Visualizations/Cards/Paginated'
};