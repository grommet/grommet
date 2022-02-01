"use strict";

exports.__esModule = true;
exports.NotificationType = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = {
    title: _propTypes["default"].string.isRequired,
    message: _propTypes["default"].string,
    status: _propTypes["default"].oneOf(['critical', 'warning', 'normal', 'unknown']),
    toast: _propTypes["default"].oneOfType([_propTypes["default"].shape({
      position: _propTypes["default"].oneOf(['bottom', 'bottom-left', 'bottom-right', 'center', 'end', 'hidden', 'left', 'right', 'start', 'top', 'top-left', 'top-right'])
    }), _propTypes["default"].bool]),
    onClose: _propTypes["default"].func
  };
}

var NotificationType = PropType;
exports.NotificationType = NotificationType;