"use strict";

exports.__esModule = true;
exports.ROUTER_PROPS = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ROUTER_PROPS = {
  // Indicates the path to be used for react-router link.
  path: _propTypes["default"].string.isRequired,
  // Indicates whether the browser history should be appended to or replaced.
  // defaultValue: 'push
  method: _propTypes["default"].oneOf(['push', 'replace'])
};
exports.ROUTER_PROPS = ROUTER_PROPS;