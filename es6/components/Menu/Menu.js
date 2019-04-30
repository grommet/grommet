function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { compose } from 'recompose';
import styled, { withTheme } from 'styled-components';
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

var Menu =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Menu, _Component);

  function Menu(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "buttonRefs", {});

    _defineProperty(_assertThisInitialized(_this), "onDropClose", function () {
      _this.setState({
        activeItemIndex: -1,
        open: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onSelectMenuItem", function (event) {
      var activeItemIndex = _this.state.activeItemIndex;

      if (activeItemIndex >= 0) {
        event.preventDefault();
        event.stopPropagation();

        _this.buttonRefs[activeItemIndex].click();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onNextMenuItem", function (event) {
      event.preventDefault();
      var _this$state = _this.state,
          activeItemIndex = _this$state.activeItemIndex,
          open = _this$state.open;

      if (!open) {
        _this.setState({
          open: true,
          activeItemIndex: -1
        });
      } else {
        var items = _this.props.items;
        var index = Math.min(activeItemIndex + 1, items.length - 1);

        _this.setState({
          activeItemIndex: index
        }); // this.setState({ activeSuggestionIndex: index },
        //   this._announceSuggestion.bind(this, index));

      }
    });

    _defineProperty(_assertThisInitialized(_this), "onPreviousMenuItem", function (event) {
      event.preventDefault();
      var _this$state2 = _this.state,
          activeItemIndex = _this$state2.activeItemIndex,
          open = _this$state2.open;

      if (!open) {
        _this.setState({
          open: true,
          activeItemIndex: -1
        });
      } else {
        var items = _this.props.items;
        var index = activeItemIndex === -1 ? items.length - 1 : Math.max(activeItemIndex - 1, 0);

        _this.setState({
          activeItemIndex: index
        }); // this.setState({ activeSuggestionIndex: index },
        //   this._announceSuggestion.bind(this, index));

      }
    });

    _this.state = {
      activeItemIndex: -1,
      open: props.open || false
    };
    return _this;
  }

  var _proto = Menu.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var _this$props = this.props,
        children = _this$props.children,
        disabled = _this$props.disabled,
        dropAlign = _this$props.dropAlign,
        dropBackground = _this$props.dropBackground,
        dropProps = _this$props.dropProps,
        dropTarget = _this$props.dropTarget,
        forwardRef = _this$props.forwardRef,
        justifyContent = _this$props.justifyContent,
        icon = _this$props.icon,
        items = _this$props.items,
        label = _this$props.label,
        messages = _this$props.messages,
        onKeyDown = _this$props.onKeyDown,
        plain = _this$props.plain,
        size = _this$props.size,
        theme = _this$props.theme,
        rest = _objectWithoutPropertiesLoose(_this$props, ["children", "disabled", "dropAlign", "dropBackground", "dropProps", "dropTarget", "forwardRef", "justifyContent", "icon", "items", "label", "messages", "onKeyDown", "plain", "size", "theme"]);

    var _this$state3 = this.state,
        activeItemIndex = _this$state3.activeItemIndex,
        open = _this$state3.open;
    var MenuIcon = theme.menu.icons.down;
    var iconColor = normalizeColor('control', theme);
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
      a11yTitle: messages.closeMenu || 'Close Menu',
      plain: plain,
      onClick: this.onDropClose
    }, typeof content === 'function' ? function (props) {
      return content(_extends({}, props, {
        drop: true
      }));
    } : content));
    var align = dropProps.align || dropAlign;
    return React.createElement(Keyboard, {
      onEnter: this.onSelectMenuItem,
      onSpace: this.onSelectMenuItem,
      onDown: this.onNextMenuItem,
      onUp: this.onPreviousMenuItem,
      onEsc: this.onDropClose,
      onTab: this.onDropClose,
      onKeyDown: onKeyDown
    }, React.createElement(DropButton, _extends({
      ref: forwardRef
    }, rest, {
      a11yTitle: messages.openMenu || 'Open Menu',
      disabled: disabled,
      dropAlign: align,
      dropTarget: dropTarget,
      plain: plain,
      open: open,
      onOpen: function onOpen() {
        return _this2.setState({
          open: true
        });
      },
      onClose: function onClose() {
        return _this2.setState({
          open: false
        });
      },
      dropContent: React.createElement(ContainerBox, {
        background: dropBackground || theme.menu.background
      }, align.top === 'top' ? controlMirror : undefined, React.createElement(Box, {
        overflow: "auto"
      }, items.map(function (item, index) {
        return (// eslint-disable-next-line react/no-array-index-key
          React.createElement(Box, {
            key: index,
            flex: false
          }, React.createElement(Button, {
            ref: function ref(_ref) {
              _this2.buttonRefs[index] = _ref;
            },
            active: activeItemIndex === index,
            hoverIndicator: "background",
            disabled: item.disabled,
            onClick: function onClick() {
              item.onClick.apply(item, arguments);

              if (item.close !== false) {
                _this2.onDropClose();
              }
            },
            href: item.href
          }, React.createElement(Box, {
            align: "start",
            pad: "small",
            direction: "row"
          }, item.icon, item.label)))
        );
      })), align.bottom === 'bottom' ? controlMirror : undefined)
    }), content));
  };

  return Menu;
}(Component);

_defineProperty(Menu, "defaultProps", {
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
});

Object.setPrototypeOf(Menu.defaultProps, defaultProps);
var MenuDoc;

if (process.env.NODE_ENV !== 'production') {
  MenuDoc = require('./doc').doc(Menu); // eslint-disable-line global-require
}

var MenuWrapper = compose(withTheme, withForwardRef)(MenuDoc || Menu);
export { MenuWrapper as Menu };