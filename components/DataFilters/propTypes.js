"use strict";

exports.__esModule = true;
exports.DataFiltersPropTypes = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    drop: _propTypes["default"].bool,
    heading: _propTypes["default"].string,
    layer: _propTypes["default"].bool
  };
}
var DataFiltersPropTypes = exports.DataFiltersPropTypes = PropType;