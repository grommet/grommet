"use strict";

exports.__esModule = true;
exports.DateInputPropTypes = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = {
    buttonProps: _propTypes["default"].shape({}),
    calendarProps: _propTypes["default"].shape({}),
    defaultValue: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].arrayOf(_propTypes["default"].string)]),
    dropProps: _propTypes["default"].shape({}),
    format: _propTypes["default"].string,
    id: _propTypes["default"].string,
    inline: _propTypes["default"].bool,
    inputProps: _propTypes["default"].shape({}),
    name: _propTypes["default"].string,
    onChange: _propTypes["default"].func,
    value: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].arrayOf(_propTypes["default"].string)]),
    size: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge', '2xl', '3xl', '4xl', '5xl', '6xl']), _propTypes["default"].string])
  };
}

var DateInputPropTypes = PropType;
exports.DateInputPropTypes = DateInputPropTypes;