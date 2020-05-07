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
  'accordion.hover.heading.color': {
    description: "The text color of the heading when hovered. \n    backward compatible with accordion.hover.color",
    type: 'string | { dark: string, light: string }',
    defaultValue: '{ dark: "light-4", light: "dark-3" }'
  },
  'accordion.heading.level': {
    description: 'The heading level.',
    type: 'number',
    defaultValue: '4'
  },
  'accordion.heading.margin': {
    description: 'The margin size around the heading.',
    type: 'string',
    defaultValue: 'undefined'
  },
  'accordion.icons.collapse': {
    description: 'The icon to use when the panel is expanded.',
    type: 'React.Element',
    defaultValue: '<FormUp />'
  },
  'accordion.icons.color': {
    description: 'The icon color to use in the accordion.',
    type: 'string | { dark: string, light: string }',
    defaultValue: 'control'
  },
  'accordion.icons.expand': {
    description: 'The icon to use when the panel is collapsed.',
    type: 'React.Element',
    defaultValue: '<FormDown />'
  },
  'accordion.border.color': {
    description: 'The border color to use in the accordion panel content.',
    type: 'string | { dark: string, light: string }',
    defaultValue: 'border'
  },
  'accordion.border.side': {
    description: 'The border side to use in the accordion panel content.',
    type: 'string',
    defaultValue: 'bottom'
  },
  'accordion.panel.border.color': {
    description: 'The border color to use on the accordion panel.',
    type: 'string | { dark: string, light: string }',
    defaultValue: undefined
  },
  'accordion.panel.border.side': {
    description: 'The border side to use on the accordion panel.',
    type: 'string',
    defaultValue: undefined
  },
  'accordion.panel.border.size': {
    description: 'The border size of the accordion panel.',
    type: "xsmall | small | medium | large | xlarge",
    defaultValue: undefined
  },
  'accordion.panel.border.style': {
    description: 'The border style of the accordion panel.',
    type: "solid | dashed | dotted | double| groove | ridge \n      | inset | outset | hidden",
    defaultValue: undefined
  }
};
exports.themeDoc = themeDoc;