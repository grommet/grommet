"use strict";

exports.__esModule = true;
exports.NotificationType = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _propTypes2 = require("../Anchor/propTypes");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    actions: _propTypes["default"].arrayOf(_propTypes["default"].shape(_propTypes2.AnchorPropTypes)),
    global: _propTypes["default"].bool,
    title: _propTypes["default"].string,
    message: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].node]),
    status: _propTypes["default"].oneOf(['critical', 'warning', 'normal', 'info', 'unknown']),
    toast: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].shape({
      autoClose: _propTypes["default"].bool,
      position: _propTypes["default"].oneOf(['bottom', 'bottom-left', 'bottom-right', 'center', 'end', 'hidden', 'left', 'right', 'start', 'top', 'top-left', 'top-right'])
    })]),
    onClose: _propTypes["default"].func,
    icon: _propTypes["default"].element,
    time: _propTypes["default"].number
  };
}
var NotificationType = exports.NotificationType = PropType;