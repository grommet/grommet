"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommetIcons = require("grommet-icons");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var richAccordionTheme = {
  accordion: {
    icons: {
      collapse: _grommetIcons.FormSubtract,
      expand: _grommetIcons.FormAdd
    }
  }
};

var RichPanel = function RichPanel(_ref) {
  var children = _ref.children,
      icon = _ref.icon,
      label = _ref.label,
      rest = _objectWithoutPropertiesLoose(_ref, ["children", "icon", "label"]);

  var _React$useState = _react["default"].useState(false),
      hovering = _React$useState[0],
      setHovering = _React$useState[1];

  var renderPanelTitle = function renderPanelTitle() {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      direction: "row",
      align: "center",
      gap: "small",
      pad: {
        horizontal: 'small'
      }
    }, icon, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
      level: 4,
      color: hovering ? 'dark-1' : 'dark-3'
    }, label));
  };

  return /*#__PURE__*/_react["default"].createElement(_grommet.AccordionPanel, _extends({
    label: renderPanelTitle(),
    onMouseOver: function onMouseOver() {
      return setHovering(true);
    },
    onMouseOut: function onMouseOut() {
      return setHovering(false);
    },
    onFocus: function onFocus() {
      return setHovering(true);
    },
    onBlur: function onBlur() {
      return setHovering(false);
    }
  }, rest), children);
};

var spinning = /*#__PURE__*/_react["default"].createElement("svg", {
  version: "1.1",
  viewBox: "0 0 32 32",
  width: "32px",
  height: "32px",
  fill: "#333333"
}, /*#__PURE__*/_react["default"].createElement("path", {
  opacity: ".25",
  d: "M16 0 A16 16 0 0 0 16 32 A16 16 0 0 0 16 0 M16 4 A12 12 0 0 1 16 28  A12 12 0 0 1 16 4"
}), /*#__PURE__*/_react["default"].createElement("path", {
  d: "M16 0 A16 16 0 0 1 32 16 L28 16 A12 12 0 0 0 16 4z"
}, /*#__PURE__*/_react["default"].createElement("animateTransform", {
  attributeName: "transform",
  type: "rotate",
  from: "0 16 16",
  to: "360 16 16",
  dur: "0.8s",
  repeatCount: "indefinite"
})));

var loading = /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
  align: "center",
  justify: "center",
  style: {
    height: '100px'
  }
}, spinning);

var RichAccordion = function RichAccordion() {
  var _React$useState2 = _react["default"].useState(false),
      highlightLoaded = _React$useState2[0],
      setHighlightLoaded = _React$useState2[1];

  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    full: true,
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true,
    direction: "row"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    basis: "medium",
    border: "all"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    flex: false,
    border: "bottom",
    background: "light-2",
    as: "header",
    pad: {
      horizontal: 'small'
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
    level: 3
  }, /*#__PURE__*/_react["default"].createElement("strong", null, "About #announcements"))), /*#__PURE__*/_react["default"].createElement(_grommet.ThemeContext.Extend, {
    value: richAccordionTheme
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Accordion, {
    multiple: true,
    onActive: function onActive(activeIndexes) {
      if (activeIndexes.includes(1)) {
        // give sometime to emulate an async call
        setTimeout(function () {
          return setHighlightLoaded(true);
        }, 1000);
      }
    }
  }, /*#__PURE__*/_react["default"].createElement(RichPanel, {
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.CircleInformation, null),
    label: "Channel Details"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: {
      bottom: 'medium',
      horizontal: 'small',
      top: 'small'
    },
    gap: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    gap: "xsmall"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    color: "dark-3"
  }, /*#__PURE__*/_react["default"].createElement("strong", null, "Purpose")), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Used for general announcements like new releases, trainings...")), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    gap: "xsmall"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    color: "dark-3"
  }, /*#__PURE__*/_react["default"].createElement("strong", null, "Created")), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Created by Bryan Jacquot on January 19, 2016")))), /*#__PURE__*/_react["default"].createElement(RichPanel, {
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Bookmark, {
      color: "accent-1"
    }),
    label: "Highlights"
  }, highlightLoaded ? /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
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
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    color: "dark-3"
  }, "Below is the top message in", /*#__PURE__*/_react["default"].createElement("strong", null, "#announcements"), "."), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")) : loading), /*#__PURE__*/_react["default"].createElement(RichPanel, {
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.User, {
      color: "accent-2"
    }),
    label: "2,000 members"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: {
      bottom: 'medium',
      horizontal: 'small',
      top: 'small'
    },
    gap: "medium"
  }, "Yeah believe me, this channel has 3,000 members.")))))));
};

(0, _react2.storiesOf)('Accordion', module).add('Rich', function () {
  return /*#__PURE__*/_react["default"].createElement(RichAccordion, null);
});