"use strict";

exports.__esModule = true;
exports.ImagePropTypes = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _generalPropTypes = require("../../utils/general-prop-types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = _extends({}, _generalPropTypes.genericProps, {
    fill: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['horizontal', 'vertical']), _propTypes["default"].bool]),
    fit: _propTypes["default"].oneOf(['cover', 'contain']),
    fallback: _propTypes["default"].string,
    opacity: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['weak', 'medium', 'strong']), _propTypes["default"].string, _propTypes["default"].bool])
  });
}

var ImagePropTypes = PropType;
exports.ImagePropTypes = ImagePropTypes;