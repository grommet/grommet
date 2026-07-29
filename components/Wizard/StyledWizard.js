"use strict";

exports.__esModule = true;
exports.StyledWizardFocusAnchor = exports.StyledWizard = void 0;
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _utils = require("../../utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// Kept as a styled component so consumers can theme the wizard root via
// `theme.wizard.container.extend`. Grommet Box does not expose a
// per-instance `extend` prop, so this escape hatch requires styled CSS.
var StyledWizard = exports.StyledWizard = _styledComponents["default"].div.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledWizard",
  componentId: "sc-1o4qqu4-0"
})(["display:flex;flex-direction:column;flex:1 1 auto;width:100%;height:100%;min-height:0;", ""], function (props) {
  var _props$theme$wizard;
  return (_props$theme$wizard = props.theme.wizard) == null || (_props$theme$wizard = _props$theme$wizard.container) == null ? void 0 : _props$theme$wizard.extend;
});

// Focus target for step transitions. Styled because Box only emits focus
// styles when `onClick` is set, and this anchor needs the border-only
// focus variant on a programmatic (`tabIndex={-1}`) target.
var StyledWizardFocusAnchor = exports.StyledWizardFocusAnchor = _styledComponents["default"].div.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledWizard__StyledWizardFocusAnchor",
  componentId: "sc-1o4qqu4-1"
})(["outline:none;&:focus{", "}"], (0, _utils.focusStyle)({
  justBorder: true
}));