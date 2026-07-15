"use strict";

exports.__esModule = true;
exports.ToggleGroupPropTypes = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    defaultValue: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].arrayOf(_propTypes["default"].string)]),
    multiple: _propTypes["default"].bool,
    onToggle: _propTypes["default"].func,
    options: _propTypes["default"].oneOfType([_propTypes["default"].arrayOf(_propTypes["default"].string), _propTypes["default"].arrayOf(_propTypes["default"].shape({
      icon: _propTypes["default"].oneOfType([_propTypes["default"].element, _propTypes["default"].node]),
      label: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].element]),
      value: _propTypes["default"].string,
      tip: _propTypes["default"].string
    }))]),
    value: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].arrayOf(_propTypes["default"].string)])
  };
}
var ToggleGroupPropTypes = exports.ToggleGroupPropTypes = PropType;