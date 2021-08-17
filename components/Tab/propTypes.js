"use strict";

exports.__esModule = true;
exports.TabPropTypes = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = {
    disabled: _propTypes["default"].bool,
    icon: _propTypes["default"].element,
    plain: _propTypes["default"].bool,
    reverse: _propTypes["default"].bool,
    title: _propTypes["default"].node
  };
}

var TabPropTypes = PropType;
exports.TabPropTypes = TabPropTypes;