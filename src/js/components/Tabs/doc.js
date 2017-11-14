import { describe, PropTypes } from 'react-desc';

import { getAvailableAtBadge } from '../../utils';

import Tab from './Tab';

export default (Tabs) => {
  const DocumentedTabs = describe(Tabs)
    .availableAt(getAvailableAtBadge('Tabs'))
    .description('A tabular view component.')
    .usage(
      `import { Tabs, Tab } from 'grommet';
<Tabs>
  <Tab title='Tab 1'>...</Tab>
  <Tab title='Tab 2'>...</Tab>
</Tabs>`
    );

  DocumentedTabs.propTypes = {
    activeIndex: PropTypes.number.description(
      'Active tab index. If specified, you must call onActive and update activeIndex yourself.'
    ).defaultValue(0),
    children: PropTypes.arrayOf(PropTypes.instanceOf(Tab)).description(
      'Array of Tab.'
    ).isRequired,
    justify: PropTypes.oneOf(['start', 'center', 'end']).description(
      'How to align the tabs along the main axis.'
    ).defaultValue('center'),
    messages: PropTypes.shape({
      tabContents: PropTypes.string,
    }).description(
      'Custom messages for Tabs. Used for accessibility by screen readers.'
    ).defaultValue({
      tabContents: 'Tab Contents',
    }),
    onActive: PropTypes.func.description(
      `Function that will be called with the active tab index when the currently active
tab changes.`
    ),
  };
  return DocumentedTabs;
};
