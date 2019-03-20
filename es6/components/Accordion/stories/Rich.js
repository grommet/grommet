function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { Bookmark } from "grommet-icons/es6/icons/Bookmark";
import { CircleInformation } from "grommet-icons/es6/icons/CircleInformation";
import { FormSubtract } from "grommet-icons/es6/icons/FormSubtract";
import { FormAdd } from "grommet-icons/es6/icons/FormAdd";
import { User } from "grommet-icons/es6/icons/User";
import { Accordion, AccordionPanel, Box, Grommet, Heading, Text, ThemeContext } from 'grommet';
import { grommet } from 'grommet/themes';
var richAccordionTheme = {
  accordion: {
    icons: {
      collapse: FormSubtract,
      expand: FormAdd
    }
  }
};

var RichPanel =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(RichPanel, _Component);

  function RichPanel() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      hovering: false
    });

    _defineProperty(_assertThisInitialized(_this), "renderPanelTitle", function () {
      /* eslint-disable-next-line react/prop-types */
      var _this$props = _this.props,
          icon = _this$props.icon,
          label = _this$props.label;
      var hovering = _this.state.hovering;
      return React.createElement(Box, {
        direction: "row",
        align: "center",
        gap: "small",
        pad: {
          horizontal: 'small'
        }
      }, icon, React.createElement(Heading, {
        level: 4,
        color: hovering ? 'dark-1' : 'dark-3'
      }, label));
    });

    return _this;
  }

  var _proto = RichPanel.prototype;

  _proto.render = function render() {
    var _this2 = this;

    /* eslint-disable-next-line react/prop-types */
    var children = this.props.children;
    return React.createElement(AccordionPanel, {
      label: this.renderPanelTitle(),
      onMouseOver: function onMouseOver() {
        return _this2.setState({
          hovering: true
        });
      },
      onMouseOut: function onMouseOut() {
        return _this2.setState({
          hovering: false
        });
      },
      onFocus: function onFocus() {
        return _this2.setState({
          hovering: true
        });
      },
      onBlur: function onBlur() {
        return _this2.setState({
          hovering: false
        });
      }
    }, children);
  };

  return RichPanel;
}(Component);

var spinning = React.createElement("svg", {
  version: "1.1",
  viewBox: "0 0 32 32",
  width: "32px",
  height: "32px",
  fill: "#333333"
}, React.createElement("path", {
  opacity: ".25",
  d: "M16 0 A16 16 0 0 0 16 32 A16 16 0 0 0 16 0 M16 4 A12 12 0 0 1 16 28 A12 12 0 0 1 16 4"
}), React.createElement("path", {
  d: "M16 0 A16 16 0 0 1 32 16 L28 16 A12 12 0 0 0 16 4z"
}, React.createElement("animateTransform", {
  attributeName: "transform",
  type: "rotate",
  from: "0 16 16",
  to: "360 16 16",
  dur: "0.8s",
  repeatCount: "indefinite"
})));
var loading = React.createElement(Box, {
  align: "center",
  justify: "center",
  style: {
    height: '100px'
  }
}, spinning);

var RichAccordion =
/*#__PURE__*/
function (_Component2) {
  _inheritsLoose(RichAccordion, _Component2);

  function RichAccordion() {
    var _this3;

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this3 = _Component2.call.apply(_Component2, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this3), "state", {
      highlightLoaded: false
    });

    return _this3;
  }

  var _proto2 = RichAccordion.prototype;

  _proto2.render = function render() {
    var _this4 = this;

    var highlightLoaded = this.state.highlightLoaded;
    return React.createElement(Grommet, {
      full: true,
      theme: grommet
    }, React.createElement(Box, {
      fill: true,
      direction: "row"
    }, React.createElement(Box, {
      basis: "medium",
      border: "all"
    }, React.createElement(Box, {
      flex: false,
      border: "bottom",
      background: "light-2",
      as: "header",
      pad: {
        horizontal: 'small'
      }
    }, React.createElement(Heading, {
      level: 3
    }, React.createElement("strong", null, "About #announcements"))), React.createElement(ThemeContext.Extend, {
      value: richAccordionTheme
    }, React.createElement(Accordion, {
      multiple: true,
      onActive: function onActive(activeIndexes) {
        if (activeIndexes.includes(1)) {
          // give sometime to emulate an async call
          setTimeout(function () {
            _this4.setState({
              highlightLoaded: true
            });
          }, 1000);
        }
      }
    }, React.createElement(RichPanel, {
      icon: React.createElement(CircleInformation, null),
      label: "Channel Details"
    }, React.createElement(Box, {
      pad: {
        bottom: 'medium',
        horizontal: 'small',
        top: 'small'
      },
      gap: "medium"
    }, React.createElement(Box, {
      gap: "xsmall"
    }, React.createElement(Text, {
      color: "dark-3"
    }, React.createElement("strong", null, "Purpose")), React.createElement(Text, null, "Used for general announcements like new releases, trainings...")), React.createElement(Box, {
      gap: "xsmall"
    }, React.createElement(Text, {
      color: "dark-3"
    }, React.createElement("strong", null, "Created")), React.createElement(Text, null, "Created by Bryan Jacquot on January 19, 2016")))), React.createElement(RichPanel, {
      icon: React.createElement(Bookmark, {
        color: "accent-1"
      }),
      label: "Highlights"
    }, highlightLoaded ? React.createElement(Box, {
      pad: {
        bottom: 'medium',
        horizontal: 'small',
        top: 'small'
      },
      gap: "medium",
      overflow: "auto",
      style: {
        maxHeight: '400px'
      }
    }, React.createElement(Text, {
      color: "dark-3"
    }, "Below is the top message in", React.createElement("strong", null, "#announcements"), "."), React.createElement(Text, null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."), React.createElement(Text, null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."), React.createElement(Text, null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."), React.createElement(Text, null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."), React.createElement(Text, null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")) : loading), React.createElement(RichPanel, {
      icon: React.createElement(User, {
        color: "accent-2"
      }),
      label: "2,000 members"
    }, React.createElement(Box, {
      pad: {
        bottom: 'medium',
        horizontal: 'small',
        top: 'small'
      },
      gap: "medium"
    }, "Yeah believe me, this channel has 2,000 members.")))))));
  };

  return RichAccordion;
}(Component);

storiesOf('Accordion', module).add('Rich', function () {
  return React.createElement(RichAccordion, null);
});