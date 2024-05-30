"use strict";

exports.__esModule = true;
exports.SidebarPropTypes = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    children: _propTypes["default"].node,
    footer: _propTypes["default"].node,
    header: _propTypes["default"].node
  };
}
var SidebarPropTypes = exports.SidebarPropTypes = PropType;