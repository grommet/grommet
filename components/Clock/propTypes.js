"use strict";

exports.__esModule = true;
exports.ClockPropTypes = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _generalPropTypes = require("../../utils/general-prop-types");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = _extends({}, _generalPropTypes.genericProps, {
    hourLimit: _propTypes["default"].oneOf([12, 24, '12', '24']),
    onChange: _propTypes["default"].func,
    precision: _propTypes["default"].oneOf(['hours', 'minutes', 'seconds']),
    run: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].oneOf(['backward', 'forward'])]),
    size: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge']), _propTypes["default"].string]),
    time: _propTypes["default"].string,
    type: _propTypes["default"].oneOf(['analog', 'digital'])
  });
}
var ClockPropTypes = exports.ClockPropTypes = PropType;