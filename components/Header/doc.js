"use strict";

exports.__esModule = true;
exports.doc = void 0;

var _reactDesc = require("react-desc");

var _utils = require("../../utils");

var doc = function doc(Header) {
  var DocumentedHeader = (0, _reactDesc.describe)(Header).availableAt((0, _utils.getAvailableAtBadge)('Header')).description('Is a Box container for introductory content').usage("import { Header } from 'grommet';\n<Header />");
  return DocumentedHeader;
};

exports.doc = doc;