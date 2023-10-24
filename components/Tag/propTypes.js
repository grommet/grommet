"use strict";

exports.__esModule = true;
exports.TagPropTypes = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _generalPropTypes = require("../../utils/general-prop-types");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = _extends({}, _generalPropTypes.genericProps, {
    as: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func]),
    name: _propTypes["default"].string,
    value: _propTypes["default"].string.isRequired,
    onClick: _propTypes["default"].func,
    onRemove: _propTypes["default"].func,
    size: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']), _propTypes["default"].string])
  });
}
var TagPropTypes = exports.TagPropTypes = PropType;