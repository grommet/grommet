"use strict";

exports.__esModule = true;
exports["default"] = exports.Children = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
var _Cards = require("../Cards");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var data = [{
  city: 'Boise',
  state: 'Idaho'
}, {
  city: 'Fort Collins',
  state: 'Colorado'
}, {
  city: 'Bay Area',
  state: 'California'
}, {
  city: 'San Diego',
  state: 'California'
}, {
  city: 'San Francisco',
  state: 'California'
}];
var Children = exports.Children = function Children() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grid, {
    pad: "large",
    columns: [['medium', 'large']],
    justifyContent: "center"
  }, /*#__PURE__*/_react["default"].createElement(_Cards.Cards, {
    data: data,
    pad: "medium",
    border: false
  }, function (datum) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Card, {
      key: datum.city,
      as: "li"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.CardBody, null, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
      level: 2,
      size: "small",
      margin: "none"
    }, datum.city)), /*#__PURE__*/_react["default"].createElement(_grommet.CardFooter, null, datum.state));
  }));
};
var _default = exports["default"] = {
  title: 'Visualizations/Cards/Children'
};