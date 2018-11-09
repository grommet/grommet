"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CONTENT = "\n  # Out of Breath\n\n  You know, sometimes in life it seems like there's no way out. Like\n  a sheep trapped in a maze designed by wolves.\n\n  [reference](#)\n";

var SimpleMarkdown = function SimpleMarkdown() {
  return _react.default.createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, _react.default.createElement(_grommet.Markdown, null, CONTENT));
};

(0, _react2.storiesOf)('Markdown', module).add('Simple Markdown', function () {
  return _react.default.createElement(SimpleMarkdown, null);
});