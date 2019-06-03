"use strict";

exports.__esModule = true;
exports.themeDoc = exports.doc = void 0;

var _reactDesc = require("react-desc");

var doc = function doc(Collapsible) {
  var DocumentedCollapsible = (0, _reactDesc.describe)(Collapsible).description('Expand or collapse animation.').usage("import { Collapsible } from 'grommet';\n<Collapsible open>test</Collapsible>").intrinsicElement('div');
  DocumentedCollapsible.propTypes = {
    open: _reactDesc.PropTypes.bool.description('Whether or not the component should be open.'),
    direction: _reactDesc.PropTypes.oneOf(['horizontal', 'vertical']).description('Direction to animate the collapsible content.').defaultValue('vertical')
  };
  return DocumentedCollapsible;
};

exports.doc = doc;
var themeDoc = {
  'collapsible.minSpeed': {
    description: 'The minimum speed of Collapsible animation in milliseconds.',
    type: 'number',
    defaultValue: 200
  },
  'collapsible.baseline': {
    description: 'Default height to be used to calculate the optimal collapsible speed.',
    type: 'number',
    defaultValue: 500
  },
  'collapsible.extend': {
    description: 'Any additional style for Collapsible.',
    type: 'string | (props) => {}',
    defaultValue: undefined
  }
};
exports.themeDoc = themeDoc;