function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
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

var RichPanel = function RichPanel(_ref) {
  var children = _ref.children,
      icon = _ref.icon,
      label = _ref.label,
      rest = _objectWithoutPropertiesLoose(_ref, ["children", "icon", "label"]);

  var _React$useState = React.useState(false),
      hovering = _React$useState[0],
      setHovering = _React$useState[1];

  var renderPanelTitle = function renderPanelTitle() {
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
  };

  return React.createElement(AccordionPanel, _extends({
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

var spinning = React.createElement("svg", {
  version: "1.1",
  viewBox: "0 0 32 32",
  width: "32px",
  height: "32px",
  fill: "#333333"
}, React.createElement("path", {
  opacity: ".25",
  d: "M16 0 A16 16 0 0 0 16 32 A16 16 0 0 0 16 0 M16 4 A12 12 0 0 1 16 28  A12 12 0 0 1 16 4"
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

var RichAccordion = function RichAccordion() {
  var _React$useState2 = React.useState(false),
      highlightLoaded = _React$useState2[0],
      setHighlightLoaded = _React$useState2[1];

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
          return setHighlightLoaded(true);
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

storiesOf('Accordion', module).add('Rich', function () {
  return React.createElement(RichAccordion, null);
});