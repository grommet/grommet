"use strict";

exports.__esModule = true;
exports.doc = void 0;

var _reactDesc = require("react-desc");

var _mixins = require("../../utils/mixins");

var doc = function doc(Nav) {
  var DocumentedNav = (0, _reactDesc.describe)(Nav).availableAt((0, _mixins.getAvailableAtBadge)('Nav', 'Controls')).description('Is a Box container for navigation links').usage("import { Nav } from 'grommet';\n<Nav />");
  return DocumentedNav;
};

exports.doc = doc;