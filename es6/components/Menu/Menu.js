function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useState, useEffect } from 'react';
import { compose } from 'recompose';
import styled, { withTheme } from 'styled-components';
import PropTypes from 'react-desc/lib/PropTypes';
import { defaultProps } from '../../default-props';
import { Box } from '../Box';
import { Button } from '../Button';
import { DropButton } from '../DropButton';
import { Keyboard } from '../Keyboard';
import { Text } from '../Text';
import { withForwardRef } from '../hocs';
import { normalizeColor } from '../../utils';
var ContainerBox = styled(Box).withConfig({
  displayName: "Menu__ContainerBox",
  componentId: "sc-17fcys9-0"
})(["max-height:inherit;@media screen and (-ms-high-contrast:active),(-ms-high-contrast:none){width:100%;}", ";"], function (props) {
  return props.theme.menu.extend;
});
/* Notes on keyboard interactivity (based on W3C) // For details reference: https://www.w3.org/TR/wai-aria-practices/#menu

To open menu when menu button is focused:
- Space/Enter/Up arrow/Down arrow will open menu

To navigate within menu:
- Up/down arrow keys can be used and will loop through options (keeping focus within the Menu)
- Tab can be used, but once the last menu item is reached, Tab will close the Menu and continue through page content.

To close the menu:
- Tabbing beyond the first or last menu item.
- Esc will close the menu
- Select a menu item

To make a selection:
- Enter key is pressed.
- Space is pressed.
*/

var Menu = function Menu(props) {
  var children = props.children,
      disabled = props.disabled,
      dropAlign = props.dropAlign,
      dropBackground = props.dropBackground,
      dropProps = props.dropProps,
      dropTarget = props.dropTarget,
      forwardRef = props.forwardRef,
      justifyContent = props.justifyContent,
      icon = props.icon,
      items = props.items,
      label = props.label,
      messages = props.messages,
      onKeyDown = props.onKeyDown,
      open = props.open,
      plain = props.plain,
      size = props.size,
      theme = props.theme,
      rest = _objectWithoutPropertiesLoose(props, ["children", "disabled", "dropAlign", "dropBackground", "dropProps", "dropTarget", "forwardRef", "justifyContent", "icon", "items", "label", "messages", "onKeyDown", "open", "plain", "size", "theme"]);

  var MenuIcon = theme.menu.icons.down;
  var iconColor = normalizeColor('control', theme);
  var align = dropProps.align || dropAlign;
  var buttonRefs = {};
  var timeoutID; // to track if focus is within the menu items, see menuOnFocus/menuOnBlur

  var _useState = useState(-1),
      activeItemIndex = _useState[0],
      setActiveItemIndex = _useState[1];

  var _useState2 = useState(open || false),
      isOpen = _useState2[0],
      setOpen = _useState2[1];

  var _useState3 = useState(false),
      isManagingFocus = _useState3[0],
      setManagingFocus = _useState3[1];

  useEffect(function () {
    if (isOpen) {
      setManagingFocus(true);

      if (isManagingFocus) {
        if (align.top === 'bottom') {
          buttonRefs[0].focus();
          setActiveItemIndex(0);
        } else {
          buttonRefs[items.length].focus();
          setActiveItemIndex(-1);
        }
      }
    }
  }, [isManagingFocus]);

  var onDropClose = function onDropClose() {
    setActiveItemIndex(-1);
    setOpen(false);
    setManagingFocus(false);
  };

  var onDropOpen = function onDropOpen() {
    setOpen(true);
    setManagingFocus(true);
  };

  var onSelectMenuItem = function onSelectMenuItem(event) {
    if (activeItemIndex >= 0) {
      event.preventDefault();
      event.stopPropagation();
      buttonRefs[activeItemIndex].click();
    }
  };

  var onNextMenuItem = function onNextMenuItem(event) {
    event.preventDefault();

    if (!isOpen) {
      onDropOpen();
    } else {
      var index;

      if (activeItemIndex + 1 === items.length) {
        index = align.top === 'bottom' ? 0 : items.length;
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
    } else {
      var index;

      if (activeItemIndex - 1 < 0) {
        if (align.top === 'top' && activeItemIndex - 1 === -1) {
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

  var menuOnBlur = function menuOnBlur(event) {
    event.preventDefault();
    timeoutID = setTimeout(function () {
      if (isManagingFocus) {
        onDropClose();
      }
    }, 0);
  };

  var menuOnFocus = function menuOnFocus(event) {
    event.preventDefault();
    clearTimeout(timeoutID);

    if (!isManagingFocus) {
      onDropOpen();
    }
  };

  var content = children || React.createElement(Box, {
    direction: "row",
    justify: justifyContent,
    align: "center",
    pad: "small",
    gap: label && icon !== false ? 'small' : undefined
  }, React.createElement(Text, {
    size: size
  }, label), icon !== false ? icon !== true && icon || React.createElement(MenuIcon, {
    color: iconColor,
    size: size
  }) : null);
  var controlMirror = React.createElement(Box, {
    flex: false
  }, React.createElement(Button, {
    ref: function ref(r) {
      buttonRefs[items.length] = r; // make it accessible at the end of all menu items
    },
    a11yTitle: messages.closeMenu || 'Close Menu',
    active: activeItemIndex === -1,
    focusIndicator: false,
    plain: plain,
    onClick: onDropClose,
    onFocus: function onFocus() {
      return setActiveItemIndex(-1);
    }
  }, typeof content === 'function' ? function () {
    return content(_extends({}, props, {
      drop: true
    }));
  } : content));
  return React.createElement(Keyboard, {
    onDown: onNextMenuItem,
    onUp: onPreviousMenuItem,
    onEnter: onSelectMenuItem,
    onSpace: onSelectMenuItem,
    onEsc: onDropClose,
    onTab: onDropClose,
    onKeyDown: onKeyDown
  }, React.createElement(DropButton, _extends({
    ref: forwardRef
  }, rest, {
    a11yTitle: messages.openMenu || 'Open Menu',
    disabled: disabled,
    dropAlign: align,
    dropTarget: dropTarget,
    plain: plain,
    open: isOpen,
    onOpen: onDropOpen,
    onClose: onDropClose,
    dropContent: React.createElement(Keyboard, {
      onDown: onNextMenuItem,
      onUp: onPreviousMenuItem
    }, React.createElement(ContainerBox, {
      background: dropBackground || theme.menu.background,
      onFocus: menuOnFocus,
      onBlur: menuOnBlur
    }, align.top === 'top' ? controlMirror : undefined, React.createElement(Box, {
      overflow: "auto"
    }, items.map(function (item, index) {
      return (// eslint-disable-next-line react/no-array-index-key
        React.createElement(Box, {
          key: index,
          flex: false
        }, React.createElement(Button, _extends({
          ref: function ref(r) {
            buttonRefs[index] = r;
          },
          onFocus: function onFocus() {
            return setActiveItemIndex(index);
          },
          active: activeItemIndex === index,
          hoverIndicator: "background",
          focusIndicator: false
        }, _extends({}, item, {
          icon: undefined,
          label: undefined
        }), {
          onClick: function onClick() {
            if (item.onClick) {
              item.onClick.apply(item, arguments);
            }

            if (item.close !== false) {
              onDropClose();
            }
          }
        }), React.createElement(Box, {
          align: "start",
          pad: "small",
          direction: "row"
        }, item.icon, item.label)))
      );
    })), align.bottom === 'bottom' ? controlMirror : undefined))
  }), content));
};

Menu.propTypes = {
  dropAlign: PropTypes.shape({
    top: PropTypes.string,
    left: PropTypes.string
  }),
  dropProps: PropTypes.shape({}),
  items: PropTypes.arrayOf({}),
  messages: PropTypes.shape({
    openMenu: PropTypes.string,
    closeMenu: PropTypes.string
  }),
  justifyContent: PropTypes.string
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
Object.setPrototypeOf(Menu.defaultProps, defaultProps);
var MenuDoc;

if (process.env.NODE_ENV !== 'production') {
  MenuDoc = require('./doc').doc(Menu); // eslint-disable-line global-require
}

var MenuWrapper = compose(withTheme, withForwardRef)(MenuDoc || Menu);
export { MenuWrapper as Menu };