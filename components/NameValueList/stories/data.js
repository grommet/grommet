"use strict";

exports.__esModule = true;
exports.statusData = exports.metricData = exports.data = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var data = {
  'Model type': 'MXQ83700F3',
  'Request created by': /*#__PURE__*/_react["default"].createElement(_grommet.Anchor, {
    label: "jane.doe@email.com",
    href: "mailto:jane.doe@email.com"
  }),
  'Last synced': '3 hours ago',
  'Created on': '10/12/2021',
  Description: "Full-service AI insights, security and unified infrastructure \n  management for campus, branch, remote, and data center networks"
};
exports.data = data;
var metricData = {
  'Critical Attention': 12,
  Warning: 5,
  Successful: 31
};
exports.metricData = metricData;
var statusData = {
  Power: 'Ok',
  Health: 'Critical',
  'Last Serviced': '7/14/2021'
};
exports.statusData = statusData;