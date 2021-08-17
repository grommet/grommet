"use strict";

exports.__esModule = true;
exports.ListPropTypes = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _generalPropTypes = require("../../utils/general-prop-types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var sizes = ['none', 'xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge'];
var sides = ['horizontal', 'vertical', 'top', 'bottom', 'left', 'right', 'start', 'end'];
var padShapeSides = {};
sides.forEach(function (side) {
  padShapeSides[side] = _propTypes["default"].oneOf(sizes);
});
var borderTypes = [_propTypes["default"].bool, _propTypes["default"].oneOf(sides), _propTypes["default"].shape({
  color: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].shape({
    dark: _propTypes["default"].string,
    light: _propTypes["default"].string
  })]),
  side: _propTypes["default"].oneOf(sides),
  size: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(sizes), _propTypes["default"].string])
})];
var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = _extends({}, _generalPropTypes.genericProps, {
    action: _propTypes["default"].func,
    as: _propTypes["default"].string,
    background: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].arrayOf(_propTypes["default"].string)]),
    border: _propTypes["default"].oneOfType(borderTypes),
    data: _propTypes["default"].arrayOf(_propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].shape({})])),
    children: _propTypes["default"].func,
    itemProps: _propTypes["default"].shape({}),
    onMore: _propTypes["default"].func,
    onClickItem: _propTypes["default"].func,
    onOrder: _propTypes["default"].func,
    pad: _propTypes["default"].oneOfType([_generalPropTypes.padPropType]),
    paginate: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].object]),
    primaryKey: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func]),
    secondaryKey: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func]),
    show: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].shape({
      page: _propTypes["default"].number
    })]),
    step: _propTypes["default"].number
  });
}

var ListPropTypes = PropType;
exports.ListPropTypes = ListPropTypes;