"use strict";

exports.__esModule = true;
exports.CarouselPropTypes = exports.CarouselChildPropTypes = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _generalPropTypes = require("../../utils/general-prop-types");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var CarouselPropType;
if (process.env.NODE_ENV !== 'production') {
  CarouselPropType = _extends({}, _generalPropTypes.genericProps, {
    activeChild: _propTypes["default"].number,
    initialChild: _propTypes["default"].number,
    fill: _propTypes["default"].bool,
    wrap: _propTypes["default"].bool,
    controls: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['arrows', 'selectors']), _propTypes["default"].bool]),
    onChild: _propTypes["default"].func,
    width: _generalPropTypes.widthPropType,
    height: _generalPropTypes.heightPropType,
    play: _propTypes["default"].number
  });
}
var CarouselPropTypes = exports.CarouselPropTypes = CarouselPropType;
var CarouselChildPropType;
if (process.env.NODE_ENV !== 'production') {
  CarouselChildPropType = {
    animationDuration: _propTypes["default"].number.isRequired,
    fill: _propTypes["default"].bool,
    index: _propTypes["default"].number.isRequired,
    activeIndex: _propTypes["default"].number.isRequired,
    priorActiveIndex: _propTypes["default"].number,
    direction: _propTypes["default"].oneOf(['left', 'right'])
  };
}
var CarouselChildPropTypes = exports.CarouselChildPropTypes = CarouselChildPropType;