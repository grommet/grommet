"use strict";

exports.__esModule = true;
exports.ClockPropTypes = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _generalPropTypes = require("../../utils/general-prop-types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = _extends({}, _generalPropTypes.genericProps, {
    hourLimit: _propTypes["default"].oneOf([12, 24, '12', '24']),
    onChange: _propTypes["default"].func,
    precision: _propTypes["default"].oneOf(['hours', 'minutes', 'seconds']),
    run: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].oneOf(['backward', 'forward'])]),
    size: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge']), _propTypes["default"].string]),
    time: _propTypes["default"].string,
    type: _propTypes["default"].oneOf(['analog', 'digital'])
  });
}

var ClockPropTypes = PropType;
exports.ClockPropTypes = ClockPropTypes;