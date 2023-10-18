"use strict";

exports.__esModule = true;
exports.SkeletonPropTypes = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _generalPropTypes = require("../../utils/general-prop-types");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
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