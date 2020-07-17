"use strict";

exports.__esModule = true;
exports.themeDoc = exports.doc = void 0;

var _reactDesc = require("react-desc");

var _utils = require("../../utils");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var VERTICAL_ALIGN_OPTIONS = ['top', 'bottom'];
var HORIZONTAL_ALIGN_OPTIONS = ['right', 'left'];

var doc = function doc(Menu) {
  var DocumentedMenu = (0, _reactDesc.describe)(Menu).availableAt((0, _utils.getAvailableAtBadge)('Menu')).description("A control that opens a Drop containing plain Buttons.").details("The labels and behavior of the contained Buttons are described\n      via the `items` property.\n      You can provide a single function child that will be called with\n      'hover', 'focus', and 'drop' keys. This allows you to customize\n      the rendering of the Menu button in those cases.").usage("import { Menu } from 'grommet';\n<Menu />").intrinsicElement('button');
  DocumentedMenu.propTypes = _extends({}, _utils.genericProps, {
    children: _reactDesc.PropTypes.func.description("Function that will be called to render the visual representation.\n      It will be passed an object containing button props.\n      It should return a react element.\n      For example:\n      `children={({ drop, hover }) => <Box ...>{...}</Box>}`\n      "),
    disabled: _reactDesc.PropTypes.bool.description('Whether the menu should be disabled.').defaultValue(false),
    dropAlign: _reactDesc.PropTypes.shape({
      top: _reactDesc.PropTypes.oneOf(VERTICAL_ALIGN_OPTIONS),
      bottom: _reactDesc.PropTypes.oneOf(VERTICAL_ALIGN_OPTIONS),
      left: _reactDesc.PropTypes.oneOf(HORIZONTAL_ALIGN_OPTIONS),
      right: _reactDesc.PropTypes.oneOf(HORIZONTAL_ALIGN_OPTIONS)
    }).description("Where to place the drop down.\nThe keys correspond to a side of the drop down.\nThe values correspond to a side of the control. For instance,\n{left: 'left', top: 'bottom'} would align the left edges and the top of\nthe drop down to the bottom of the control. At most one of left or right and\none of top or bottom should be specified.").defaultValue({
      top: 'top',
      left: 'left'
    }),
    dropBackground: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.string, _reactDesc.PropTypes.shape({
      color: _reactDesc.PropTypes.string,
      opacity: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.bool, _reactDesc.PropTypes.number, _reactDesc.PropTypes.oneOf(['weak', 'medium', 'strong'])])
    })]).description('Background color when drop is active'),
    dropTarget: _reactDesc.PropTypes.object.description("Target where the drop will be aligned to. This should be\n      a React reference. Typically, this is not required as the drop will be\n      aligned to the Menu itself by default."),
    dropProps: _reactDesc.PropTypes.object.description('Any valid Drop prop.'),
    justifyContent: _reactDesc.PropTypes.oneOf(['start', 'center', 'end', 'between', 'around', 'stretch']).description('How to align the contents along the row axis.').defaultValue('start'),
    icon: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.bool, _reactDesc.PropTypes.node]).description('Indicates the icon shown as a control to open it.'),
    items: _reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.object).description("Menu items to be placed inside the drop down.\nThe object values can be any Button prop, \nfor example: label, onClick, and href.").isRequired,
    label: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.string, _reactDesc.PropTypes.node]).description('Indicates the label shown as a control to open it.'),
    messages: _reactDesc.PropTypes.shape({
      closeMenu: _reactDesc.PropTypes.string,
      openMenu: _reactDesc.PropTypes.string
    }).description("Custom messages. Used for accessibility by screen readers. \n      These values will be overridden if an a11yTitle is provided.").defaultValue({
      openMenu: 'Open Menu',
      closeMenu: 'Close Menu'
    }),
    open: _reactDesc.PropTypes.bool.description('Whether the state of the component should be open').defaultValue(false),
    size: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']), _reactDesc.PropTypes.string]).description('The size of the menu.').defaultValue('medium')
  });
  return DocumentedMenu;
};

exports.doc = doc;
var themeDoc = {
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
exports.themeDoc = themeDoc;