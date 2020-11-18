"use strict";

exports.__esModule = true;
exports.doc = void 0;

var _reactDesc = require("react-desc");

var _mixins = require("../../utils/mixins");

var doc = function doc(Footer) {
  var DocumentedFooter = (0, _reactDesc.describe)(Footer).availableAt((0, _mixins.getAvailableAtBadge)('Footer', 'Layout')).description('Footer for a document or section').usage("import { Footer } from 'grommet';\n<Footer />");
  return DocumentedFooter;
};

exports.doc = doc;