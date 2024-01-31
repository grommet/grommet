"use strict";

exports.__esModule = true;
exports.TagPropTypes = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    name: _propTypes["default"].string,
    value: _propTypes["default"].string.isRequired,
    onClick: _propTypes["default"].func,
    onRemove: _propTypes["default"].func,
    size: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']), _propTypes["default"].string])
  };
}
var TagPropTypes = exports.TagPropTypes = PropType;