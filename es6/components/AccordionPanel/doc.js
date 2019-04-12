import { describe, PropTypes } from 'react-desc';
export function doc(Panel) {
  var DocumentedAccordionPanel = describe(Panel).description('An Accordion panel.').intrinsicElement('div');
  DocumentedAccordionPanel.propTypes = {
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).description('The panel label.'),
    header: PropTypes.node.description('If specified, the entire panel header will be managed by the caller.')
  };
  return DocumentedAccordionPanel;
}
export var themeDoc = {
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
  'accordion.border.color': {
    description: 'The border color to use in the accordion.',
    type: 'string | { dark: string, light: string }',
    defaultValue: 'border'
  },
  'accordion.border.side': {
    description: 'The border side to use in the accordion.',
    type: 'string',
    defaultValue: 'bottom'
  }
};