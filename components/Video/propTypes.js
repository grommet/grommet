"use strict";

exports.__esModule = true;
exports.VideoPropTypes = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _generalPropTypes = require("../../utils/general-prop-types");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = _extends({}, _generalPropTypes.genericProps, {
    autoPlay: _propTypes["default"].bool,
    controls: _propTypes["default"].oneOfType([_propTypes["default"].oneOf([false, 'over', 'below']), _propTypes["default"].shape({
      position: _propTypes["default"].oneOf([false, 'over', 'below']),
      items: _propTypes["default"].arrayOf(_propTypes["default"].oneOfType([_propTypes["default"].oneOf(['captions', 'descriptions', 'fullScreen', 'play', 'pause', 'volume']), _propTypes["default"].shape({
        icon: _propTypes["default"].element,
        a11yTitle: _propTypes["default"].string,
        onClick: _propTypes["default"].func,
        disabled: _propTypes["default"].bool
      })]))
    })]),
    fit: _propTypes["default"].oneOf(['cover', 'contain']),
    loop: _propTypes["default"].bool,
    mute: _propTypes["default"].bool,
    messages: _propTypes["default"].shape({
      closeMenu: _propTypes["default"].string,
      fullScreen: _propTypes["default"].string,
      openMenu: _propTypes["default"].string,
      pauseButton: _propTypes["default"].string,
      playButton: _propTypes["default"].string,
      progressMeter: _propTypes["default"].string,
      scrubber: _propTypes["default"].string,
      volumeDown: _propTypes["default"].string,
      volumeUp: _propTypes["default"].string
    }),
    skipInterval: _propTypes["default"].number
  });
}
var VideoPropTypes = exports.VideoPropTypes = PropType;