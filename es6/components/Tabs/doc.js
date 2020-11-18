function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { describe, PropTypes } from 'react-desc';
import { genericProps } from '../../utils/prop-types';
import { getAvailableAtBadge } from '../../utils/mixins';
export var doc = function doc(Tabs) {
  var DocumentedTabs = describe(Tabs).availableAt(getAvailableAtBadge('Tabs', 'Controls')).description('A container with controls to show one Tab at a time.').usage("import { Tabs, Tab } from 'grommet';\n<Tabs>\n  <Tab title='Tab 1'>...</Tab>\n  <Tab title='Tab 2'>...</Tab>\n</Tabs>").intrinsicElement('div');
  DocumentedTabs.propTypes = _extends({}, genericProps, {
    activeIndex: PropTypes.number.description("Active tab index. If specified, Tabs will be a controlled component.\nThis means that future tab changes will not work unless you subscribe to\nonActive function and update activeIndex accordingly."),
    alignControls: PropTypes.oneOf(['start', 'center', 'end', 'stretch']).description('How to align the tab controls within the tabs header.'),
    children: PropTypes.node.description('Array of Tab.').isRequired,
    flex: PropTypes.oneOfType([PropTypes.oneOf(['grow', 'shrink']), PropTypes.bool]).description('Whether flex-grow and/or flex-shrink is true.'),
    justify: PropTypes.oneOf(['start', 'center', 'end']).description('How to align the tabs along the main axis.').defaultValue('center'),
    messages: PropTypes.shape({
      tabContents: PropTypes.string
    }).description('Custom messages for Tabs. Used for accessibility by screen readers.').defaultValue({
      tabContents: 'Tab Contents'
    }),
    onActive: PropTypes.func.description("Function that will be called with the active tab index when the\ncurrently active tab changes.")
  });
  return DocumentedTabs;
};
export var themeDoc = {
  'global.borderSize': {
    description: 'The size of the border.',
    type: 'string',
    defaultValue: "{\n      xsmall: '1px',\n      small: '2px',\n      medium: '4px',\n      large: '12px',\n      xlarge: '24px,\n    }"
  },
  'global.colors.border': {
    description: 'The color of tabs border.',
    type: 'string | { dark: string, light: string }',
    defaultValue: '{ dark: rgba(255, 255, 255, 0.33), light: rgba(0, 0, 0, 0.33) }'
  },
  'global.edgeSize.small': {
    description: 'The possible sizes for margin, pad and gap.',
    type: 'string',
    defaultValue: '6px'
  },
  'tabs.background': {
    description: 'background styling of Tabs.',
    type: 'string | object',
    defaultValue: undefined
  },
  'tabs.extend': {
    description: 'Any additional style for Tabs.',
    type: 'string | (props) => {}',
    defaultValue: undefined
  },
  'tabs.gap': {
    description: 'The gap size between the Tabs.',
    type: 'string',
    defaultValue: undefined
  },
  'tabs.header.background': {
    description: 'The background styles of Tabs header.',
    type: 'string | { dark: string, light: string }',
    defaultValue: undefined
  },
  'tabs.header.border.color': {
    description: 'border color of the tabs controls',
    type: 'string | { dark: string, light: string }',
    defaultValue: undefined
  },
  'tabs.header.border.side': {
    description: 'side of the border of the tabs controls',
    type: 'string',
    defaultValue: undefined
  },
  'tabs.header.border.size': {
    description: 'border size of the tabs controls',
    type: 'string',
    defaultValue: undefined
  },
  'tabs.header.border.style': {
    description: 'border style of the tabs controls',
    type: 'string',
    defaultValue: 'undefined'
  },
  'tabs.header.extend': {
    description: 'Any additional style for Tabs header.',
    type: 'string | (props) => {}',
    defaultValue: undefined
  },
  'tabs.panel.extend': {
    description: 'Any additional style for Tabs panel.',
    type: 'string | (props) => {}',
    defaultValue: undefined
  }
};