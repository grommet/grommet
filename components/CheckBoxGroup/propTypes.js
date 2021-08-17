"use strict";

exports.__esModule = true;
exports.CheckBoxGroupPropTypes = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = {
    value: _propTypes["default"].arrayOf(_propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string])),
    disabled: _propTypes["default"].bool,
    labelKey: _propTypes["default"].string,
    name: _propTypes["default"].string,
    onChange: _propTypes["default"].func,
    options: _propTypes["default"].oneOfType([_propTypes["default"].arrayOf(_propTypes["default"].string), _propTypes["default"].arrayOf(_propTypes["default"].shape({}))]),
    valueKey: _propTypes["default"].string
  };
}

var CheckBoxGroupPropTypes = PropType;
exports.CheckBoxGroupPropTypes = CheckBoxGroupPropTypes;