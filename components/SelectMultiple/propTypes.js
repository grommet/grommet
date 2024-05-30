"use strict";

exports.__esModule = true;
exports.SelectMultiplePropTypes = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _propTypes2 = require("../Select/propTypes");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = _extends({}, _propTypes2.genericSelectProps, {
    defaultValue: _propTypes["default"].arrayOf(_propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].object, _propTypes["default"].number])),
    help: _propTypes["default"].node,
    limit: _propTypes["default"].number,
    messages: _propTypes["default"].shape({
      clearAll: _propTypes["default"].string,
      clearAllA11y: _propTypes["default"].string,
      // "multiple" kept for backwards compatibility,
      // but summarizedValue should be used instead
      multiple: _propTypes["default"].string,
      open: _propTypes["default"].string,
      optionNotSelected: _propTypes["default"].string,
      optionSelected: _propTypes["default"].string,
      search: _propTypes["default"].string,
      selectAll: _propTypes["default"].string,
      selectAllA11y: _propTypes["default"].string,
      selectDrop: _propTypes["default"].string,
      selected: _propTypes["default"].string,
      selectedOfTotal: _propTypes["default"].string,
      selectedOptions: _propTypes["default"].string,
      showMore: _propTypes["default"].string,
      summarizedValue: _propTypes["default"].string
    }),
    showSelectedInline: _propTypes["default"].bool,
    sortSelectedOnClose: _propTypes["default"].bool,
    value: _propTypes["default"].arrayOf(_propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].object, _propTypes["default"].number]))
  });
}
var SelectMultiplePropTypes = exports.SelectMultiplePropTypes = PropType;