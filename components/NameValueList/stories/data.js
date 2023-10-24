"use strict";

exports.__esModule = true;
exports.statusData = exports.metricData = exports.languageData = exports.data = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var data = exports.data = {
  'Model type': 'MXQ83700F3',
  'Request created by': /*#__PURE__*/_react["default"].createElement(_grommet.Anchor, {
    label: "jane.doe@email.com",
    href: "mailto:jane.doe@email.com"
  }),
  'Last synced': '3 hours ago',
  'Created on': '10/12/2021',
  Description: "Full-service AI insights, security and unified infrastructure \n  management for campus, branch, remote, and data center networks"
};
var metricData = exports.metricData = {
  'Critical Attention': 12,
  Warning: 5,
  Successful: 31
};
var languageData = exports.languageData = {
  Languages: "English, Spanish, French, Chinese, Japanese, German,\n   Korean, Italian, Arabic, Portugese, Russian",
  'Operating System': "VMware ESXi 6.7.0 Build-14320388 Update\n   3 Patch 73 6.7.0 Build-14320388 Update 3 Patch 73 ESXi 6.7.0\n   Build-14320388 Update 3 Patch 73 6.7.0 ESXi 6.7.0 Build-14320388\n   Update 3 Patch 73 6.7.0 "
};
var statusData = exports.statusData = {
  Power: 'Ok',
  Health: 'Critical',
  'Last Serviced': '7/14/2021'
};