"use strict";

exports.__esModule = true;
exports.doc = void 0;

var _reactDesc = require("react-desc");

var _mixins = require("../../utils/mixins");

var doc = function doc(Main) {
  var DocumentedMain = (0, _reactDesc.describe)(Main).availableAt((0, _mixins.getAvailableAtBadge)('Main', 'Layout')).description('main content of a document.').usage("import { Main } from 'grommet';\n<Main />");
  return DocumentedMain;
};

exports.doc = doc;