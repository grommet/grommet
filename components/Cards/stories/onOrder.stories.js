"use strict";

exports.__esModule = true;
exports["default"] = exports.OnOrder = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
var _Cards = require("../Cards");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var data = [{
  id: 'bo',
  city: 'Boise',
  state: 'Idaho'
}, {
  id: 'fc',
  city: 'Fort Collins',
  state: 'Colorado'
}, {
  id: 'ba',
  city: 'Bay Area',
  state: 'California'
}, {
  id: 'sd',
  city: 'San Diego',
  state: 'California'
}, {
  id: 'sf',
  city: 'San Francisco',
  state: 'California'
}, {
  id: 'la',
  city: 'Los Angeles',
  state: 'California'
}, {
  id: 'pt',
  city: 'Portland',
  state: 'Oregon'
}, {
  id: 'se',
  city: 'Seattle',
  state: 'Washington'
}];
var OnOrder = exports.OnOrder = function OnOrder() {
  var _React$useState = _react["default"].useState(data),
    orderedData = _React$useState[0],
    setOrderedData = _React$useState[1];
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true
  }, /*#__PURE__*/_react["default"].createElement(_Cards.Cards, {
    id: "myGrid",
    data: orderedData,
    pad: "medium",
    columns: ['flex', 'flex', 'flex'],
    onOrder: setOrderedData
  }, function (datum) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Card, {
      key: datum.city,
      pad: "medium",
      elevation: "medium"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.CardBody, null, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
      level: 2,
      size: "small",
      margin: "none"
    }, datum.city), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, datum.state)));
  }));
};
OnOrder.storyName = 'onOrder';
var _default = exports["default"] = {
  title: 'Visualizations/Cards/onOrder'
};