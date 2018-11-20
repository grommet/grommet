"use strict";

exports.__esModule = true;
exports.doc = void 0;

var _reactDesc = require("react-desc");

var _utils = require("../../utils");

var doc = function doc(ResponsiveContext) {
  var DocumentedResponsiveContext = (0, _reactDesc.describe)(ResponsiveContext).availableAt((0, _utils.getAvailableAtBadge)('ResponsiveContext')).description("A means of providing different rendering behavior based on the\n      screen resolution.").usage("import { ResponsiveContext } from 'grommet';\n<ResponsiveContext.Consumer />\n{resolution => ()}");
  DocumentedResponsiveContext.propTypes = {
    children: _reactDesc.PropTypes.func.description("Render function that will be called with the current screen resolution\n      size (e.g 'wide', 'narrow'). The size value will be derived from global.breakpoints entry\n      in the theme object.")
  };
  return DocumentedResponsiveContext;
};

exports.doc = doc;