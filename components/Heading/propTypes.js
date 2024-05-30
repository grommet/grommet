"use strict";

exports.__esModule = true;
exports.HeadingPropTypes = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _generalPropTypes = require("../../utils/general-prop-types");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = _extends({}, _generalPropTypes.genericProps, {
    color: _generalPropTypes.colorPropType,
    fill: _propTypes["default"].bool,
    level: _propTypes["default"].oneOf([1, 2, 3, 4, 5, 6, '1', '2', '3', '4', '5', '6']),
    overflowWrap: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['normal', 'break-word', 'anywhere']), _propTypes["default"].string]),
    responsive: _propTypes["default"].bool,
    size: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['small', 'medium', 'large', 'xlarge']), _propTypes["default"].string]),
    textAlign: _propTypes["default"].oneOf(['start', 'center', 'end', 'justify']),
    truncate: _propTypes["default"].bool,
    weight: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['normal', 'bold', 'lighter', 'bolder']), _propTypes["default"].number, _propTypes["default"].string])
  });
}
var HeadingPropTypes = exports.HeadingPropTypes = PropType;