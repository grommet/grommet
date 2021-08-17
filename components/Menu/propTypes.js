"use strict";

exports.__esModule = true;
exports.MenuPropTypes = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _generalPropTypes = require("../../utils/general-prop-types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var VERTICAL_ALIGN_OPTIONS = ['top', 'bottom'];
var HORIZONTAL_ALIGN_OPTIONS = ['right', 'left'];
var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = _extends({}, _generalPropTypes.genericProps, {
    children: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].node]),
    disabled: _propTypes["default"].bool,
    dropAlign: _propTypes["default"].shape({
      top: _propTypes["default"].oneOf(VERTICAL_ALIGN_OPTIONS),
      bottom: _propTypes["default"].oneOf(VERTICAL_ALIGN_OPTIONS),
      left: _propTypes["default"].oneOf(HORIZONTAL_ALIGN_OPTIONS),
      right: _propTypes["default"].oneOf(HORIZONTAL_ALIGN_OPTIONS)
    }),
    dropBackground: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].shape({
      color: _propTypes["default"].string,
      opacity: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].number, _propTypes["default"].oneOf(['weak', 'medium', 'strong'])])
    })]),
    dropTarget: _propTypes["default"].object,
    dropProps: _propTypes["default"].object,
    justifyContent: _propTypes["default"].oneOf(['start', 'center', 'end', 'between', 'around', 'stretch']),
    icon: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].node]),
    items: _propTypes["default"].arrayOf(_propTypes["default"].object).isRequired,
    label: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].node]),
    messages: _propTypes["default"].shape({
      closeMenu: _propTypes["default"].string,
      openMenu: _propTypes["default"].string
    }),
    open: _propTypes["default"].bool,
    size: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['small', 'medium', 'large', 'xlarge']), _propTypes["default"].string])
  });
}

var MenuPropTypes = PropType;
exports.MenuPropTypes = MenuPropTypes;