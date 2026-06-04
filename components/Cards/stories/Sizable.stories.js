"use strict";

exports.__esModule = true;
exports["default"] = exports.Sizable = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
var _Cards = require("../Cards");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var data = [{
  city: 'Boise',
  state: 'Idaho',
  size: {
    columns: 2,
    rows: 1
  }
}, {
  city: 'Fort Collins',
  state: 'Colorado'
}, {
  city: 'Bay Area',
  state: 'California'
}, {
  city: 'San Diego',
  state: 'California',
  size: {
    columns: 2,
    rows: 1
  }
}, {
  city: 'San Francisco',
  state: 'California',
  size: {
    columns: 1,
    rows: 2
  }
}, {
  city: 'Los Angeles',
  state: 'California'
}, {
  city: 'Portland',
  state: 'Oregon'
}, {
  city: 'Seattle',
  state: 'Washington'
}];
var Sizable = exports.Sizable = function Sizable() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true
  }, /*#__PURE__*/_react["default"].createElement(_Cards.Cards, {
    id: "myGrid",
    data: data,
    pad: "medium",
    columns: ['flex', 'flex', 'flex'],
    rows: "xsmall",
    sizeKey: "size"
  }, function (datum) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Card, {
      key: datum.city,
      pad: "small",
      elevation: "medium"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.CardBody, null, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
      level: 2,
      size: "small",
      margin: "none"
    }, datum.city), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, datum.state)));
  }));
};
var _default = exports["default"] = {
  title: 'Visualizations/Cards/Sizable'
};