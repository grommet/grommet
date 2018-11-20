"use strict";

exports.__esModule = true;
exports.doc = void 0;

var _reactDesc = require("react-desc");

var _utils = require("../../utils");

var doc = function doc(Markdown) {
  var DocumentedMarkdown = (0, _reactDesc.describe)(Markdown).availableAt((0, _utils.getAvailableAtBadge)('Markdown')).description('Markdown formatting using Grommet components.').usage("import { Markdown } from 'grommet';\n      <Markdown>{content}</Markdown>"); // DocumentedMarkdown.propTypes = {
  //   content: PropTypes.string.description('The markdown text to render.'),
  // };

  return DocumentedMarkdown;
};

exports.doc = doc;