import { describe, PropTypes } from 'react-desc';

import { genericProps, getAvailableAtBadge } from '../../utils';

export const doc = Accordion => {
  const DocumentedAccordion = describe(Accordion)
    .availableAt(getAvailableAtBadge('Accordion'))
    .description('An accordion containing collapsible panels.')
    .usage(
      `import { Accordion, AccordionPanel } from 'grommet';
<Accordion>
  <AccordionPanel label='Panel 1'>...</AccordionPanel>
  <AccordionPanel label='Panel 2'>...</AccordionPanel>
</Accordion>`,
    )
    .intrinsicElement('div');

  DocumentedAccordion.propTypes = {
    ...genericProps,
    activeIndex: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.arrayOf(PropTypes.number),
    ])
      .description(
        `Active panel index. If specified, Accordion will be a controlled 
component. This means that future panel changes will not work unless you
subscribe to onActive function and update activeIndex accordingly.`,
      )
      .defaultValue(0),
    animate: PropTypes.bool
      .description('Transition content in & out with a slide down animation.')
      .defaultValue(true),
    children: PropTypes.node.description('Array of AccordionPanels.'),
    onActive: PropTypes.func.description(
      `Function that will be called when the active index changes.
It will always send an array with currently active panel indexes.`,
    ),
    multiple: PropTypes.bool
      .description('Allow multiple panels to be opened at once.')
      .defaultValue(false),
    messages: PropTypes.shape({
      tabContents: PropTypes.string,
    })
      .description(
        'Custom messages for Tabs. Used for accessibility by screen readers.',
      )
      .defaultValue({
        tabContents: 'Tab Contents',
      }),
  };

  return DocumentedAccordion;
};
