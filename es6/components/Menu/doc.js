function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { describe, PropTypes } from 'react-desc';
import { genericProps } from '../../utils/prop-types';
import { getAvailableAtBadge } from '../../utils/mixins';
var VERTICAL_ALIGN_OPTIONS = ['top', 'bottom'];
var HORIZONTAL_ALIGN_OPTIONS = ['right', 'left'];
export var doc = function doc(Menu) {
  var DocumentedMenu = describe(Menu).availableAt(getAvailableAtBadge('Menu', 'Controls')).description("A control that opens a Drop containing plain Buttons.").details("The labels and behavior of the contained Buttons are described\n      via the `items` property.\n      You can provide a single function child that will be called with\n      'disabled', 'hover', 'focus', and 'drop' keys. \n      This allows you to customize the rendering of the Menu button \n      in those cases.").usage("import { Menu } from 'grommet';\n<Menu />").intrinsicElement('button');
  DocumentedMenu.propTypes = _extends({}, genericProps, {
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).description("Menu can take in children as a function or node.\n\n- Function that will be called to render the visual representation.\nIt will be passed a props object. The props passed are\ndifferent depending on the menu `open` state. When the menu is closed,\ntwo props are passed:\n`{ hover, focus }`,\nbut when the menu is open, all menu props are passed to this function.\nIt should return a React element.\nFor example:\n`children={(props) => <Box ...>{...}</Box>}`\n**Note:** This function will be invoked on every mouse move when hovering.\n- Node is anything that can be rendered, e.g.\n`<Box><CaretNext /><Text>Open Me</Text></Box>`\n"),
    disabled: PropTypes.bool.description('Whether the menu should be disabled.').defaultValue(false),
    dropAlign: PropTypes.shape({
      top: PropTypes.oneOf(VERTICAL_ALIGN_OPTIONS),
      bottom: PropTypes.oneOf(VERTICAL_ALIGN_OPTIONS),
      left: PropTypes.oneOf(HORIZONTAL_ALIGN_OPTIONS),
      right: PropTypes.oneOf(HORIZONTAL_ALIGN_OPTIONS)
    }).description("Where to place the drop down.\nThe keys correspond to a side of the drop down.\nThe values correspond to a side of the control. For instance,\n`{left: 'left', top: 'bottom'}` would align the left edges and the top of\nthe drop down to the bottom of the control. At most one of left or right and\none of top or bottom should be specified.").defaultValue({
      top: 'top',
      left: 'left'
    }),
    dropBackground: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
      color: PropTypes.string,
      opacity: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.oneOf(['weak', 'medium', 'strong'])])
    })]).description('Background color when drop is active'),
    dropTarget: PropTypes.object.description("Target where the drop will be aligned to. This should be\n      a React reference. Typically, this is not required as the drop will be\n      aligned to the Menu itself by default."),
    dropProps: PropTypes.object.description('Any valid Drop prop.').defaultValue(undefined),
    justifyContent: PropTypes.oneOf(['start', 'center', 'end', 'between', 'around', 'stretch']).description('How to align the contents along the row axis.').defaultValue('start'),
    icon: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]).description('Indicates the icon shown as a control to open it.'),
    items: PropTypes.arrayOf(PropTypes.object).description("Menu items to be placed inside the drop down.\nThe object values can be any Button prop, \nfor example: `label`, `onClick`, and `href`.").isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).description('Indicates the label shown as a control to open it.'),
    messages: PropTypes.shape({
      closeMenu: PropTypes.string,
      openMenu: PropTypes.string
    }).description("Custom messages. Used for accessibility by screen readers. \n      These values will be overridden if an a11yTitle is provided.").defaultValue({
      openMenu: 'Open Menu',
      closeMenu: 'Close Menu'
    }),
    open: PropTypes.bool.description('Whether the state of the component should be open').defaultValue(false),
    size: PropTypes.oneOfType([PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']), PropTypes.string]).description('The size of the menu.').defaultValue('medium')
  });
  return DocumentedMenu;
};
export var themeDoc = {
  'global.colors.control': {
    description: "The default color to use for the icon.",
    type: 'string | { dark: string, light: string }',
    defaultValue: "{ dark: 'accent-1', light: 'brand'}"
  },
  'menu.icons.color': {
    description: 'The color to use for the icon.',
    type: 'string | { dark: string, light: string }',
    defaultValue: 'control'
  },
  'menu.background': {
    description: 'The color for the background of the menu Drop when it is open.',
    type: 'string',
    defaultValue: undefined
  },
  'menu.drop': {
    description: 'Any valid Drop props for the Menu drop.',
    type: 'object',
    defaultValue: "align: {\n      top: 'top',\n      left: 'left',\n    },"
  },
  'menu.extend': {
    description: 'Any additional style for the Menu.',
    type: 'string | (props) => {}',
    defaultValue: undefined
  },
  'menu.icons.down': {
    description: "The icon to show to the right of the label when menu is \n    closed.",
    type: 'React.Element',
    defaultValue: '<FormDown />'
  },
  'menu.icons.up': {
    description: "The icon to show to the right of the label when menu is \n    opened.",
    type: 'undefined | React.Element',
    defaultValue: 'undefined'
  }
};