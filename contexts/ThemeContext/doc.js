"use strict";

exports.__esModule = true;
exports.doc = void 0;

var _reactDesc = require("react-desc");

var _mixins = require("../../utils/mixins");

var doc = function doc(ThemeContext) {
  var DocumentedThemeContext = (0, _reactDesc.describe)(ThemeContext).availableAt((0, _mixins.getAvailableAtBadge)('ThemeContext')).description('A means of tweaking the theme for contained components.').usage("import { ThemeContext } from 'grommet';\n" + '<ThemeContext.Extend value={value} />');
  DocumentedThemeContext.propTypes = {
    value: _reactDesc.PropTypes.shape({}).description('Sparse theme object that will be merged with the current theme.')
  };
  return DocumentedThemeContext;
};

exports.doc = doc;