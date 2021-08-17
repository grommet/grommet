"use strict";

exports.__esModule = true;
exports.RangeInputPropTypes = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = {
    a11yTitle: _propTypes["default"].string,
    id: _propTypes["default"].string,
    min: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
    max: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
    name: _propTypes["default"].string,
    onChange: _propTypes["default"].func,
    step: _propTypes["default"].number,
    value: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string])
  };
}

var RangeInputPropTypes = PropType;
exports.RangeInputPropTypes = RangeInputPropTypes;