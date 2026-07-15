"use strict";

exports.__esModule = true;
exports.AnchorPropTypes = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _generalPropTypes = require("../../utils/general-prop-types");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = _extends({}, _generalPropTypes.genericProps, {
    a11yTitle: _propTypes["default"].string,
    as: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func, _propTypes["default"].elementType]),
    color: _generalPropTypes.colorPropType,
    disabled: _propTypes["default"].bool,
    gap: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['none', 'xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge']), _propTypes["default"].string]),
    href: _propTypes["default"].string,
    icon: _propTypes["default"].element,
    label: _propTypes["default"].node,
    onClick: _propTypes["default"].func,
    reverse: _propTypes["default"].bool,
    size: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge']), _propTypes["default"].string]),
    weight: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['normal', 'bold']), _propTypes["default"].string, _propTypes["default"].number])
  });
}
var AnchorPropTypes = exports.AnchorPropTypes = PropType;