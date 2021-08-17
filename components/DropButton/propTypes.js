"use strict";

exports.__esModule = true;
exports.DropButtonPropTypes = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _generalPropTypes = require("../../utils/general-prop-types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = _extends({}, _generalPropTypes.genericProps, {
    disabled: _propTypes["default"].bool,
    dropAlign: _propTypes["default"].shape({
      top: _propTypes["default"].oneOf(['top', 'bottom']),
      bottom: _propTypes["default"].oneOf(['top', 'bottom']),
      right: _propTypes["default"].oneOf(['left', 'right']),
      left: _propTypes["default"].oneOf(['left', 'right'])
    }),
    dropContent: _propTypes["default"].element.isRequired,
    dropTarget: _propTypes["default"].object,
    dropProps: _propTypes["default"].object,
    onClose: _propTypes["default"].func,
    onOpen: _propTypes["default"].func,
    open: _propTypes["default"].bool
  });
}

var DropButtonPropTypes = PropType;
exports.DropButtonPropTypes = DropButtonPropTypes;