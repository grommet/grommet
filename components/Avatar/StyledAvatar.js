"use strict";

exports.__esModule = true;
exports.StyledAvatarText = exports.StyledAvatar = void 0;
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _Box = require("../Box");
var _Text = require("../Text");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var StyledAvatarText = exports.StyledAvatarText = (0, _styledComponents["default"])(_Text.Text).withConfig({
  displayName: "StyledAvatar__StyledAvatarText",
  componentId: "sc-1suyamb-0"
})(["", " ", ""], function (props) {
  return props.theme.avatar && props.theme.avatar.text && props.theme.avatar.text.fontWeight && "font-weight: " + props.theme.avatar.text.fontWeight + ";";
}, function (props) {
  return props.theme.avatar.text && props.theme.avatar.text.extend;
});
var StyledAvatar = exports.StyledAvatar = (0, _styledComponents["default"])(_Box.Box).withConfig({
  displayName: "StyledAvatar",
  componentId: "sc-1suyamb-1"
})(["", ""], function (props) {
  return props.theme.avatar && props.theme.avatar.extend;
});