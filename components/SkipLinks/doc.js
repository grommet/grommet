"use strict";

exports.__esModule = true;
exports.doc = void 0;

var _reactDesc = require("react-desc");

var _utils = require("../../utils");

var doc = function doc(SkipLinks) {
  var DocumentedSkipLinks = (0, _reactDesc.describe)(SkipLinks).availableAt((0, _utils.getAvailableAtBadge)('SkipLinks')).description('Describe a list of elements to skip to.').usage("import { SkipLinks } from 'grommet';\n<SkipLinks elements={['main', 'footer']} />");
  DocumentedSkipLinks.propTypes = {
    children: _reactDesc.PropTypes.node.description('Array of SkipLink').isRequired,
    messages: _reactDesc.PropTypes.shape({
      skipTo: _reactDesc.PropTypes.string
    }).description('Custom messages for SkipLinks. Used for accessibility by screen readers.')
  };
  return DocumentedSkipLinks;
};

exports.doc = doc;