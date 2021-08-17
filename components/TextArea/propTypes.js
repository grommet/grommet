"use strict";

exports.__esModule = true;
exports.TextAreaPropTypes = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = {
    a11yTitle: _propTypes["default"].string,
    id: _propTypes["default"].string,
    fill: _propTypes["default"].bool,
    focusIndicator: _propTypes["default"].bool,
    name: _propTypes["default"].string,
    onChange: _propTypes["default"].func,
    placeholder: _propTypes["default"].string,
    plain: _propTypes["default"].bool,
    value: _propTypes["default"].string,
    resize: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['vertical', 'horizontal']), _propTypes["default"].bool]),
    size: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge', '2xl', '3xl', '4xl', '5xl', '6xl']), _propTypes["default"].string])
  };
}

var TextAreaPropTypes = PropType;
exports.TextAreaPropTypes = TextAreaPropTypes;