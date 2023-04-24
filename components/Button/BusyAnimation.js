"use strict";

exports.__esModule = true;
exports.StyledBusyContents = exports.GrowCheckmark = exports.EllipsisAnimation = void 0;
var _react = _interopRequireDefault(require("react"));
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _Checkmark = require("grommet-icons/icons/Checkmark");
var _Box = require("../Box");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var bounceDelay = (0, _styledComponents.keyframes)(["0%,80%,100%{transform:scale(0.4);}40%{transform:scale(0.8);}"]);
var bounceDelayRule = (0, _styledComponents.css)(["animation:", " 1.4s infinite ease-in-out both;"], bounceDelay);
var Dot = (0, _styledComponents["default"])(_Box.Box).withConfig({
  displayName: "BusyAnimation__Dot",
  componentId: "sc-feuivs-0"
})(["background-color:currentColor;width:8px;height:8px;border-radius:100%;display:inline-block;", " ", ""], bounceDelayRule, function (props) {
  return props.delay && "animation-delay: " + props.delay + ";";
});
var EllipsisAnimation = function EllipsisAnimation() {
  return /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    style: {
      position: 'absolute'
    },
    fill: true,
    alignContent: "center",
    justify: "center"
  }, /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    alignSelf: "center",
    direction: "row",
    gap: "small"
  }, /*#__PURE__*/_react["default"].createElement(Dot, {
    delay: "-0.32s"
  }), /*#__PURE__*/_react["default"].createElement(Dot, {
    delay: "-0.16s"
  }), /*#__PURE__*/_react["default"].createElement(Dot, null)));
};
exports.EllipsisAnimation = EllipsisAnimation;
var grow = (0, _styledComponents.keyframes)(["0%{opacity:0;transform:scale(.3);}20%{opacity:1;transform:scale(1.15);}30%{transform:scale(.9);}45%{transform:scale(1.05);}55%{transform:scale(1);}100%{transform:scale(1);}"]);
var GrowCheckmark = (0, _styledComponents["default"])(_Checkmark.Checkmark).withConfig({
  displayName: "BusyAnimation__GrowCheckmark",
  componentId: "sc-feuivs-1"
})(["position:absolute;align-self:center;animation:", " 0.9s ease-in-out;"], grow);
exports.GrowCheckmark = GrowCheckmark;
var StyledBusyContents = _styledComponents["default"].div.withConfig({
  displayName: "BusyAnimation__StyledBusyContents",
  componentId: "sc-feuivs-2"
})(["opacity:", ";}"], function (props) {
  return props.animating ? 0 : 1;
});
exports.StyledBusyContents = StyledBusyContents;