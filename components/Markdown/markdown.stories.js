"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CONTENT = "\n  # Out of Breath\n\n  You know, sometimes in life it seems like there's no way out. Like\n  a sheep trapped in a maze designed by wolves.\n\n  [reference](#)\n\n```\nimport { Grommet } from 'grommet';\n```\n\n  > i carry your heart with me\n\n  ![alt text](//v2.grommet.io/assets/IMG_4245.jpg \"Markdown Image\")\n\n  Markdown | Less | Pretty\n  --- | --- | ---\n  *Still* | `renders` | **nicely**\n  1 | 2 | 3\n";

var SimpleMarkdown = function SimpleMarkdown() {
  return _react.default.createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, _react.default.createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, _react.default.createElement(_grommet.Markdown, null, CONTENT)));
};

var StyledPre = _styledComponents.default.pre.withConfig({
  displayName: "markdownstories__StyledPre",
  componentId: "sc-4hkfd5-0"
})(["background-color:#7d4cdb;"]);

var ComponentOverrideMarkdown = function ComponentOverrideMarkdown() {
  return _react.default.createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, _react.default.createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, _react.default.createElement(_grommet.Markdown, {
    components: {
      pre: StyledPre
    }
  }, CONTENT)));
};

(0, _react2.storiesOf)('Markdown', module).add('Simple Markdown', function () {
  return _react.default.createElement(SimpleMarkdown, null);
}).add('Component Override Markdown', function () {
  return _react.default.createElement(ComponentOverrideMarkdown, null);
});