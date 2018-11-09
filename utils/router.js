"use strict";

exports.__esModule = true;
exports.ROUTER_PROPS = void 0;

var _reactDesc = require("react-desc");

var ROUTER_PROPS = {
  path: _reactDesc.PropTypes.string.description('Indicates the path to be used for react-router link.').isRequired,
  method: _reactDesc.PropTypes.oneOf(['push', 'replace']).description('Indicates whether the browser history should be appended to or replaced.').defaultValue('push')
};
exports.ROUTER_PROPS = ROUTER_PROPS;