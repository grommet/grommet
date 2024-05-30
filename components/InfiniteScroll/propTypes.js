"use strict";

exports.__esModule = true;
exports.InfiniteScrollPropTypes = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    children: _propTypes["default"].func,
    items: _propTypes["default"].arrayOf(_propTypes["default"].any),
    onMore: _propTypes["default"].func,
    renderMarker: _propTypes["default"].func,
    replace: _propTypes["default"].bool,
    show: _propTypes["default"].number,
    step: _propTypes["default"].number
  };
}
var InfiniteScrollPropTypes = exports.InfiniteScrollPropTypes = PropType;