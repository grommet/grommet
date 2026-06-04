"use strict";

exports.__esModule = true;
exports.StyledCellContainer = void 0;
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _utils = require("../../utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var sizeStyles = function sizeStyles(size) {
  return size && typeof size === 'object' ? "\n      " + (size != null && size.columns ? "grid-column: span " + size.columns + ";" : '') + "\n      " + (size != null && size.rows ? "grid-row: span " + size.rows + ";" : '') + "\n    " : '';
};

// display: grid makes the single child fill the wrapper (stretch in both axes)
var StyledCellContainer = exports.StyledCellContainer = _styledComponents["default"].div.withConfig(_extends({}, _utils.styledComponentsConfig, {
  // 'size' passes isPropValid (valid for input/select), filter it to
  // prevent the object value from reaching the DOM as an attribute.
  shouldForwardProp: function shouldForwardProp(prop) {
    return prop !== 'size' && _utils.styledComponentsConfig.shouldForwardProp(prop);
  }
})).withConfig({
  displayName: "StyledCellContainer",
  componentId: "sc-183y88f-0"
})(["display:grid;", " ", " ", " &:focus{", "}&:focus:not(:focus-visible){", "}"], function (props) {
  return props.size ? sizeStyles(props.size) : undefined;
}, function (props) {
  return props.draggable ? 'cursor: move;' : undefined;
}, function (props) {
  return props.round && (0, _utils.roundStyle)(props.round, props.responsive, props.theme);
}, (0, _utils.focusStyle)(), (0, _utils.unfocusStyle)());