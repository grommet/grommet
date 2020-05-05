"use strict";

exports.__esModule = true;
exports.doc = void 0;

var _reactDesc = require("react-desc");

var _utils = require("../../utils");

var doc = function doc(Markdown) {
  var DocumentedMarkdown = (0, _reactDesc.describe)(Markdown).availableAt((0, _utils.getAvailableAtBadge)('Markdown')).description('Markdown formatting using Grommet components.').details("Grommet uses 'markdown-to-jsx' in Markdown component,\n      you can see all the options in the documentation.").usage("import { Markdown } from 'grommet';\n      <Markdown>{content}</Markdown>").intrinsicElement('div');
  DocumentedMarkdown.propTypes = {
    components: _reactDesc.PropTypes.shape({}).description("Custom components and props to override html elements such as 'img'\n      or 'pre'. By default 'a', 'p', 'img', and table elements are overridden\n      with grommet components"),
    options: _reactDesc.PropTypes.shape({}).description("Used to tune the jsx compiler to specific properties, available options on [markdown-to-jsx](https://github.com/probablyup/markdown-to-jsx).")
  };
  return DocumentedMarkdown;
};

exports.doc = doc;