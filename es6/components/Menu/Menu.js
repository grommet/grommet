var _excluded = ["a11yTitle", "aria-label", "children", "disabled", "dropAlign", "dropBackground", "dropProps", "dropTarget", "justifyContent", "icon", "items", "label", "messages", "onKeyDown", "open", "plain", "size"],
  _excluded2 = ["align"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React, { useRef, forwardRef, useCallback, useContext, useMemo, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Box } from '../Box';
import { Button } from '../Button';
import { DropButton } from '../DropButton';
import { Keyboard } from '../Keyboard';
import { Text } from '../Text';
import { normalizeColor } from '../../utils';
import { MessageContext } from '../../contexts/MessageContext';
import { MenuPropTypes } from './propTypes';
import { useThemeValue } from '../../utils/useThemeValue';
var ContainerBox = styled(Box).withConfig({
  displayName: "Menu__ContainerBox",
  componentId: "sc-17fcys9-0"
})(["max-height:inherit;@media screen and (-ms-high-contrast:active),(-ms-high-contrast:none){width:100%;}&:focus{outline:none;}", ";"], function (props) {
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

var defaultItems = [];
var Menu = /*#__PURE__*/forwardRef(function (props, ref) {
  var a11yTitle = props.a11yTitle,
    ariaLabel = props['aria-label'],
    children = props.children,
    disabled = props.disabled,
    dropAlign = props.dropAlign,
    dropBackground = props.dropBackground,
    dropProps = props.dropProps,
    dropTarget = props.dropTarget,
    _props$justifyContent = props.justifyContent,
    justifyContent = _props$justifyContent === void 0 ? 'start' : _props$justifyContent,
    icon = props.icon,
    _props$items = props.items,
    items = _props$items === void 0 ? defaultItems : _props$items,
    label = props.label,
    messages = props.messages,
    onKeyDown = props.onKeyDown,
    open = props.open,
    plain = props.plain,
    size = props.size,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var _useThemeValue = useThemeValue(),
    theme = _useThemeValue.theme,
    passThemeFlag = _useThemeValue.passThemeFlag;
  var _useContext = useContext(MessageContext),
    format = _useContext.format;
  var iconColor = normalizeColor(theme.menu.icons.color || 'control', theme);
  // need to destructure the align otherwise it will get passed through
  // to DropButton and override prop values
  var _theme$menu$drop = theme.menu.drop,
    themeDropAlign = _theme$menu$drop.align,
    themeDropProps = _objectWithoutPropertiesLoose(_theme$menu$drop, _excluded2);
  var a11y = ariaLabel || a11yTitle;

  // total number of menu items
  var itemCount = useMemo(function () {
    var count = 0;
    if (items && Array.isArray(items[0])) {
      items.forEach(function (group) {
        count += group.length;
      });
    } else count = items.length;
    return count;
  }, [items]);
  var align = dropProps && dropProps.align || dropAlign || themeDropAlign;
  var controlButtonIndex = useMemo(function () {
    if (align.top === 'top') return -1;
    if (align.bottom === 'bottom') return itemCount;
    return undefined;
  }, [align, itemCount]);

  // Keeps track of whether menu options should be mirrored
  // when there's not enough space below DropButton. This state
  // is modified on /Drop/DropContainer.js.
  var _useState = useState(),
    alignControlMirror = _useState[0],
    setAlignControlMirror = _useState[1];
  var initialAlignTop = alignControlMirror === align.top;
  var dropContainerRef = useRef();
  var buttonRefs = useRef([]);
  var constants = useMemo(function () {
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
  var _useState2 = useState(constants.none),
    activeItemIndex = _useState2[0],
    setActiveItemIndex = _useState2[1];
  var _useState3 = useState(open || false),
    isOpen = _useState3[0],
    setOpen = _useState3[1];
  var MenuIcon = isOpen && theme.menu.icons.up ? theme.menu.icons.up : theme.menu.icons.down;
  var onDropClose = useCallback(function () {
    setActiveItemIndex(constants.none);
    setOpen(false);
  }, [constants.none]);
  var onDropOpen = useCallback(function () {
    setOpen(true);
  }, []);
  useEffect(function () {
    // need to wait for Drop to be ready
    var timer = setTimeout(function () {
      if (isOpen) {
        var optionsNode = dropContainerRef.current;
        if (optionsNode) {
          optionsNode.focus();
        }
      }
    }, 100);
    return function () {
      return clearTimeout(timer);
    };
  }, [isOpen]);
  var onSelectMenuItem = function onSelectMenuItem(event) {
    if (isOpen) {
      if (activeItemIndex >= 0) {
        event.preventDefault();
        event.stopPropagation();
        buttonRefs.current[activeItemIndex].click();
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
    } else if (isTab(event) && (!constants.controlBottom && activeItemIndex === itemCount - 1 || constants.controlBottom && activeItemIndex === controlButtonIndex)) {
      // User has reached end of the menu, this tab will close
      // the menu drop because there are no more "next items" to access
      onDropClose();
    } else {
      var index;
      if (
      // This checks if the user has reached the end of the menu.
      // In the case the the menu control button is located at the
      // bottom of the menu, it checks if the user has reached the button.
      // Otherwise, it checks if the user is at the last menu item.
      constants.controlBottom && activeItemIndex === controlButtonIndex || !constants.controlBottom && activeItemIndex === itemCount - 1 || activeItemIndex === constants.none) {
        // place focus on the first menu item
        index = 0;
      } else {
        index = activeItemIndex + 1;
      }
      setActiveItemIndex(index);
      if (buttonRefs.current[index]) {
        buttonRefs.current[index].focus();
      }
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
      if (activeItemIndex === 'none') {
        index = itemCount - 1;
      } else if (activeItemIndex - 1 < 0) {
        if (constants.controlTop && activeItemIndex - 1 === controlButtonIndex) {
          index = itemCount;
        } else {
          index = itemCount - 1;
        }
      } else {
        index = activeItemIndex - 1;
      }
      setActiveItemIndex(index);
      if (buttonRefs.current[index]) {
        buttonRefs.current[index].focus();
      }
    }
  };
  var menuIcon = icon !== false ? icon !== true && icon || /*#__PURE__*/React.createElement(MenuIcon, {
    color: iconColor,
    size: size
  }) : null;
  var buttonProps = {
    plain: plain,
    size: size
  };
  var content;
  if (children) {
    content = children;
  } else if (!theme.button["default"]) {
    content = /*#__PURE__*/React.createElement(Box, {
      direction: "row",
      justify: justifyContent,
      align: "center",
      pad: "small",
      gap: label && icon !== false ? 'small' : undefined
    }, /*#__PURE__*/React.createElement(Text, {
      size: size
    }, label), menuIcon);
  } else {
    // when a theme has theme.button.default, keep content as
    // undefined so we can rely on Button label & icon props
    buttonProps = {
      icon: menuIcon,
      label: label,
      plain: plain,
      reverse: true,
      size: size
    };
    content = undefined;
  }
  var controlMirror = /*#__PURE__*/React.createElement(Box, {
    flex: false
  }, /*#__PURE__*/React.createElement(Button, _extends({
    ref: function ref(r) {
      // make it accessible at the end of all menu items
      buttonRefs.current[itemCount] = r;
    },
    a11yTitle: a11y || format({
      id: 'menu.closeMenu',
      messages: messages
    }),
    active: activeItemIndex === controlButtonIndex,
    focusIndicator: false,
    hoverIndicator: "background",
    onClick: onDropClose,
    onFocus: function onFocus() {
      return setActiveItemIndex(controlButtonIndex);
    }
    // On first tab into menu, the control button should not
    // be able to receive tab focus because the focus should
    // go to the first menu item instead.
    ,
    tabIndex: activeItemIndex === constants.none ? '-1' : undefined
  }, theme.menu.item, buttonProps), typeof content === 'function' ? function () {
    return content(_extends({}, props, {
      drop: true
    }));
  } : content));
  var menuItem = function menuItem(item, index) {
    var _theme$menu$item, _theme$menu$item2, _theme$menu$item3, _theme$menu$item4;
    // Determine whether the label is done as a child or
    // as an option Button kind property.
    var child = !theme.button.option ? /*#__PURE__*/React.createElement(Box, {
      align: ((_theme$menu$item = theme.menu.item) == null ? void 0 : _theme$menu$item.align) || 'start',
      pad: "small",
      direction: "row",
      gap: item.gap || ((_theme$menu$item2 = theme.menu.item) == null ? void 0 : _theme$menu$item2.gap),
      justify: item.justify || ((_theme$menu$item3 = theme.menu.item) == null ? void 0 : _theme$menu$item3.justify)
    }, item.reverse && item.label, item.icon, !item.reverse && item.label) : undefined;

    // if we have a child, turn on plain, and hoverIndicator
    return (
      /*#__PURE__*/
      // lint isn't flagging this but we shouldn't use index as a key
      // see no-array-index-key lint rule
      React.createElement(Box, {
        key: index,
        flex: false,
        role: "none"
      }, /*#__PURE__*/React.createElement(Button, _extends({
        ref: function ref(r) {
          buttonRefs.current[index] = r;
        },
        role: "menuitem",
        onFocus: function onFocus() {
          setActiveItemIndex(index);
        },
        active: activeItemIndex === index,
        focusIndicator: false,
        plain: !child ? undefined : true,
        align: "start",
        kind: !child ? 'option' : undefined,
        hoverIndicator: !child ? undefined : 'background'
      }, theme.menu.item, {
        justify: item.justify || ((_theme$menu$item4 = theme.menu.item) == null ? void 0 : _theme$menu$item4.justify)
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
  };
  var menuContent;
  var grouped = itemCount && Array.isArray(items[0]);
  if (grouped) {
    var index = 0;
    menuContent = items.map(function (group, groupIndex) {
      var _theme$menu$group, _theme$menu$group2, _theme$menu$group3;
      return /*#__PURE__*/React.createElement(Box
      // eslint-disable-next-line react/no-array-index-key
      , {
        key: groupIndex
        // ensure menu groups don't collapse if vertical space on screen
        // causes scrolling within the menu
        ,
        flex: false
      }, groupIndex > 0 && /*#__PURE__*/React.createElement(Box, {
        pad: theme.menu.group.separator.pad
      }, /*#__PURE__*/React.createElement(Box, {
        border: {
          side: 'top',
          color: (_theme$menu$group = theme.menu.group) == null || (_theme$menu$group = _theme$menu$group.separator) == null ? void 0 : _theme$menu$group.color,
          size: (_theme$menu$group2 = theme.menu.group) == null || (_theme$menu$group2 = _theme$menu$group2.separator) == null ? void 0 : _theme$menu$group2.size
        }
      })), /*#__PURE__*/React.createElement(Box, _extends({}, theme.menu.container, (_theme$menu$group3 = theme.menu.group) == null ? void 0 : _theme$menu$group3.container), group.map(function (item) {
        // item index needs to be its index in the entire menu as if
        // it were a flat array
        var currentIndex = index;
        index += 1;
        return menuItem(item, currentIndex);
      })));
    });
  } else menuContent = items.map(function (item, index) {
    return menuItem(item, index);
  });
  return /*#__PURE__*/React.createElement(Keyboard, {
    onDown: onDropOpen,
    onUp: onDropOpen,
    onSpace: onSelectMenuItem,
    onEsc: onDropClose,
    onTab: onDropClose,
    onKeyDown: onKeyDown
  }, /*#__PURE__*/React.createElement(DropButton, _extends({
    ref: ref
  }, rest, buttonProps, {
    a11yTitle: a11y || format({
      id: 'menu.openMenu',
      messages: messages
    }),
    "aria-haspopup": "menu",
    "aria-expanded": isOpen,
    onAlign: setAlignControlMirror,
    disabled: disabled,
    dropAlign: align,
    dropTarget: dropTarget,
    dropProps: dropProps || themeDropProps,
    open: isOpen,
    onOpen: onDropOpen,
    onClose: onDropClose,
    dropContent: /*#__PURE__*/React.createElement(Keyboard, {
      onTab: function onTab(event) {
        return event.shiftKey ? onPreviousMenuItem(event) : onNextMenuItem(event);
      },
      onDown: onNextMenuItem,
      onUp: onPreviousMenuItem,
      onEnter: onSelectMenuItem
    }, /*#__PURE__*/React.createElement(ContainerBox, _extends({
      ref: dropContainerRef,
      tabIndex: -1,
      background: dropBackground || theme.menu.background
    }, passThemeFlag), alignControlMirror === 'top' && align.bottom !== 'top' && align.top !== 'bottom' ? controlMirror : undefined, /*#__PURE__*/React.createElement(Box, _extends({
      overflow: "auto",
      role: "menu",
      a11yTitle: a11y
    }, !grouped ? theme.menu.container : {}), menuContent), !initialAlignTop &&
    // don't show controlMirror if caller is using
    // align.bottom === 'top'
    alignControlMirror === 'bottom' && align.bottom !== 'top' && align.top !== 'bottom' ? controlMirror : undefined))
  }), content));
});
Menu.displayName = 'Menu';
Menu.propTypes = MenuPropTypes;
export { Menu };