"use strict";

exports.__esModule = true;
exports.PageHeaderPropTypes = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _generalPropTypes = require("../../utils/general-prop-types");
var _propTypes2 = require("../Grid/propTypes");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = _extends({}, _generalPropTypes.genericProps, {
    actions: _propTypes["default"].element,
    gridProps: _propTypes2.GridPropTypes,
    parent: _propTypes["default"].element,
    responsive: _propTypes["default"].bool,
    size: _propTypes["default"].oneOf(['small', 'medium', 'large']),
    level: _propTypes["default"].oneOf([1, 2, 3, 4, 5, 6, '1', '2', '3', '4', '5', '6']),
    subtitle: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].element]),
    title: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].element])
  });
}
var PageHeaderPropTypes = exports.PageHeaderPropTypes = PropType;