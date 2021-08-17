"use strict";

exports.__esModule = true;
exports.RadioButtonPropTypes = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = {
    a11yTitle: _propTypes["default"].string,
    checked: _propTypes["default"].bool,
    children: _propTypes["default"].func,
    disabled: _propTypes["default"].bool,
    id: _propTypes["default"].string,
    label: _propTypes["default"].node,
    name: _propTypes["default"].string.isRequired,
    onChange: _propTypes["default"].func
  };
}

var RadioButtonPropTypes = PropType;
exports.RadioButtonPropTypes = RadioButtonPropTypes;