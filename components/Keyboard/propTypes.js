"use strict";

exports.__esModule = true;
exports.KeyboardPropTypes = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = {
    target: _propTypes["default"].oneOf(['component', 'document']),
    onBackspace: _propTypes["default"].func,
    onComma: _propTypes["default"].func,
    onDown: _propTypes["default"].func,
    onEnter: _propTypes["default"].func,
    onEsc: _propTypes["default"].func,
    onKeyDown: _propTypes["default"].func,
    onLeft: _propTypes["default"].func,
    onRight: _propTypes["default"].func,
    onShift: _propTypes["default"].func,
    onSpace: _propTypes["default"].func,
    onTab: _propTypes["default"].func,
    onUp: _propTypes["default"].func
  };
}

var KeyboardPropTypes = PropType;
exports.KeyboardPropTypes = KeyboardPropTypes;