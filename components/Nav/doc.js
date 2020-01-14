"use strict";

exports.__esModule = true;
exports.doc = void 0;

var _reactDesc = require("react-desc");

var _utils = require("../../utils");

var doc = function doc(Nav) {
  var DocumentedNav = (0, _reactDesc.describe)(Nav).availableAt((0, _utils.getAvailableAtBadge)('Nav')).description('Is a Box container for navigation links').usage("import { Nav } from 'grommet';\n<Nav />");
  return DocumentedNav;
};

exports.doc = doc;