"use strict";

exports.__esModule = true;
exports.ListPropTypes = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _generalPropTypes = require("../../utils/general-prop-types");
var _propTypes2 = require("../Box/propTypes");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
    defaultItemProps: _propTypes["default"].shape(_propTypes2.BoxPropTypes),
    disabled: _propTypes["default"].arrayOf(_propTypes["default"].string),
    showIndex: _propTypes["default"].bool,
    itemKey: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func]),
    itemProps: _propTypes["default"].shape({}),
    onActive: _propTypes["default"].func,
    onClickItem: _propTypes["default"].func,
    onMore: _propTypes["default"].func,
    onOrder: _propTypes["default"].func,
    pad: _propTypes["default"].oneOfType([_generalPropTypes.padPropType]),
    paginate: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].object]),
    pinned: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].arrayOf(_propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number])), _propTypes["default"].shape({
      items: _propTypes["default"].arrayOf(_propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number])),
      background: _generalPropTypes.backgroundDoc,
      color: _propTypes["default"].string,
      icon: _propTypes["default"].element
    })]),
    primaryKey: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func]),
    secondaryKey: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func]),
    show: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].shape({
      page: _propTypes["default"].number
    })]),
    step: _propTypes["default"].number
  });
}
var ListPropTypes = exports.ListPropTypes = PropType;