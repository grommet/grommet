"use strict";

exports.__esModule = true;
exports.Menu = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _PropTypes = _interopRequireDefault(require("react-desc/lib/PropTypes"));

var _defaultProps = require("../../default-props");

var _Box = require("../Box");

var _Button = require("../Button");

var _DropButton = require("../DropButton");

var _Keyboard = require("../Keyboard");

var _Text = require("../Text");

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var ContainerBox = (0, _styledComponents["default"])(_Box.Box).withConfig({
  displayName: "Menu__ContainerBox",
  componentId: "sc-17fcys9-0"
})(["max-height:inherit;@media screen and (-ms-high-contrast:active),(-ms-high-contrast:none){width:100%;}", ";"], function (props) {
  return props.theme.menu.extend;
});
/* Notes on keyboard interactivity (based on W3) // For details reference: https://www.w3.org/TR/wai-aria-practices/#menu

To open menu when menu button is focused:
- Space/Enter/Up arrow/Down arrow will open menu

To navigate within menu:
- Up/down arrow keys can be used and will loop through options
(keeping focus within the Menu)
- Tab can be used, but once the last menu item is reached, Tab will close the
Menu and continue through page content.

To close the menu:
- Tabbing beyond the first or last menu item.
- Esc will close the menu
- Select a menu item

To make a selection:
- Enter key is pressed.
- Space is pressed.
*/

var Menu = /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
  var a11yTitle = props.a11yTitle,
      children = props.children,
      disabled = props.disabled,
      dropAlign = props.dropAlign,
      dropBackground = props.dropBackground,
      dropProps = props.dropProps,
      dropTarget = props.dropTarget,
      justifyContent = props.justifyContent,
      icon = props.icon,
      items = props.items,
      label = props.label,
      messages = props.messages,
      onKeyDown = props.onKeyDown,
      open = props.open,
      plain = props.plain,
      size = props.size,
      rest = _objectWithoutPropertiesLoose(props, ["a11yTitle", "children", "disabled", "dropAlign", "dropBackground", "dropProps", "dropTarget", "justifyContent", "icon", "items", "label", "messages", "onKeyDown", "open", "plain", "size"]);

  var theme = (0, _react.useContext)(_styledComponents.ThemeContext) || _defaultProps.defaultProps.theme;

  var iconColor = (0, _utils.normalizeColor)(theme.menu.icons.color || 'control', theme);
  var align = dropProps.align || dropAlign;
  var controlButtonIndex = (0, _react.useMemo)(function () {
    if (align.top === 'top') return -1;
    if (align.bottom === 'bottom') return items.length;
    return undefined;
  }, [align, items]);
  var buttonRefs = {};
  var constants = (0, _react.useMemo)(function () {
    return {
      none: 'none',
      tab: 9,
      // Menu control button included on top of menu items
      controlTop: align.top === 'top' || undefined,
      // Menu control button included on the bottom of menu items
      controlBottom: align.bottom === 'bottom' || undefined,
      controlButtonIndex: controlButtonIndex
    };
  }, [align, controlButtonIndex]);

  var _useState = (0, _react.useState)(constants.none),
      activeItemIndex = _useState[0],
      setActiveItemIndex = _useState[1];

  var _useState2 = (0, _react.useState)(open || false),
      isOpen = _useState2[0],
      setOpen = _useState2[1];

  var MenuIcon = isOpen && theme.menu.icons.up ? theme.menu.icons.up : theme.menu.icons.down;
  var onDropClose = (0, _react.useCallback)(function () {
    setActiveItemIndex(constants.none);
    setOpen(false);
  }, [constants.none]);
  var onDropOpen = (0, _react.useCallback)(function () {
    setOpen(true);
  }, []);

  var onSelectMenuItem = function onSelectMenuItem(event) {
    if (isOpen) {
      if (activeItemIndex >= 0) {
        event.preventDefault();
        event.stopPropagation();
        buttonRefs[activeItemIndex].click();
      }
    } else {
      onDropOpen();
    }
  };

  var isTab = function isTab(event) {
    return event.keyCode === constants.tab || event.which === constants.tab;
  };

  var onNextMenuItem = function onNextMenuItem(event) {
    event.preventDefault();

    if (!isOpen) {
      onDropOpen();
    } else if (isTab(event) && (!constants.controlBottom && activeItemIndex === items.length - 1 || constants.controlBottom && activeItemIndex === controlButtonIndex)) {
      // User has reached end of the menu, this tab will close
      // the menu drop because there are no more "next items" to access
      onDropClose();
    } else {
      var index;

      if ( // This checks if the user has reached the end of the menu.
      // In the case the the menu control button is located at the
      // bottom of the menu, it checks if the user has reached the button.
      // Otherwise, it checks if the user is at the last menu item.
      constants.controlBottom && activeItemIndex === controlButtonIndex || !constants.controlBottom && activeItemIndex === items.length - 1 || activeItemIndex === constants.none) {
        // place focus on the first menu item
        index = 0;
      } else {
        index = activeItemIndex + 1;
      }

      setActiveItemIndex(index);
      buttonRefs[index].focus();
    }
  };

  var onPreviousMenuItem = function onPreviousMenuItem(event) {
    event.preventDefault();

    if (!isOpen) {
      onDropOpen();
    } else if (isTab(event) && (constants.controlTop && activeItemIndex === controlButtonIndex || !constants.controlTop && activeItemIndex - 1 < 0)) {
      // User has reached beginning of the menu, this tab will close
      // the menu drop because there are no more "previous items" to access
      onDropClose();
    } else {
      var index;

      if (activeItemIndex - 1 < 0) {
        if (constants.controlTop && activeItemIndex - 1 === controlButtonIndex) {
          index = items.length;
        } else {
          index = items.length - 1;
        }
      } else {
        index = activeItemIndex - 1;
      }

      setActiveItemIndex(index);
      buttonRefs[index].focus();
    }
  };

  var content = children || /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    direction: "row",
    justify: justifyContent,
    align: "center",
    pad: theme.button["default"] ? undefined : 'small',
    gap: label && icon !== false ? 'small' : undefined
  }, /*#__PURE__*/_react["default"].createElement(_Text.Text, {
    size: size
  }, label), icon !== false ? icon !== true && icon || /*#__PURE__*/_react["default"].createElement(MenuIcon, {
    color: iconColor,
    size: size
  }) : null);

  var controlMirror = /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    flex: false
  }, /*#__PURE__*/_react["default"].createElement(_Button.Button, {
    ref: function ref(r) {
      // make it accessible at the end of all menu items
      buttonRefs[items.length] = r;
    },
    a11yTitle: a11yTitle || messages.closeMenu || 'Close Menu',
    active: activeItemIndex === controlButtonIndex,
    focusIndicator: false,
    hoverIndicator: "background",
    plain: plain,
    onClick: onDropClose,
    onFocus: function onFocus() {
      return setActiveItemIndex(controlButtonIndex);
    } // On first tab into menu, the control button should not
    // be able to receive tab focus because the focus should
    // go to the first menu item instead.
    ,
    tabIndex: activeItemIndex === constants.none ? '-1' : undefined
  }, typeof content === 'function' ? function () {
    return content(_extends({}, props, {
      drop: true
    }));
  } : content));

  return /*#__PURE__*/_react["default"].createElement(_Keyboard.Keyboard, {
    onDown: onNextMenuItem,
    onUp: onPreviousMenuItem,
    onEnter: onSelectMenuItem,
    onSpace: onSelectMenuItem,
    onEsc: onDropClose,
    onTab: onDropClose,
    onKeyDown: onKeyDown
  }, /*#__PURE__*/_react["default"].createElement(_DropButton.DropButton, _extends({
    ref: ref
  }, rest, {
    a11yTitle: a11yTitle || messages.openMenu || 'Open Menu',
    disabled: disabled,
    dropAlign: align,
    dropTarget: dropTarget,
    dropProps: dropProps,
    plain: plain,
    open: isOpen,
    onOpen: onDropOpen,
    onClose: onDropClose,
    dropContent: /*#__PURE__*/_react["default"].createElement(_Keyboard.Keyboard, {
      onTab: function onTab(event) {
        return event.shiftKey ? onPreviousMenuItem(event) : onNextMenuItem(event);
      },
      onEnter: onSelectMenuItem
    }, /*#__PURE__*/_react["default"].createElement(ContainerBox, {
      background: dropBackground || theme.menu.background
    }, align.top === 'top' ? controlMirror : undefined, /*#__PURE__*/_react["default"].createElement(_Box.Box, {
      overflow: "auto"
    }, items.map(function (item, index) {
      // Determine whether the label is done as a child or
      // as an option Button kind property.
      var child = !theme.button.option ? /*#__PURE__*/_react["default"].createElement(_Box.Box, {
        align: "start",
        pad: "small",
        direction: "row",
        gap: item.gap
      }, item.reverse && item.label, item.icon, !item.reverse && item.label) : undefined; // if we have a child, turn on plain, and hoverIndicator

      return (
        /*#__PURE__*/
        // eslint-disable-next-line react/no-array-index-key
        _react["default"].createElement(_Box.Box, {
          key: index,
          flex: false
        }, /*#__PURE__*/_react["default"].createElement(_Button.Button, _extends({
          ref: function ref(r) {
            buttonRefs[index] = r;
          },
          onFocus: function onFocus() {
            return setActiveItemIndex(index);
          },
          active: activeItemIndex === index,
          focusIndicator: false,
          plain: !child ? undefined : true,
          align: "start",
          kind: !child ? 'option' : undefined,
          hoverIndicator: !child ? undefined : 'background'
        }, !child ? item : _extends({}, item, {
          gap: undefined,
          icon: undefined,
          label: undefined,
          reverse: undefined
        }), {
          onClick: function onClick() {
            if (item.onClick) {
              item.onClick.apply(item, arguments);
            }

            if (item.close !== false) {
              onDropClose();
            }
          }
        }), child))
      );
    })), align.bottom === 'bottom' ? controlMirror : undefined))
  }), content));
});
Menu.propTypes = {
  dropAlign: _PropTypes["default"].shape({
    top: _PropTypes["default"].string,
    left: _PropTypes["default"].string
  }),
  dropProps: _PropTypes["default"].shape({}),
  items: _PropTypes["default"].arrayOf({}),
  messages: _PropTypes["default"].shape({
    openMenu: _PropTypes["default"].string,
    closeMenu: _PropTypes["default"].string
  }),
  justifyContent: _PropTypes["default"].string
};
Menu.defaultProps = {
  dropAlign: {
    top: 'top',
    left: 'left'
  },
  dropProps: {},
  items: [],
  messages: {
    openMenu: 'Open Menu',
    closeMenu: 'Close Menu'
  },
  justifyContent: 'start'
};
Menu.displayName = 'Menu';
var MenuDoc;

if (process.env.NODE_ENV !== 'production') {
  MenuDoc = require('./doc').doc(Menu); // eslint-disable-line global-require
}

var MenuWrapper = MenuDoc || Menu;
exports.Menu = MenuWrapper;