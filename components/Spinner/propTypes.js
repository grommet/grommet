"use strict";

exports.__esModule = true;
exports.SpinnerPropTypes = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = {
    size: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']), _propTypes["default"].string]),
    color: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].shape({
      dark: _propTypes["default"].string,
      light: _propTypes["default"].string
    })]),
    message: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].shape({
      start: _propTypes["default"].string,
      end: _propTypes["default"].string
    })])
  };
}

var SpinnerPropTypes = PropType;
exports.SpinnerPropTypes = SpinnerPropTypes;