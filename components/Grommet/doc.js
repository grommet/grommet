"use strict";

exports.__esModule = true;
exports.doc = void 0;

var _reactDesc = require("react-desc");

var _utils = require("../../utils");

var doc = function doc(Grommet) {
  var DocumentedGrommet = (0, _reactDesc.describe)(Grommet).availableAt((0, _utils.getAvailableAtBadge)('Grommet')).description('This is the top level Grommet container.').usage("import { Grommet } from 'grommet';\n<Grommet>...</Grommet>");
  DocumentedGrommet.propTypes = {
    full: _reactDesc.PropTypes.bool.description('Whether to take the whole viewport.').defaultValue(false),
    plain: _reactDesc.PropTypes.bool.description('Whether or not Grommet should apply a global font-family, font-size, and line-height.').defaultValue(false),
    theme: _reactDesc.PropTypes.object.description('Custom styles for Grommet app component.')
  };
  return DocumentedGrommet;
};

exports.doc = doc;