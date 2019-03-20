"use strict";

exports.__esModule = true;
exports.doc = doc;
exports.themeDoc = void 0;

var _reactDesc = require("react-desc");

function doc(Panel) {
  var DocumentedAccordionPanel = (0, _reactDesc.describe)(Panel).description('An Accordion panel.').intrinsicElement('div');
  DocumentedAccordionPanel.propTypes = {
    label: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.string, _reactDesc.PropTypes.node]).description('The panel label.'),
    header: _reactDesc.PropTypes.node.description('If specified, the entire panel header will be managed by the caller.')
  };
  return DocumentedAccordionPanel;
}

var themeDoc = {
  'accordion.heading.level': {
    description: 'The heading level used for the accordion.',
    type: 'number',
    defaultValue: '4'
  },
  'accordion.icons.collapse': {
    description: 'The icon to use when the panel is expanded.',
    type: 'React.Element',
    defaultValue: '<FormUp />'
  },
  'accordion.icons.expand': {
    description: 'The icon to use when the panel is collapsed.',
    type: 'React.Element',
    defaultValue: '<FormDown />'
  },
  'accordion.border': {
    description: 'The border to use in the accordion.',
    type: 'React.Element',
    defaultValue: 'side: bottom, color: border'
  }
};
exports.themeDoc = themeDoc;