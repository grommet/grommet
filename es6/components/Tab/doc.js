import { describe, PropTypes } from 'react-desc';
export var doc = function doc(Tab) {
  var DocumentedTab = describe(Tab).description('One tab within Tabs.').usage("import { Tab } from 'grommet';\n<Tab />").intrinsicElement('button');
  DocumentedTab.propTypes = {
    plain: PropTypes.bool.description('Whether this is a plain tab with no style.').defaultValue(false),
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).description('The title of the tab.')
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
  'tab.color': {
    description: 'text color for the Tab.',
    type: 'string',
    defaultValue: 'control'
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