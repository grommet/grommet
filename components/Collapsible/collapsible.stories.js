"use strict";

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _grommetIcons = require("grommet-icons");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
    return _react.default.createElement(_grommet.Grommet, {
      theme: _themes.grommet
    }, _react.default.createElement(_grommet.Box, {
      align: "start",
      gap: "small"
    }, _react.default.createElement(_grommet.Button, {
      primary: true,
      onClick: function onClick() {
        return _this2.setState({
          open: !open
        });
      },
      label: "Toggle"
    }), _react.default.createElement(_grommet.Collapsible, _extends({
      open: open
    }, this.props), _react.default.createElement(_grommet.Box, {
      background: "light-2",
      round: "medium",
      pad: "medium",
      align: "center",
      justify: "center"
    }, _react.default.createElement(_grommet.Text, null, "This is a box inside a Collapsible component"))), _react.default.createElement(_grommet.Text, null, "This is other content outside the Collapsible box")));
  };

  return SimpleCollapsible;
}(_react.Component);

var MenuButton = function MenuButton(_ref) {
  var label = _ref.label,
      open = _ref.open,
      submenu = _ref.submenu,
      rest = _objectWithoutPropertiesLoose(_ref, ["label", "open", "submenu"]);

  var Icon = open ? _grommetIcons.FormDown : _grommetIcons.FormNext;
  return _react.default.createElement(_grommet.Button, _extends({
    hoverIndicator: "background"
  }, rest), _react.default.createElement(_grommet.Box, {
    margin: submenu ? {
      left: 'small'
    } : undefined,
    direction: "row",
    align: "center",
    pad: "xsmall"
  }, _react.default.createElement(Icon, {
    color: "brand"
  }), _react.default.createElement(_grommet.Text, {
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
    return _react.default.createElement(_grommet.Grommet, {
      theme: _themes.grommet
    }, _react.default.createElement(_grommet.Box, {
      width: "small"
    }, _react.default.createElement(MenuButton, {
      open: openMenu1,
      label: "Accordion",
      onClick: function onClick() {
        var newOpenMenu1 = !openMenu1;

        _this4.setState({
          openMenu1: newOpenMenu1,
          openSubmenu1: !newOpenMenu1 ? false : openSubmenu1
        });
      }
    }), _react.default.createElement(_grommet.Collapsible, {
      open: openMenu1
    }, _react.default.createElement(MenuButton, {
      submenu: true,
      open: openSubmenu1,
      label: "Accordion Basics",
      onClick: function onClick() {
        return _this4.setState({
          openSubmenu1: !openSubmenu1
        });
      }
    }), _react.default.createElement(_grommet.Collapsible, {
      open: openSubmenu1
    }, _react.default.createElement(_grommet.Button, {
      hoverIndicator: "background",
      onClick: function onClick() {
        return alert('Submenu item 1 selected');
      }
    }, _react.default.createElement(_grommet.Box, {
      margin: {
        left: 'medium'
      },
      direction: "row",
      align: "center",
      pad: "xsmall"
    }, _react.default.createElement(_grommet.Text, {
      size: "small"
    }, "Submenu item 1"))), _react.default.createElement(_grommet.Button, {
      hoverIndicator: "background",
      onClick: function onClick() {
        return alert('Submenu item 2 selected');
      }
    }, _react.default.createElement(_grommet.Box, {
      margin: {
        left: 'medium'
      },
      direction: "row",
      align: "center",
      pad: "xsmall"
    }, _react.default.createElement(_grommet.Text, {
      size: "small"
    }, "Submenu item 2"))))), _react.default.createElement(MenuButton, {
      open: openMenu2,
      label: "Button",
      onClick: function onClick() {
        return _this4.setState({
          openMenu2: !openMenu2
        });
      }
    }), _react.default.createElement(_grommet.Collapsible, {
      open: openMenu2
    }, _react.default.createElement(_grommet.Button, {
      hoverIndicator: "background",
      onClick: function onClick() {
        return alert('Submenu item 1 selected');
      }
    }, _react.default.createElement(_grommet.Box, {
      margin: {
        left: 'medium'
      },
      direction: "row",
      align: "center",
      pad: "xsmall"
    }, _react.default.createElement(_grommet.Text, {
      size: "small"
    }, "Submenu item 1"))))));
  };

  return NestedCollapsible;
}(_react.Component);

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
    return _react.default.createElement(_grommet.Grommet, {
      full: true,
      theme: _themes.grommet
    }, _react.default.createElement(_grommet.Box, {
      fill: true
    }, _react.default.createElement(_grommet.Box, {
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
    }, _react.default.createElement(_grommet.Heading, {
      level: 3,
      margin: "none",
      color: "white"
    }, _react.default.createElement("strong", null, "My App")), _react.default.createElement(_grommet.Button, {
      onClick: function onClick() {
        return _this6.setState({
          openNotification: !openNotification
        });
      },
      icon: _react.default.createElement(_grommetIcons.Notification, {
        color: "white"
      })
    })), _react.default.createElement(_grommet.Box, {
      flex: true,
      direction: "row"
    }, _react.default.createElement(_grommet.Box, {
      flex: true,
      align: "center",
      justify: "center"
    }, "Dashboard content goes here, click on the notification icon"), _react.default.createElement(_grommet.Collapsible, {
      direction: "horizontal",
      open: openNotification
    }, _react.default.createElement(_grommet.Box, {
      flex: true,
      width: "medium",
      background: "light-2",
      pad: "small",
      elevation: "small"
    }, _react.default.createElement(_grommet.Text, {
      size: "xlarge"
    }, "Sidebar"))))));
  };

  return HorizontalCollapsible;
}(_react.Component);

(0, _react2.storiesOf)('Collapsible', module).add('Default', function () {
  return _react.default.createElement(SimpleCollapsible, null);
}).add('Nested', function () {
  return _react.default.createElement(NestedCollapsible, null);
}).add('Horizontal', function () {
  return _react.default.createElement(HorizontalCollapsible, null);
});