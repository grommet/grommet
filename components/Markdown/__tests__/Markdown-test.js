"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

require("jest-styled-components");

var _Grommet = require("../../Grommet");

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CONTENT = "\n# H1\n\nParagraph\n\n## H2\n\n### H3\n\n#### H4\n\n[a link](#)\n\n> i carry your heart with me\n\n![alt text](//v2.grommet.io/assets/IMG_4245.jpg \"Markdown Image\")\n\nMarkdown | Less | Pretty\n--- | --- | ---\n*Still* | `renders` | **nicely**\n1 | 2 | 3\n";
test('Markdown renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.Markdown, null, CONTENT)));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});