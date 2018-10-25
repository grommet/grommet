import { describe, PropTypes } from 'react-desc';

export function doc(Panel) {
  const DocumentedAccordionPanel = describe(Panel).description('An Accordion panel.');
  DocumentedAccordionPanel.propTypes = {
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).description('The panel label.'),
    header: PropTypes.node.description('If specified, the entire panel header will be managed by the caller.'),
  };
  return DocumentedAccordionPanel;
}
