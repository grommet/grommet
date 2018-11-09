"use strict";

exports.__esModule = true;
exports.doc = void 0;

var _reactDesc = require("react-desc");

var _utils = require("../../utils");

var doc = function doc(AnnounceContext) {
  var DocumentedAnnounceContext = (0, _reactDesc.describe)(AnnounceContext).availableAt((0, _utils.getAvailableAtBadge)('AnnounceContext')).description('A means of announcing events for screen readers.').usage("import { AnnounceContext } from 'grommet';\n<AnnounceContext.Consumer />\n{announce => ()}");
  DocumentedAnnounceContext.propTypes = {
    children: _reactDesc.PropTypes.func.description("Render function that will be called with an 'announce' function that\n      can be called when something should be announced.")
  };
  return DocumentedAnnounceContext;
};

exports.doc = doc;