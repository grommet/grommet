"use strict";

exports.__esModule = true;
exports.StyledSkeleton = void 0;
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _utils = require("../../utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// Styling a div directly rather than just using
// a Box since Box itself will react to a SkeletonContext
// and we don't want that here.
var StyledSkeleton = exports.StyledSkeleton = _styledComponents["default"].div.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledSkeleton",
  componentId: "sc-1omqm6u-0"
})(["display:flex;box-sizing:border-box;", " ", " ", " ", " ", " ", ""], _utils.genericStyles, function (props) {
  return props.background && (0, _utils.backgroundStyle)(props.background, props.theme);
}, function (props) {
  var _props$theme$text;
  return (0, _utils.heightStyle)(props.heightProp || ((_props$theme$text = props.theme.text) == null || (_props$theme$text = _props$theme$text.medium) == null ? void 0 : _props$theme$text.height), props.theme);
}, function (props) {
  return (0, _utils.widthStyle)(props.widthProp || '100%', props.theme);
}, function (props) {
  return props.pad && (0, _utils.edgeStyle)('padding', props.pad, props.responsive, props.theme.box.responsiveBreakpoint, props.theme);
}, function (props) {
  return props.round && (0, _utils.roundStyle)(props.round, props.responsive, props.theme);
});