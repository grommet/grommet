import { describe, PropTypes } from 'react-desc';
export function doc(Panel) {
  var DocumentedAccordionPanel = describe(Panel).description('An Accordion panel.');
  DocumentedAccordionPanel.propTypes = {
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).description('The panel label.'),
    header: PropTypes.node.description('If specified, the entire panel header will be managed by the caller.')
  };
  return DocumentedAccordionPanel;
}
export var themeDoc = {
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