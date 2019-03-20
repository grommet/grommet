"use strict";

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _grommetIcons = require("grommet-icons");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var richAccordionTheme = {
  accordion: {
    icons: {
      collapse: _grommetIcons.FormSubtract,
      expand: _grommetIcons.FormAdd
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
      return _react.default.createElement(_grommet.Box, {
        direction: "row",
        align: "center",
        gap: "small",
        pad: {
          horizontal: 'small'
        }
      }, icon, _react.default.createElement(_grommet.Heading, {
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
    return _react.default.createElement(_grommet.AccordionPanel, {
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
}(_react.Component);

var spinning = _react.default.createElement("svg", {
  version: "1.1",
  viewBox: "0 0 32 32",
  width: "32px",
  height: "32px",
  fill: "#333333"
}, _react.default.createElement("path", {
  opacity: ".25",
  d: "M16 0 A16 16 0 0 0 16 32 A16 16 0 0 0 16 0 M16 4 A12 12 0 0 1 16 28 A12 12 0 0 1 16 4"
}), _react.default.createElement("path", {
  d: "M16 0 A16 16 0 0 1 32 16 L28 16 A12 12 0 0 0 16 4z"
}, _react.default.createElement("animateTransform", {
  attributeName: "transform",
  type: "rotate",
  from: "0 16 16",
  to: "360 16 16",
  dur: "0.8s",
  repeatCount: "indefinite"
})));

var loading = _react.default.createElement(_grommet.Box, {
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
    return _react.default.createElement(_grommet.Grommet, {
      full: true,
      theme: _themes.grommet
    }, _react.default.createElement(_grommet.Box, {
      fill: true,
      direction: "row"
    }, _react.default.createElement(_grommet.Box, {
      basis: "medium",
      border: "all"
    }, _react.default.createElement(_grommet.Box, {
      flex: false,
      border: "bottom",
      background: "light-2",
      as: "header",
      pad: {
        horizontal: 'small'
      }
    }, _react.default.createElement(_grommet.Heading, {
      level: 3
    }, _react.default.createElement("strong", null, "About #announcements"))), _react.default.createElement(_grommet.ThemeContext.Extend, {
      value: richAccordionTheme
    }, _react.default.createElement(_grommet.Accordion, {
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
    }, _react.default.createElement(RichPanel, {
      icon: _react.default.createElement(_grommetIcons.CircleInformation, null),
      label: "Channel Details"
    }, _react.default.createElement(_grommet.Box, {
      pad: {
        bottom: 'medium',
        horizontal: 'small',
        top: 'small'
      },
      gap: "medium"
    }, _react.default.createElement(_grommet.Box, {
      gap: "xsmall"
    }, _react.default.createElement(_grommet.Text, {
      color: "dark-3"
    }, _react.default.createElement("strong", null, "Purpose")), _react.default.createElement(_grommet.Text, null, "Used for general announcements like new releases, trainings...")), _react.default.createElement(_grommet.Box, {
      gap: "xsmall"
    }, _react.default.createElement(_grommet.Text, {
      color: "dark-3"
    }, _react.default.createElement("strong", null, "Created")), _react.default.createElement(_grommet.Text, null, "Created by Bryan Jacquot on January 19, 2016")))), _react.default.createElement(RichPanel, {
      icon: _react.default.createElement(_grommetIcons.Bookmark, {
        color: "accent-1"
      }),
      label: "Highlights"
    }, highlightLoaded ? _react.default.createElement(_grommet.Box, {
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
    }, _react.default.createElement(_grommet.Text, {
      color: "dark-3"
    }, "Below is the top message in", _react.default.createElement("strong", null, "#announcements"), "."), _react.default.createElement(_grommet.Text, null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."), _react.default.createElement(_grommet.Text, null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."), _react.default.createElement(_grommet.Text, null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."), _react.default.createElement(_grommet.Text, null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."), _react.default.createElement(_grommet.Text, null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")) : loading), _react.default.createElement(RichPanel, {
      icon: _react.default.createElement(_grommetIcons.User, {
        color: "accent-2"
      }),
      label: "2,000 members"
    }, _react.default.createElement(_grommet.Box, {
      pad: {
        bottom: 'medium',
        horizontal: 'small',
        top: 'small'
      },
      gap: "medium"
    }, "Yeah believe me, this channel has 2,000 members.")))))));
  };

  return RichAccordion;
}(_react.Component);

(0, _react2.storiesOf)('Accordion', module).add('Rich', function () {
  return _react.default.createElement(RichAccordion, null);
});