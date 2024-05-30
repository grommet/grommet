"use strict";

exports.__esModule = true;
exports.SkeletonPropTypes = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _generalPropTypes = require("../../utils/general-prop-types");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = _extends({}, _generalPropTypes.genericProps, {
    as: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func, _propTypes["default"].element]),
    colors: _generalPropTypes.skeletonColorsPropType,
    height: _generalPropTypes.heightPropType,
    pad: _generalPropTypes.padPropType,
    round: _generalPropTypes.roundPropType,
    width: _generalPropTypes.widthPropType
  });
}
var SkeletonPropTypes = exports.SkeletonPropTypes = PropType;