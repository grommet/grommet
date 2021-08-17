"use strict";

exports.__esModule = true;
exports.TipPropTypes = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = {
    content: _propTypes["default"].node,
    dropProps: _propTypes["default"].object,
    plain: _propTypes["default"].bool
  };
}

var TipPropTypes = PropType;
exports.TipPropTypes = TipPropTypes;