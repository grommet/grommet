import { describe, PropTypes } from 'react-desc';
export var doc = function doc(Tab) {
  var DocumentedTab = describe(Tab).description('One tab within Tabs.').usage("import { Tab } from 'grommet';\n<Tab />").intrinsicElement('button');
  DocumentedTab.propTypes = {
    disabled: PropTypes.bool.description('Whether the tab is disabled.').defaultValue(false),
    icon: PropTypes.element.description('Icon element to place in the tab.'),
    plain: PropTypes.bool.description('Whether this is a plain tab with no style.').defaultValue(false),
    reverse: PropTypes.bool.description("Whether an icon and label should be reversed so that the icon is at the\n              end of the tab.").defaultValue(false),
    title: PropTypes.node.description('The title of the tab.')
  };
  return DocumentedTab;
};
export var themeDoc = {
  'tab.active': {
    description: 'styles for the active tab.',
    type: 'object',
    defaultValue: "{color: 'text', background: undefined }"
  },
  'tab.background': {
    description: 'background styling of Tab.',
    type: 'object',
    defaultValue: undefined
  },
  'tab.border': {
    description: 'border styles of the tab',
    type: 'object',
    defaultValue: "{\n      side: 'bottom',\n      size: 'small',\n      color: {\n        dark: 'accent-1',\n        light: 'brand',\n      },\n      active: {\n        color: {\n          dark: 'white',\n          light: 'black',\n        },\n      },\n      hover: {\n        color: {\n          dark: 'white',\n          light: 'black',\n        },\n        // extend: undefined,\n      },\n    }"
  },
  'tab.border.disabled.color': {
    description: 'border color of the Tab when disabled',
    type: 'string | {dark: string, light: string}',
    defaultValue: undefined
  },
  'tab.color': {
    description: 'text color for the Tab.',
    type: 'string | {dark: string, light: string}',
    defaultValue: 'control'
  },
  'tab.disabled.color': {
    description: 'text color of the Tab when disabled.',
    type: 'string | {dark: string, light: string}',
    defaultValue: undefined
  },
  'tab.extend': {
    description: 'Any additional style for Tab.',
    type: 'string | (props) => {}',
    defaultValue: undefined
  },
  'tab.hover.background': {
    description: 'background style of the Tab on hover.',
    type: 'string | object',
    defaultValue: undefined
  },
  'tab.hover.color': {
    description: 'text color of the tab on hover.',
    type: 'string | { dark: string, light: string }',
    defaultValue: "{ dark: 'white', light: 'black' }"
  },
  'tab.hover.extend': {
    description: 'Any additional style for Tab hover.',
    type: 'string | (props) => {}',
    defaultValue: undefined
  },
  'tab.margin': {
    description: 'The margin of Tab.',
    type: 'string | object',
    defaultValue: "{ vertical: 'xxsmall', horizontal: 'small' }"
  },
  'tab.pad': {
    description: 'The pad of Tab.',
    type: 'string | object',
    defaultValue: "{ bottom: 'xsmall' }"
  }
};