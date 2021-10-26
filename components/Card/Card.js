"use strict";

exports.__esModule = true;
exports.Card = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _defaultProps = require("../../default-props");

var _Box = require("../Box");

var _StyledBox = require("../Box/StyledBox");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var StyledCard = (0, _styledComponents["default"])(_Box.Box).withConfig({
  displayName: "Card__StyledCard",
  componentId: "sc-14tum25-0"
})(["&:hover{", " ", "}"], function (props) {
  var _props$theme$card$hov, _props$theme$card$hov2;

  return props.onClick && ((_props$theme$card$hov = props.theme.card.hover) == null ? void 0 : (_props$theme$card$hov2 = _props$theme$card$hov.container) == null ? void 0 : _props$theme$card$hov2.elevation) && (0, _StyledBox.elevationStyle)(props.theme.card.hover.container.elevation);
}, function (props) {
  var _props$theme$card$hov3, _props$theme$card$hov4;

  return (_props$theme$card$hov3 = props.theme.card.hover) == null ? void 0 : (_props$theme$card$hov4 = _props$theme$card$hov3.container) == null ? void 0 : _props$theme$card$hov4.extend;
});
var Card = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var rest = _extends({}, _ref);

  var theme = (0, _react.useContext)(_styledComponents.ThemeContext) || _defaultProps.defaultProps.theme;

  return /*#__PURE__*/_react["default"].createElement(StyledCard, _extends({
    overflow: "hidden",
    ref: ref
  }, theme.card.container, rest));
});
exports.Card = Card;
Card.displayName = 'Card';