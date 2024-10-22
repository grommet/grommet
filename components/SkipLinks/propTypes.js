"use strict";

exports.__esModule = true;
exports.SkipLinksPropTypes = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    id: _propTypes["default"].string,
    children: _propTypes["default"].node.isRequired,
    messages: _propTypes["default"].shape({
      skipTo: _propTypes["default"].string
    })
  };
}
var SkipLinksPropTypes = exports.SkipLinksPropTypes = PropType;