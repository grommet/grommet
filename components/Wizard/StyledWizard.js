"use strict";

exports.__esModule = true;
exports.StyledWizardMiddle = exports.StyledWizardFocusAnchor = exports.StyledWizardContentColumn = exports.StyledWizardCenter = exports.StyledWizardBody = exports.StyledWizard = void 0;
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _utils = require("../../utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// Root wizard container. Flex column so header, middle, and footer
// stack; `height: 100%` fills a bounded block parent, while
// `flex: 1 1 auto` + `min-height: 0` let it shrink to fit a flex
// parent's remaining space (e.g. next to a sibling toolbar) so the
// internal scroll region can engage. If the parent has no bounded
// height, `height: 100%` resolves to auto and long content just
// grows the wizard instead of scrolling.
var StyledWizard = exports.StyledWizard = _styledComponents["default"].div.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledWizard",
  componentId: "sc-1o4qqu4-0"
})(["display:flex;flex-direction:column;flex:1 1 auto;width:100%;height:100%;min-height:0;", ""], function (props) {
  var _props$theme$wizard;
  return (_props$theme$wizard = props.theme.wizard) == null || (_props$theme$wizard = _props$theme$wizard.container) == null ? void 0 : _props$theme$wizard.extend;
});

// Middle region between the sticky header and footer. Establishes a
// bounded height (via `flex: 1 1 auto` + `min-height: 0`) so descendants
// can compute their own scroll boundaries. It does not scroll itself —
// scrolling happens inside `<WizardContent>` so the stepper and step
// title remain visible above the scrolling content.
var StyledWizardMiddle = exports.StyledWizardMiddle = _styledComponents["default"].div.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledWizard__StyledWizardMiddle",
  componentId: "sc-1o4qqu4-1"
})(["display:flex;flex-direction:column;align-items:center;flex:1 1 auto;min-height:0;width:100%;"]);

// Centered content column inside the scroll region. Carries the
// `kind`-driven max-width so only the middle content is constrained;
// header and footer remain full-width. `maxWidth` may be a Grommet
// size token (e.g. 'large', 'xlarge') or a CSS length; unknown values
// fall through as-is.
var StyledWizardCenter = exports.StyledWizardCenter = _styledComponents["default"].div.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledWizard__StyledWizardCenter",
  componentId: "sc-1o4qqu4-2"
})(["display:flex;flex-direction:column;flex:1 1 auto;min-height:0;width:100%;", ""], function (props) {
  var _props$theme;
  if (!props.maxWidth) return '';
  var resolved = ((_props$theme = props.theme) == null || (_props$theme = _props$theme.global) == null || (_props$theme = _props$theme.size) == null ? void 0 : _props$theme[props.maxWidth]) || props.maxWidth;
  return "\n      max-width: " + resolved + ";\n      margin-left: auto;\n      margin-right: auto;\n    ";
});

// Body region holds either [Progress | Content] side-by-side (vertical
// direction) or Content only (horizontal direction has Progress in a header).
var StyledWizardBody = exports.StyledWizardBody = _styledComponents["default"].div.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledWizard__StyledWizardBody",
  componentId: "sc-1o4qqu4-3"
})(["display:flex;flex-direction:", ";flex:1 1 auto;min-height:0;"], function (props) {
  return props.direction === 'vertical' ? 'row' : 'column';
});

// Content column holds StepHeader + Content + Footer. `min-height: 0`
// is required so <WizardContent> below can shrink and clip its own
// overflow instead of pushing the whole column past its parent.
var StyledWizardContentColumn = exports.StyledWizardContentColumn = _styledComponents["default"].div.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledWizard__StyledWizardContentColumn",
  componentId: "sc-1o4qqu4-4"
})(["display:flex;flex-direction:column;flex:1 1 auto;min-width:0;min-height:0;"]);

// Focus anchor for step transitions. Not visible until it receives
// keyboard focus, at which point the theme focus ring shows.
var StyledWizardFocusAnchor = exports.StyledWizardFocusAnchor = _styledComponents["default"].div.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledWizard__StyledWizardFocusAnchor",
  componentId: "sc-1o4qqu4-5"
})(["outline:none;&:focus{", "}"], (0, _utils.focusStyle)({
  justBorder: true
}));