"use strict";

exports.__esModule = true;
exports.Menu = void 0;

var _react = _interopRequireWildcard(require("react"));

var _recompose = require("recompose");

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _PropTypes = _interopRequireDefault(require("react-desc/lib/PropTypes"));

var _defaultProps = require("../../default-props");

var _Box = require("../Box");

var _Button = require("../Button");

var _DropButton = require("../DropButton");

var _Keyboard = require("../Keyboard");

var _Text = require("../Text");

var _hocs = require("../hocs");

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var ContainerBox = (0, _styledComponents["default"])(_Box.Box).withConfig({
  displayName: "Menu__ContainerBox",
  componentId: "sc-17fcys9-0"
})(["max-height:inherit;@media screen and (-ms-high-contrast:active),(-ms-high-contrast:none){width:100%;}", ";"], function (props) {
  return props.theme.menu.extend;
});
/* Notes on keyboard interactivity (based on W3C) // For details reference: https://www.w3.org/TR/wai-aria-practices/#menu

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
  var iconColor = (0, _utils.normalizeColor)('control', theme);
  var align = dropProps.align || dropAlign;
  var buttonRefs = {}; // to track if focus is within the menu items, see menuOnFocus/menuOnBlur

  var timeoutID;

  var _useState = (0, _react.useState)(-1),
      activeItemIndex = _useState[0],
      setActiveItemIndex = _useState[1];

  var _useState2 = (0, _react.useState)(open || false),
      isOpen = _useState2[0],
      setOpen = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      isManagingFocus = _useState3[0],
      setManagingFocus = _useState3[1];

  (0, _react.useEffect)(function () {
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

  var content = children || _react["default"].createElement(_Box.Box, {
    direction: "row",
    justify: justifyContent,
    align: "center",
    pad: "small",
    gap: label && icon !== false ? 'small' : undefined
  }, _react["default"].createElement(_Text.Text, {
    size: size
  }, label), icon !== false ? icon !== true && icon || _react["default"].createElement(MenuIcon, {
    color: iconColor,
    size: size
  }) : null);

  var controlMirror = _react["default"].createElement(_Box.Box, {
    flex: false
  }, _react["default"].createElement(_Button.Button, {
    ref: function ref(r) {
      // make it accessible at the end of all menu items
      buttonRefs[items.length] = r;
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

  return _react["default"].createElement(_Keyboard.Keyboard, {
    onDown: onNextMenuItem,
    onUp: onPreviousMenuItem,
    onEnter: onSelectMenuItem,
    onSpace: onSelectMenuItem,
    onEsc: onDropClose,
    onTab: onDropClose,
    onKeyDown: onKeyDown
  }, _react["default"].createElement(_DropButton.DropButton, _extends({
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
    dropContent: _react["default"].createElement(_Keyboard.Keyboard, {
      onDown: onNextMenuItem,
      onUp: onPreviousMenuItem
    }, _react["default"].createElement(ContainerBox, {
      background: dropBackground || theme.menu.background,
      onFocus: menuOnFocus,
      onBlur: menuOnBlur
    }, align.top === 'top' ? controlMirror : undefined, _react["default"].createElement(_Box.Box, {
      overflow: "auto"
    }, items.map(function (item, index) {
      return (// eslint-disable-next-line react/no-array-index-key
        _react["default"].createElement(_Box.Box, {
          key: index,
          flex: false
        }, _react["default"].createElement(_Button.Button, _extends({
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
        }), _react["default"].createElement(_Box.Box, {
          align: "start",
          pad: "small",
          direction: "row"
        }, item.icon, item.label)))
      );
    })), align.bottom === 'bottom' ? controlMirror : undefined))
  }), content));
};

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
Object.setPrototypeOf(Menu.defaultProps, _defaultProps.defaultProps);
var MenuDoc;

if (process.env.NODE_ENV !== 'production') {
  MenuDoc = require('./doc').doc(Menu); // eslint-disable-line global-require
}

var MenuWrapper = (0, _recompose.compose)(_styledComponents.withTheme, _hocs.withForwardRef)(MenuDoc || Menu);
exports.Menu = MenuWrapper;