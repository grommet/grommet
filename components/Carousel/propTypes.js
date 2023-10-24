"use strict";

exports.__esModule = true;
exports.CarouselPropTypes = exports.CarouselChildPropTypes = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _generalPropTypes = require("../../utils/general-prop-types");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
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