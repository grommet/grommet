"use strict";

exports.__esModule = true;
exports.ParagraphPropTypes = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _generalPropTypes = require("../../utils/general-prop-types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = _extends({}, _generalPropTypes.genericProps, {
    color: _generalPropTypes.colorPropType,
    fill: _propTypes["default"].bool,
    responsive: _propTypes["default"].bool,
    size: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['small', 'medium', 'large', 'xlarge', 'xxlarge']), _propTypes["default"].string]),
    textAlign: _propTypes["default"].oneOf(['start', 'center', 'end', 'justify'])
  });
}

var ParagraphPropTypes = PropType;
exports.ParagraphPropTypes = ParagraphPropTypes;