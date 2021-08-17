"use strict";

exports.__esModule = true;
exports.PaginationPropTypes = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _generalPropTypes = require("../../utils/general-prop-types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = _extends({}, _generalPropTypes.genericProps, {
    numberEdgePages: _propTypes["default"].number,
    numberItems: _propTypes["default"].number,
    numberMiddlePages: _propTypes["default"].number,
    onChange: _propTypes["default"].func,
    page: _propTypes["default"].number,
    size: _propTypes["default"].oneOf(['small', 'medium', 'large']),
    step: _propTypes["default"].number
  });
}

var PaginationPropTypes = PropType;
exports.PaginationPropTypes = PaginationPropTypes;