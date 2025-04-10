"use strict";

exports.__esModule = true;
exports.AvatarPropTypes = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    size: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', '2xl', '3xl', '4xl', '5xl']), _propTypes["default"].string]),
    src: _propTypes["default"].string,
    imageProps: _propTypes["default"].object
  };
}
var AvatarPropTypes = exports.AvatarPropTypes = PropType;