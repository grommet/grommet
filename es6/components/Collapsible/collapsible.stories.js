function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { FormDown } from "grommet-icons/es6/icons/FormDown";
import { FormNext } from "grommet-icons/es6/icons/FormNext";
import { Notification } from "grommet-icons/es6/icons/Notification";
import { Box, Button, Collapsible, Heading, Grommet, Text } from 'grommet';
import { grommet } from 'grommet/themes';

var SimpleCollapsible =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(SimpleCollapsible, _Component);

  function SimpleCollapsible() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      open: false
    });

    return _this;
  }

  var _proto = SimpleCollapsible.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var open = this.state.open;
    return React.createElement(Grommet, {
      theme: grommet
    }, React.createElement(Box, {
      align: "start",
      gap: "small"
    }, React.createElement(Button, {
      primary: true,
      onClick: function onClick() {
        return _this2.setState({
          open: !open
        });
      },
      label: "Toggle"
    }), React.createElement(Collapsible, _extends({
      open: open
    }, this.props), React.createElement(Box, {
      background: "light-2",
      round: "medium",
      pad: "medium",
      align: "center",
      justify: "center"
    }, React.createElement(Text, null, "This is a box inside a Collapsible component"))), React.createElement(Text, null, "This is other content outside the Collapsible box")));
  };

  return SimpleCollapsible;
}(Component);

var MenuButton = function MenuButton(_ref) {
  var label = _ref.label,
      open = _ref.open,
      submenu = _ref.submenu,
      rest = _objectWithoutPropertiesLoose(_ref, ["label", "open", "submenu"]);

  var Icon = open ? FormDown : FormNext;
  return React.createElement(Button, _extends({
    hoverIndicator: "background"
  }, rest), React.createElement(Box, {
    margin: submenu ? {
      left: 'small'
    } : undefined,
    direction: "row",
    align: "center",
    pad: "xsmall"
  }, React.createElement(Icon, {
    color: "brand"
  }), React.createElement(Text, {
    size: "small"
  }, label)));
};

var NestedCollapsible =
/*#__PURE__*/
function (_Component2) {
  _inheritsLoose(NestedCollapsible, _Component2);

  function NestedCollapsible() {
    var _this3;

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this3 = _Component2.call.apply(_Component2, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this3), "state", {
      openMenu1: false,
      openSubmenu1: false,
      openMenu2: false
    });

    return _this3;
  }

  var _proto2 = NestedCollapsible.prototype;

  _proto2.render = function render() {
    var _this4 = this;

    var _this$state = this.state,
        openMenu1 = _this$state.openMenu1,
        openSubmenu1 = _this$state.openSubmenu1,
        openMenu2 = _this$state.openMenu2;
    return React.createElement(Grommet, {
      theme: grommet
    }, React.createElement(Box, {
      width: "small"
    }, React.createElement(MenuButton, {
      open: openMenu1,
      label: "Accordion",
      onClick: function onClick() {
        var newOpenMenu1 = !openMenu1;

        _this4.setState({
          openMenu1: newOpenMenu1,
          openSubmenu1: !newOpenMenu1 ? false : openSubmenu1
        });
      }
    }), React.createElement(Collapsible, {
      open: openMenu1
    }, React.createElement(MenuButton, {
      submenu: true,
      open: openSubmenu1,
      label: "Accordion Basics",
      onClick: function onClick() {
        return _this4.setState({
          openSubmenu1: !openSubmenu1
        });
      }
    }), React.createElement(Collapsible, {
      open: openSubmenu1
    }, React.createElement(Button, {
      hoverIndicator: "background",
      onClick: function onClick() {
        return alert('Submenu item 1 selected');
      }
    }, React.createElement(Box, {
      margin: {
        left: 'medium'
      },
      direction: "row",
      align: "center",
      pad: "xsmall"
    }, React.createElement(Text, {
      size: "small"
    }, "Submenu item 1"))), React.createElement(Button, {
      hoverIndicator: "background",
      onClick: function onClick() {
        return alert('Submenu item 2 selected');
      }
    }, React.createElement(Box, {
      margin: {
        left: 'medium'
      },
      direction: "row",
      align: "center",
      pad: "xsmall"
    }, React.createElement(Text, {
      size: "small"
    }, "Submenu item 2"))))), React.createElement(MenuButton, {
      open: openMenu2,
      label: "Button",
      onClick: function onClick() {
        return _this4.setState({
          openMenu2: !openMenu2
        });
      }
    }), React.createElement(Collapsible, {
      open: openMenu2
    }, React.createElement(Button, {
      hoverIndicator: "background",
      onClick: function onClick() {
        return alert('Submenu item 1 selected');
      }
    }, React.createElement(Box, {
      margin: {
        left: 'medium'
      },
      direction: "row",
      align: "center",
      pad: "xsmall"
    }, React.createElement(Text, {
      size: "small"
    }, "Submenu item 1"))))));
  };

  return NestedCollapsible;
}(Component);

var HorizontalCollapsible =
/*#__PURE__*/
function (_Component3) {
  _inheritsLoose(HorizontalCollapsible, _Component3);

  function HorizontalCollapsible() {
    var _this5;

    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    _this5 = _Component3.call.apply(_Component3, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this5), "state", {
      openNotification: false
    });

    return _this5;
  }

  var _proto3 = HorizontalCollapsible.prototype;

  _proto3.render = function render() {
    var _this6 = this;

    var openNotification = this.state.openNotification;
    return React.createElement(Grommet, {
      full: true,
      theme: grommet
    }, React.createElement(Box, {
      fill: true
    }, React.createElement(Box, {
      as: "header",
      direction: "row",
      align: "center",
      pad: {
        vertical: 'small',
        horizontal: 'medium'
      },
      justify: "between",
      background: "neutral-3",
      elevation: "large",
      style: {
        zIndex: '1000'
      }
    }, React.createElement(Heading, {
      level: 3,
      margin: "none",
      color: "white"
    }, React.createElement("strong", null, "My App")), React.createElement(Button, {
      onClick: function onClick() {
        return _this6.setState({
          openNotification: !openNotification
        });
      },
      icon: React.createElement(Notification, {
        color: "white"
      })
    })), React.createElement(Box, {
      flex: true,
      direction: "row"
    }, React.createElement(Box, {
      flex: true,
      align: "center",
      justify: "center"
    }, "Dashboard content goes here, click on the notification icon"), React.createElement(Collapsible, {
      direction: "horizontal",
      open: openNotification
    }, React.createElement(Box, {
      flex: true,
      width: "medium",
      background: "light-2",
      pad: "small",
      elevation: "small"
    }, React.createElement(Text, {
      size: "xlarge"
    }, "Sidebar"))))));
  };

  return HorizontalCollapsible;
}(Component);

storiesOf('Collapsible', module).add('Default', function () {
  return React.createElement(SimpleCollapsible, null);
}).add('Nested', function () {
  return React.createElement(NestedCollapsible, null);
}).add('Horizontal', function () {
  return React.createElement(HorizontalCollapsible, null);
});