"use strict";

exports.__esModule = true;
exports.InfiniteScrollPropTypes = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = {
    children: _propTypes["default"].func,
    items: _propTypes["default"].arrayOf(_propTypes["default"].any),
    onMore: _propTypes["default"].func,
    renderMarker: _propTypes["default"].func,
    replace: _propTypes["default"].bool,
    scrollableAncestor: _propTypes["default"].oneOfType([_propTypes["default"].node, _propTypes["default"].oneOf(['window'])]),
    show: _propTypes["default"].number,
    step: _propTypes["default"].number
  };
}

var InfiniteScrollPropTypes = PropType;
exports.InfiniteScrollPropTypes = InfiniteScrollPropTypes;