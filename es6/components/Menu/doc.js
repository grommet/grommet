function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { describe, PropTypes } from 'react-desc';
import { genericProps, getAvailableAtBadge } from '../../utils';
var VERTICAL_ALIGN_OPTIONS = ['top', 'bottom'];
var HORIZONTAL_ALIGN_OPTIONS = ['right', 'left'];
export var doc = function doc(Menu) {
  var DocumentedMenu = describe(Menu).availableAt(getAvailableAtBadge('Menu')).description("Presents a list of choices within a drop down via a control that\n      opens it.").usage("import { Menu } from 'grommet';\n<Menu />");
  DocumentedMenu.propTypes = _extends({}, genericProps, {
    disabled: PropTypes.bool.description('Whether the menu should be disabled.').defaultValue(false),
    dropAlign: PropTypes.shape({
      top: PropTypes.oneOf(VERTICAL_ALIGN_OPTIONS),
      bottom: PropTypes.oneOf(VERTICAL_ALIGN_OPTIONS),
      left: PropTypes.oneOf(HORIZONTAL_ALIGN_OPTIONS),
      right: PropTypes.oneOf(HORIZONTAL_ALIGN_OPTIONS)
    }).description("Where to place the drop down. The keys correspond to a side of the drop down.\nThe values correspond to a side of the control. For instance,\n{left: 'left', top: 'bottom'} would align the left edges and the top of\nthe drop down to the bottom of the control. At most one of left or right and\none of top or bottom should be specified.").defaultValue({
      top: 'top',
      left: 'left'
    }),
    dropBackground: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
      color: PropTypes.string,
      opacity: PropTypes.oneOfType([PropTypes.oneOf(['weak', 'medium', 'strong']), PropTypes.bool])
    })]).description('Background color when drop is active'),
    dropTarget: PropTypes.object.description("Target where the drop will be aligned to. This should be\n      a React reference. Typically, this is not required as the drop will be\n      aligned to the Menu itself by default."),
    icon: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]).description('Indicates the icon shown as a control to open it.'),
    items: PropTypes.arrayOf(PropTypes.object).description("Menu items to be placed inside the drop down.\nThe object values can be any Button prop, for example: label and onClick.").isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).description('Indicates the label shown as a control to open it.'),
    messages: PropTypes.shape({
      closeMenu: PropTypes.string,
      openMenu: PropTypes.string
    }).description('Custom messages. Used for accessibility by screen readers.').defaultValue({
      openMenu: 'Open Menu',
      closeMenu: 'Close Menu'
    }),
    size: PropTypes.oneOfType([PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']), PropTypes.string]).description('The size of the menu.').defaultValue('medium')
  });
  return DocumentedMenu;
};