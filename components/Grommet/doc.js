"use strict";

exports.__esModule = true;
exports.themeDoc = exports.doc = void 0;

var _reactDesc = require("react-desc");

var _utils = require("../../utils");

var doc = function doc(Grommet) {
  var DocumentedGrommet = (0, _reactDesc.describe)(Grommet).availableAt((0, _utils.getAvailableAtBadge)('Grommet')).description('The top level Grommet container.').usage("import { Grommet } from 'grommet';\n<Grommet>...</Grommet>").intrinsicElement('div');
  DocumentedGrommet.propTypes = {
    background: _utils.backgroundDoc,
    dir: _reactDesc.PropTypes.oneOf(['rtl']).description('Layout direction for right to left contexts'),
    full: _reactDesc.PropTypes.bool.description('Whether to take the whole viewport.').defaultValue(false),
    plain: _reactDesc.PropTypes.bool.description("Whether or not Grommet should apply a global font-family, font-size,\n        and line-height.").defaultValue(false),
    cssVars: _reactDesc.PropTypes.bool.description('Whether to expose the css variables.').defaultValue(false),
    theme: _reactDesc.PropTypes.object.description('Custom styles for Grommet app component.'),
    themeMode: _reactDesc.PropTypes.oneOf(['dark', 'light']).description("Dark vs. light theme variation. Default is unspecified and left to\n      theme."),
    userAgent: _reactDesc.PropTypes.string.description("User agent used to detect the device width for setting the initial\n      breakpoint."),
    containerTarget: _reactDesc.PropTypes.object.description("The node where Drop and Layer containers are inserted. Defaults to\n      document.body which is almost always the right choice. This is used\n      for less common cases like rendering within an internal node (e.g.\n      shadow root).")
  };
  return DocumentedGrommet;
};

exports.doc = doc;
var themeDoc = {
  'grommet.extend': {
    description: 'Any additional style for Grommet.',
    type: 'string | (props) => {}',
    defaultValue: undefined
  },
  'global.font.face': {
    description: 'Custom font face declaration',
    type: 'string | (props) => {}',
    defaultValue: undefined
  }
};
exports.themeDoc = themeDoc;