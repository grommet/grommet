"use strict";

exports.__esModule = true;
exports.VideoPropTypes = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _generalPropTypes = require("../../utils/general-prop-types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = _extends({}, _generalPropTypes.genericProps, {
    autoPlay: _propTypes["default"].bool,
    controls: _propTypes["default"].oneOf([false, 'over', 'below']),
    fit: _propTypes["default"].oneOf(['cover', 'contain']),
    loop: _propTypes["default"].bool,
    mute: _propTypes["default"].bool,
    messages: _propTypes["default"].shape({
      closeMenu: _propTypes["default"].string,
      fullScreen: _propTypes["default"].string,
      progressMeter: _propTypes["default"].string,
      openMenu: _propTypes["default"].string,
      pauseButton: _propTypes["default"].string,
      playButton: _propTypes["default"].string,
      scrubber: _propTypes["default"].string,
      volumeDown: _propTypes["default"].string,
      volumeUp: _propTypes["default"].string
    })
  });
}

var VideoPropTypes = PropType;
exports.VideoPropTypes = VideoPropTypes;