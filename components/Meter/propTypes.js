"use strict";

exports.__esModule = true;
exports.MeterPropTypes = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _generalPropTypes = require("../../utils/general-prop-types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = _extends({}, _generalPropTypes.genericProps, {
    background: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].shape({
      color: _propTypes["default"].string,
      opacity: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['weak', 'medium', 'strong']), _propTypes["default"].number, _propTypes["default"].bool])
    })]),
    color: _propTypes["default"].string,
    max: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
    round: _propTypes["default"].bool,
    size: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'full']), _propTypes["default"].string]),
    thickness: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']), _propTypes["default"].string]),
    type: _propTypes["default"].oneOf(['bar', 'circle', 'pie', 'semicircle']),
    direction: _propTypes["default"].oneOf(['horizontal', 'vertical']),
    value: _propTypes["default"].number,
    values: _propTypes["default"].arrayOf(_propTypes["default"].shape({
      color: _propTypes["default"].string,
      highlight: _propTypes["default"].bool,
      label: _propTypes["default"].string.isRequired,
      // for accessibility
      onClick: _propTypes["default"].func,
      onHover: _propTypes["default"].func,
      value: _propTypes["default"].number.isRequired
    }))
  });
}

var MeterPropTypes = PropType;
exports.MeterPropTypes = MeterPropTypes;