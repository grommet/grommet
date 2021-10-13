"use strict";

exports.__esModule = true;
exports.CarouselChildPropTypes = exports.CarouselPropTypes = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _generalPropTypes = require("../../utils/general-prop-types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = _extends({}, _generalPropTypes.genericProps, {
    activeChild: _propTypes["default"].number,
    fill: _propTypes["default"].bool,
    play: _propTypes["default"].number,
    initialChild: _propTypes["default"].number,
    onChild: _propTypes["default"].func,
    controls: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].oneOf(['arrows', 'selectors'])])
  });
}

var CarouselPropTypes = PropType;
exports.CarouselPropTypes = CarouselPropTypes;
var CarouselChildPropType;

if (process.env.NODE_ENV !== 'production') {
  CarouselChildPropType = {
    fill: _propTypes["default"].bool,
    play: _propTypes["default"].number,
    index: _propTypes["default"].number.isRequired,
    activeIndex: _propTypes["default"].number.isRequired,
    priorActiveIndex: _propTypes["default"].number
  };
}

var CarouselChildPropTypes = CarouselChildPropType;
exports.CarouselChildPropTypes = CarouselChildPropTypes;