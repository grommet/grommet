"use strict";

exports.__esModule = true;
exports.doc = void 0;

var _reactDesc = require("react-desc");

var _utils = require("../../utils");

var doc = function doc(Main) {
  var DocumentedMain = (0, _reactDesc.describe)(Main).availableAt((0, _utils.getAvailableAtBadge)('Main')).description('main content of a document.').usage("import { Main } from 'grommet';\n<Main />");
  return DocumentedMain;
};

exports.doc = doc;