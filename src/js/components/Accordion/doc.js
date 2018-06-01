import { describe, PropTypes } from 'react-desc';

import {
  getAvailableAtBadge,
} from '../../utils';

import AccordionPanel from './AccordionPanel';

export function accordionPanel(Panel) {
  const DocumentedAccordionPanel = describe(Panel)
    .description(
      'An Accordion panel.'
    );
  DocumentedAccordionPanel.propTypes = {
    title: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]).description(
      'The panel title.'
    ).isRequired,
  };
  return DocumentedAccordionPanel;
}

export default (Accordion) => {
  const DocumentedAccordion = describe(Accordion)
    .availableAt(getAvailableAtBadge('Accordion'))
    .description('A collapsible accordion component.')
    .usage(
      `import { Accordion, AccordionPanel } from 'grommet';
<Accordion>
  <AccordionPanel title='Panel 1'>...</AccordionPanel>
  <AccordionPanel title='Panek 2'>...</AccordionPanel>
</Accordion>`
    );

  DocumentedAccordion.propTypes = {
    activeIndex: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.arrayOf(PropTypes.number),
    ]).description(
      `Active panel index. If specified, Accordion will be a controlled component. This means that future
panel changes will not work unless you subscribe to onActive function and update activeIndex
accordingly.`
    ).defaultValue(0),
    animate: PropTypes.bool.description(
      'Transition content in & out with a slide down animation.'
    ).defaultValue(true),
    children: PropTypes.arrayOf(PropTypes.instanceOf(AccordionPanel)).description(
      'Array of AccordionPanels.'
    ).isRequired,
    onActive: PropTypes.func.description(
      `Function that will be called with the active panel index when the currently active
accordion changes.`
    ),
    multiple: PropTypes.bool.description(
      'Allow multiple panels to be opened at once.'
    ).defaultValue(false),
    messages: PropTypes.shape({
      tabContents: PropTypes.string,
    }).description(
      'Custom messages for Tabs. Used for accessibility by screen readers.'
    ).defaultValue({
      tabContents: 'Tab Contents',
    }),
  };

  return DocumentedAccordion;
};
