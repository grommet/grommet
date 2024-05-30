"use strict";

exports.__esModule = true;
exports.HeaderPropTypes = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    sticky: _propTypes["default"].oneOf(['scrollup'])
  };
}
var HeaderPropTypes = exports.HeaderPropTypes = PropType;