"use strict";

exports.__esModule = true;
exports.DistributionPropTypes = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _generalPropTypes = require("../../utils/general-prop-types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = _extends({}, _generalPropTypes.genericProps, {
    basis: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge', 'full', '1/2', '1/3', '2/3', '1/4', '2/4', '3/4', 'auto']), _propTypes["default"].string]),
    children: _propTypes["default"].func,
    fill: _propTypes["default"].bool,
    gap: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['none', 'xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge']), _propTypes["default"].string]),
    values: _propTypes["default"].arrayOf(_propTypes["default"].shape({
      value: _propTypes["default"].number
    })).isRequired
  });
}

var DistributionPropTypes = PropType;
exports.DistributionPropTypes = DistributionPropTypes;