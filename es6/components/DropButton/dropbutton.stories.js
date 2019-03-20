function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { Close } from "grommet-icons/es6/icons/Close";
import { FormDown } from "grommet-icons/es6/icons/FormDown";
import { Grommet, Box, Button, Calendar, DropButton, Heading, Text } from 'grommet';
import { grommet } from 'grommet/themes';

var DropContent = function DropContent(_ref) {
  var onClose = _ref.onClose;
  return React.createElement(Box, {
    pad: "small"
  }, React.createElement(Box, {
    direction: "row",
    justify: "between",
    align: "center"
  }, React.createElement(Heading, {
    level: 3,
    margin: "small"
  }, "Heading"), React.createElement(Button, {
    icon: React.createElement(Close, null),
    onClick: onClose
  })), React.createElement(Text, null, "Content"));
};

DropContent.propTypes = {
  onClose: PropTypes.func.isRequired
};

var SimpleDropButton =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(SimpleDropButton, _Component);

  function SimpleDropButton() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {});

    _defineProperty(_assertThisInitialized(_this), "onClose", function () {
      _this.setState({
        open: false
      });

      setTimeout(function () {
        return _this.setState({
          open: undefined
        });
      }, 1);
    });

    return _this;
  }

  var _proto = SimpleDropButton.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var open = this.state.open;
    return React.createElement(Grommet, {
      theme: grommet
    }, React.createElement(Box, {
      align: "center",
      pad: "large"
    }, React.createElement(DropButton, {
      label: "Open",
      open: open,
      onClose: function onClose() {
        return _this2.setState({
          open: undefined
        });
      },
      dropContent: React.createElement(DropContent, {
        onClose: this.onClose
      }),
      dropProps: {
        align: {
          top: 'bottom'
        }
      }
    })));
  };

  return SimpleDropButton;
}(Component);

var CalendarDropButton =
/*#__PURE__*/
function (_Component2) {
  _inheritsLoose(CalendarDropButton, _Component2);

  function CalendarDropButton() {
    var _this3;

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this3 = _Component2.call.apply(_Component2, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this3), "state", {
      date: undefined
    });

    _defineProperty(_assertThisInitialized(_this3), "onClose", function () {
      _this3.setState({
        open: false
      });

      setTimeout(function () {
        return _this3.setState({
          open: undefined
        });
      }, 1);
    });

    _defineProperty(_assertThisInitialized(_this3), "onSelect", function (date) {
      return _this3.setState({
        date: date,
        open: false
      });
    });

    return _this3;
  }

  var _proto2 = CalendarDropButton.prototype;

  _proto2.render = function render() {
    var _this4 = this;

    var _this$state = this.state,
        date = _this$state.date,
        open = _this$state.open;
    return React.createElement(Grommet, {
      theme: grommet
    }, React.createElement(Box, {
      align: "center",
      pad: "large"
    }, React.createElement(DropButton, {
      open: open,
      onClose: function onClose() {
        return _this4.setState({
          open: false
        });
      },
      onOpen: function onOpen() {
        return _this4.setState({
          open: true
        });
      },
      dropContent: React.createElement(Calendar, {
        date: date,
        onSelect: this.onSelect
      })
    }, React.createElement(Box, {
      direction: "row",
      gap: "medium",
      align: "center",
      pad: "small"
    }, React.createElement(Text, null, date ? new Date(date).toLocaleDateString() : 'Select date'), React.createElement(FormDown, {
      color: "brand"
    })))));
  };

  return CalendarDropButton;
}(Component);

var UserMenuDropButton =
/*#__PURE__*/
function (_Component3) {
  _inheritsLoose(UserMenuDropButton, _Component3);

  function UserMenuDropButton() {
    var _this5;

    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    _this5 = _Component3.call.apply(_Component3, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this5), "renderItems", function () {
      return React.createElement(Box, null, React.createElement("span", null, "hi"), React.createElement("span", null, "hi"), React.createElement("span", null, "hi"), React.createElement("span", null, "hi"), React.createElement("span", null, "hi"));
    });

    return _this5;
  }

  var _proto3 = UserMenuDropButton.prototype;

  _proto3.componentDidMount = function componentDidMount() {
    this.forceUpdate();
  };

  _proto3.render = function render() {
    return React.createElement(Grommet, {
      theme: grommet,
      full: true
    }, React.createElement(Box, {
      fill: true
    }, React.createElement(Box, {
      fill: "vertical",
      width: "60px",
      background: "dark-2"
    }, React.createElement(Box, {
      flex: true
    }), React.createElement(DropButton, {
      alignSelf: "center",
      margin: {
        vertical: 'small'
      },
      dropContent: this.renderItems(),
      dropProps: {
        align: {
          bottom: 'top'
        }
      }
    }, React.createElement(Box, {
      height: "36px",
      width: "36px",
      round: "full",
      background: "url(//s.gravatar.com/avatar/b226da5c619b18b44eb95c30be393953?s=80)"
    })))));
  };

  return UserMenuDropButton;
}(Component);

storiesOf('DropButton', module).add('Simple', function () {
  return React.createElement(SimpleDropButton, null);
}).add('Calendar', function () {
  return React.createElement(CalendarDropButton, null);
}).add('UserMenu', function () {
  return React.createElement(UserMenuDropButton, null);
});