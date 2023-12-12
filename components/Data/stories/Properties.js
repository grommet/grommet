"use strict";

exports.__esModule = true;
exports["default"] = exports.Properties = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
var _data = require("../../DataTable/stories/data");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var amountFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
});
var Properties = exports.Properties = function Properties() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      align: "center",
      fill: "horizontal",
      justify: "start",
      pad: "xlarge",
      gap: "medium"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Notification, {
      fill: "horizontal",
      status: "info",
      message: "Data is in 'beta'. The API surface is subject to change."
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Data, {
      data: _data.DATA,
      updateOn: "change",
      properties: {
        location: {
          sort: false,
          label: 'Location',
          options: ['Fort Collins', 'Palo Alto', 'Boise', 'San Francisco']
        },
        name: {
          filter: false
        },
        paid: {
          search: false,
          filter: false
        }
      },
      fill: "horizontal"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      gap: "medium"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Toolbar, null, /*#__PURE__*/_react["default"].createElement(_grommet.DataSearch, null), /*#__PURE__*/_react["default"].createElement(_grommet.DataSort, {
      drop: true
    }), /*#__PURE__*/_react["default"].createElement(_grommet.DataFilters, {
      drop: true
    })), /*#__PURE__*/_react["default"].createElement(_grommet.Cards, {
      size: "medium"
    }, function (item) {
      return /*#__PURE__*/_react["default"].createElement(_grommet.Card, {
        key: item.name,
        pad: "small"
      }, /*#__PURE__*/_react["default"].createElement(_grommet.CardBody, null, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
        level: 2,
        size: "small",
        margin: "none"
      }, item.name), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, amountFormatter.format(item.paid / 100))), /*#__PURE__*/_react["default"].createElement(_grommet.CardFooter, null, item.location));
    }))))
    // </Grommet>
  );
};
Properties.args = {
  full: true
};
var _default = exports["default"] = {
  title: 'Data/Data/Properties'
};