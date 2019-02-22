import { describe, PropTypes } from 'react-desc';

import { genericProps, getAvailableAtBadge } from '../../utils';

export const doc = Tabs => {
  const DocumentedTabs = describe(Tabs)
    .availableAt(getAvailableAtBadge('Tabs'))
    .description('A container with controls to show one Tab at a time.')
    .usage(
      `import { Tabs, Tab } from 'grommet';
<Tabs>
  <Tab title='Tab 1'>...</Tab>
  <Tab title='Tab 2'>...</Tab>
</Tabs>`,
    )
    .intrinsicElement('div');

  DocumentedTabs.propTypes = {
    ...genericProps,
    activeIndex: PropTypes.number.description(
      `Active tab index. If specified, Tabs will be a controlled component.
This means that future tab changes will not work unless you subscribe to
onActive function and update activeIndex accordingly.`,
    ),
    children: PropTypes.node.description('Array of Tab.').isRequired,
    flex: PropTypes.oneOfType([
      PropTypes.oneOf(['grow', 'shrink']),
      PropTypes.bool,
    ]).description('Whether flex-grow and/or flex-shrink is true.'),
    justify: PropTypes.oneOf(['start', 'center', 'end'])
      .description('How to align the tabs along the main axis.')
      .defaultValue('center'),
    messages: PropTypes.shape({
      tabContents: PropTypes.string,
    })
      .description(
        'Custom messages for Tabs. Used for accessibility by screen readers.',
      )
      .defaultValue({
        tabContents: 'Tab Contents',
      }),
    onActive: PropTypes.func.description(
      `Function that will be called with the active tab index when the
currently active tab changes.`,
    ),
  };
  return DocumentedTabs;
};

export const themeDoc = {
  'tabs.background': {
    description: 'background styling of Tabs.',
    type: 'object',
    defaultValue: undefined,
  },
  'tabs.extend': {
    description: 'Any additional style for Tabs.',
    type: 'string | (props) => {}',
    defaultValue: undefined,
  },
  'tabs.gap': {
    description: 'The gap size between the Tabs.',
    type: 'string',
    defaultValue: undefined,
  },
  'tabs.header.background': {
    description: 'The background styles of Tabs header.',
    type: '',
    defaultValue: undefined,
  },
  'tabs.header.extend': {
    description: 'Any additional style for Tabs header.',
    type: 'string | (props) => {}',
    defaultValue: undefined,
  },
  'tabs.panel.extend': {
    description: 'Any additional style for Tabs panel.',
    type: 'string | (props) => {}',
    defaultValue: undefined,
  },
};
