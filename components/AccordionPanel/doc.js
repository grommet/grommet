"use strict";

exports.__esModule = true;
exports.doc = doc;
exports.themeDoc = void 0;

var _reactDesc = require("react-desc");

function doc(Panel) {
  var DocumentedAccordionPanel = (0, _reactDesc.describe)(Panel).description('An Accordion panel.');
  DocumentedAccordionPanel.propTypes = {
    label: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.string, _reactDesc.PropTypes.node]).description('The panel label.'),
    header: _reactDesc.PropTypes.node.description('If specified, the entire panel header will be managed by the caller.')
  };
  return DocumentedAccordionPanel;
}

var themeDoc = {
  'accordion.icons.collapse': {
    description: 'The icon to use when the panel is expanded.',
    type: 'React.element',
    defaultValue: '<FormUp />'
  },
  'accordion.icons.expand': {
    description: 'The icon to use when the panel is collapsed.',
    type: 'React.element',
    defaultValue: '<FormDown />'
  }
};
exports.themeDoc = themeDoc;