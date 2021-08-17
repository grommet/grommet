"use strict";

exports.__esModule = true;
exports.MarkdownPropTypes = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = {
    components: _propTypes["default"].object,
    options: _propTypes["default"].shape({})
  };
}

var MarkdownPropTypes = PropType;
exports.MarkdownPropTypes = MarkdownPropTypes;