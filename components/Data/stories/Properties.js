"use strict";

exports.__esModule = true;
exports["default"] = exports.Properties = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
var _data = require("../../DataTable/stories/data");
var _DataSummary = require("../../DataSummary");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
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
    _react["default"].createElement(_grommet.Main, null, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      pad: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Data, {
      data: _data.DATA,
      properties: {
        location: {
          label: 'Location',
          sort: false,
          options: ['Fort Collins', 'Palo Alto', 'Boise', 'San Francisco']
        },
        name: {
          filter: false
        },
        paid: {
          search: false,
          label: 'Paid'
        },
        percent: {
          search: false,
          label: 'Percent'
        },
        date: {
          label: 'Date'
        }
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Toolbar, null, /*#__PURE__*/_react["default"].createElement(_grommet.DataSearch, null), /*#__PURE__*/_react["default"].createElement(_grommet.DataSort, {
      drop: true
    }), /*#__PURE__*/_react["default"].createElement(_grommet.DataFilters, {
      layer: true
    })), /*#__PURE__*/_react["default"].createElement(_DataSummary.DataSummary, null), /*#__PURE__*/_react["default"].createElement(_grommet.Cards, {
      size: "medium"
    }, function (item) {
      return /*#__PURE__*/_react["default"].createElement(_grommet.Card, {
        as: "li",
        key: item.name,
        pad: "small"
      }, /*#__PURE__*/_react["default"].createElement(_grommet.CardBody, null, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
        level: 2,
        margin: "none"
      }, item.name), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, amountFormatter.format(item.paid / 100))), /*#__PURE__*/_react["default"].createElement(_grommet.CardFooter, null, item.location || '--'));
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