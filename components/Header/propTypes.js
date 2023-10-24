"use strict";

exports.__esModule = true;
exports.HeaderPropTypes = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    sticky: _propTypes["default"].oneOf(['scrollup'])
  };
}
var HeaderPropTypes = exports.HeaderPropTypes = PropType;