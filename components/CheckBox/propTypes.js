"use strict";

exports.__esModule = true;
exports.CheckBoxPropTypes = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _generalPropTypes = require("../../utils/general-prop-types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = {
    a11yTitle: _propTypes["default"].string,
    checked: _propTypes["default"].bool,
    disabled: _propTypes["default"].bool,
    fill: _propTypes["default"].bool,
    id: _propTypes["default"].string,
    label: _propTypes["default"].node,
    name: _propTypes["default"].string,
    onChange: _propTypes["default"].func,
    pad: _generalPropTypes.padPropType,
    reverse: _propTypes["default"].bool,
    toggle: _propTypes["default"].bool,
    indeterminate: _propTypes["default"].bool
  };
}

var CheckBoxPropTypes = PropType;
exports.CheckBoxPropTypes = CheckBoxPropTypes;