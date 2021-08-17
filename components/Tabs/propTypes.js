"use strict";

exports.__esModule = true;
exports.TabsPropTypes = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _generalPropTypes = require("../../utils/general-prop-types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = _extends({}, _generalPropTypes.genericProps, {
    activeIndex: _propTypes["default"].number,
    alignControls: _propTypes["default"].oneOf(['start', 'center', 'end', 'stretch']),
    children: _propTypes["default"].node.isRequired,
    flex: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['grow', 'shrink']), _propTypes["default"].bool]),
    justify: _propTypes["default"].oneOf(['start', 'center', 'end']),
    messages: _propTypes["default"].shape({
      tabContents: _propTypes["default"].string
    }),
    onActive: _propTypes["default"].func
  });
}

var TabsPropTypes = PropType;
exports.TabsPropTypes = TabsPropTypes;