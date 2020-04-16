"use strict";

exports.__esModule = true;
exports.doc = void 0;

var _reactDesc = require("react-desc");

var _utils = require("../../utils");

var doc = function doc(Sidebar) {
  var DocumentedSidebar = (0, _reactDesc.describe)(Sidebar).availableAt((0, _utils.getAvailableAtBadge)('Sidebar')).description('A sidebar, typically used with Nav children.').usage("import { Sidebar } from 'grommet';\n<Sidebar/>").intrinsicElement('div');
  DocumentedSidebar.propTypes = {
    footer: _reactDesc.PropTypes.node.description('If specified, a footer element for the Sidebar'),
    header: _reactDesc.PropTypes.node.description('If specified, an header element for the Sidebar')
  };
  return DocumentedSidebar;
};

exports.doc = doc;