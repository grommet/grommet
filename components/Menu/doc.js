"use strict";

exports.__esModule = true;
exports.doc = void 0;

var _reactDesc = require("react-desc");

var _utils = require("../../utils");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var VERTICAL_ALIGN_OPTIONS = ['top', 'bottom'];
var HORIZONTAL_ALIGN_OPTIONS = ['right', 'left'];

var doc = function doc(Menu) {
  var DocumentedMenu = (0, _reactDesc.describe)(Menu).availableAt((0, _utils.getAvailableAtBadge)('Menu')).description("Presents a list of choices within a drop down via a control that\n      opens it.").usage("import { Menu } from 'grommet';\n<Menu />");
  DocumentedMenu.propTypes = _extends({}, _utils.genericProps, {
    disabled: _reactDesc.PropTypes.bool.description('Whether the menu should be disabled.').defaultValue(false),
    dropAlign: _reactDesc.PropTypes.shape({
      top: _reactDesc.PropTypes.oneOf(VERTICAL_ALIGN_OPTIONS),
      bottom: _reactDesc.PropTypes.oneOf(VERTICAL_ALIGN_OPTIONS),
      left: _reactDesc.PropTypes.oneOf(HORIZONTAL_ALIGN_OPTIONS),
      right: _reactDesc.PropTypes.oneOf(HORIZONTAL_ALIGN_OPTIONS)
    }).description("Where to place the drop down. The keys correspond to a side of the drop down.\nThe values correspond to a side of the control. For instance,\n{left: 'left', top: 'bottom'} would align the left edges and the top of\nthe drop down to the bottom of the control. At most one of left or right and\none of top or bottom should be specified.").defaultValue({
      top: 'top',
      left: 'left'
    }),
    dropBackground: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.string, _reactDesc.PropTypes.shape({
      color: _reactDesc.PropTypes.string,
      opacity: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['weak', 'medium', 'strong']), _reactDesc.PropTypes.bool])
    })]).description('Background color when drop is active'),
    dropTarget: _reactDesc.PropTypes.object.description("Target where the drop will be aligned to. This should be\n      a React reference. Typically, this is not required as the drop will be\n      aligned to the Menu itself by default."),
    icon: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.bool, _reactDesc.PropTypes.node]).description('Indicates the icon shown as a control to open it.'),
    items: _reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.object).description("Menu items to be placed inside the drop down.\nThe object values can be any Button prop, for example: label and onClick.").isRequired,
    label: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.string, _reactDesc.PropTypes.node]).description('Indicates the label shown as a control to open it.'),
    messages: _reactDesc.PropTypes.shape({
      closeMenu: _reactDesc.PropTypes.string,
      openMenu: _reactDesc.PropTypes.string
    }).description('Custom messages. Used for accessibility by screen readers.').defaultValue({
      openMenu: 'Open Menu',
      closeMenu: 'Close Menu'
    }),
    size: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']), _reactDesc.PropTypes.string]).description('The size of the menu.').defaultValue('medium')
  });
  return DocumentedMenu;
};

exports.doc = doc;