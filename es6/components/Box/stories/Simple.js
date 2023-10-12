import React from 'react';
import { Attraction } from "grommet-icons/es6/icons/Attraction";
import { Car } from "grommet-icons/es6/icons/Car";
import { Anchor, Box, Button, Text } from 'grommet';
export var SimpleBox = function SimpleBox() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      direction: "row-responsive",
      justify: "center",
      align: "center",
      pad: "xlarge",
      background: "dark-2",
      gap: "medium"
    }, /*#__PURE__*/React.createElement(Box, {
      pad: "large",
      align: "center",
      background: {
        color: 'light-4',
        opacity: 'strong'
      },
      round: true,
      gap: "small"
    }, /*#__PURE__*/React.createElement(Attraction, {
      size: "large"
    }), /*#__PURE__*/React.createElement(Text, null, "Party"), /*#__PURE__*/React.createElement(Anchor, {
      href: "",
      label: "Link",
      color: "dark-1"
    }), /*#__PURE__*/React.createElement(Button, {
      label: "Button",
      onClick: function onClick() {}
    })), /*#__PURE__*/React.createElement(Box, {
      pad: "large",
      align: "center",
      background: "dark-1",
      round: true,
      gap: "small"
    }, /*#__PURE__*/React.createElement(Car, {
      size: "large",
      color: "light-2"
    }), /*#__PURE__*/React.createElement(Text, null, "Travel"), /*#__PURE__*/React.createElement(Anchor, {
      href: "",
      label: "Link"
    }), /*#__PURE__*/React.createElement(Button, {
      label: "Button",
      onClick: function onClick() {}
    })))
    // </Grommet>
  );
};

SimpleBox.storyName = 'Simple';
export default {
  title: 'Layout/Box/Simple'
};