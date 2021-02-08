function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { Anchor, Box, Button, Card, CardBody, CardFooter, Collapsible, Heading, Grommet, Image, Paragraph } from 'grommet';
import { FormDown } from "grommet-icons/es6/icons/FormDown";
import { FormUp } from "grommet-icons/es6/icons/FormUp";
import { Favorite } from "grommet-icons/es6/icons/Favorite";
import { ShareOption } from "grommet-icons/es6/icons/ShareOption";
var theme = {
  global: {
    font: {
      family: "Comic Sans MS, -apple-system,\n         BlinkMacSystemFont, \n         \"Segoe UI\", \n         Roboto"
    }
  },
  card: {
    elevation: 'none',
    background: 'light-2',
    footer: {
      pad: 'medium'
    }
  }
};
export var RichFooter = function RichFooter() {
  var _React$useState = React.useState(false),
      open = _React$useState[0],
      setOpen = _React$useState[1];

  var _React$useState2 = React.useState(false),
      favorite = _React$useState2[0],
      setFavorite = _React$useState2[1];

  var ExpandButton = function ExpandButton(_ref) {
    var rest = _extends({}, _ref);

    var Icon = open ? FormUp : FormDown;
    return /*#__PURE__*/React.createElement(Button, _extends({
      hoverIndicator: "light-4",
      icon: /*#__PURE__*/React.createElement(Icon, {
        color: "brand"
      })
    }, rest));
  };

  return /*#__PURE__*/React.createElement(Grommet, {
    theme: theme
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "medium",
    align: "start"
  }, /*#__PURE__*/React.createElement(Card, {
    elevation: "large",
    width: "medium"
  }, /*#__PURE__*/React.createElement(CardBody, {
    height: "small"
  }, /*#__PURE__*/React.createElement(Image, {
    fit: "cover",
    src: "//v2.grommet.io/assets/IMG_4245.jpg",
    a11yTitle: "bridge"
  })), /*#__PURE__*/React.createElement(Box, {
    pad: {
      horizontal: 'medium'
    },
    responsive: false
  }, /*#__PURE__*/React.createElement(Heading, {
    level: "3",
    margin: {
      vertical: 'medium'
    }
  }, "Bridge"), /*#__PURE__*/React.createElement(Paragraph, {
    margin: {
      top: 'none'
    }
  }, "A structure carrying a road, path, railroad, or canal across a river, ravine, road, railroad, or other obstacle.")), /*#__PURE__*/React.createElement(CardFooter, null, /*#__PURE__*/React.createElement(Box, {
    direction: "row",
    align: "center",
    gap: "small"
  }, /*#__PURE__*/React.createElement(Button, {
    icon: /*#__PURE__*/React.createElement(Favorite, {
      color: favorite ? 'red' : undefined
    }),
    hoverIndicator: true,
    onClick: function onClick() {
      setFavorite(!favorite);
    }
  }), /*#__PURE__*/React.createElement(Button, {
    icon: /*#__PURE__*/React.createElement(ShareOption, {
      color: "plain"
    }),
    hoverIndicator: true
  }), /*#__PURE__*/React.createElement(Anchor, {
    href: "https://www.collinsdictionary.com/us/dictionary/english/bridge",
    label: "Learn More"
  })), /*#__PURE__*/React.createElement(ExpandButton, {
    onClick: function onClick() {
      return setOpen(!open);
    }
  })), /*#__PURE__*/React.createElement(Collapsible, {
    open: open
  }, /*#__PURE__*/React.createElement(Paragraph, {
    margin: "medium",
    color: "dark-3"
  }, "The greatest bridge builders of antiquity were the ancient Romans. The Romans built arch bridges and aqueducts that could stand in conditions that would damage or destroy earlier designs. Some stand today.")))));
};
RichFooter.storyName = 'Rich footer';
export default {
  title: "Layout/Card/Rich footer"
};