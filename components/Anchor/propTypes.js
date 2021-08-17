"use strict";

exports.__esModule = true;
exports.AnchorPropTypes = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _generalPropTypes = require("../../utils/general-prop-types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = _extends({}, _generalPropTypes.genericProps, {
    a11yTitle: _propTypes["default"].string,
    as: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func]),
    color: _generalPropTypes.colorPropType,
    disabled: _propTypes["default"].bool,
    href: _propTypes["default"].string,
    icon: _propTypes["default"].element,
    label: _propTypes["default"].node,
    onClick: _propTypes["default"].func,
    reverse: _propTypes["default"].bool,
    size: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge']), _propTypes["default"].string]),
    weight: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['normal', 'bold']), _propTypes["default"].number])
  });
}

var AnchorPropTypes = PropType;
exports.AnchorPropTypes = AnchorPropTypes;