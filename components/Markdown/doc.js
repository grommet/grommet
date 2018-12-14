"use strict";

exports.__esModule = true;
exports.doc = void 0;

var _reactDesc = require("react-desc");

var _utils = require("../../utils");

var doc = function doc(Markdown) {
  var DocumentedMarkdown = (0, _reactDesc.describe)(Markdown).availableAt((0, _utils.getAvailableAtBadge)('Markdown')).description('Markdown formatting using Grommet components.').usage("import { Markdown } from 'grommet';\n      <Markdown>{content}</Markdown>");
  DocumentedMarkdown.propTypes = {
    components: _reactDesc.PropTypes.objectOf(_reactDesc.PropTypes.element).description("Custom components to override default html tags such as 'img' or 'pre'.\nBy default only 'p' and 'a' are overrided with the Paragraph and Anchor components")
  };
  return DocumentedMarkdown;
};

exports.doc = doc;