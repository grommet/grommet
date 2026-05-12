import React from 'react';
import { Avatar, Box } from 'grommet';
export var Round = function Round() {
  var src = '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80';
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    React.createElement(Box, {
      direction: "row",
      alignContent: "center",
      gap: "small",
      pad: "large"
    }, /*#__PURE__*/React.createElement(Avatar, {
      size: "large",
      src: src,
      round: false,
      "aria-label": "Shimi"
    }), /*#__PURE__*/React.createElement(Avatar, {
      size: "large",
      src: src,
      round: "xsmall",
      "aria-label": "Shimi"
    }), /*#__PURE__*/React.createElement(Avatar, {
      size: "large",
      src: src,
      round: "small",
      "aria-label": "Shimi"
    }), /*#__PURE__*/React.createElement(Avatar, {
      size: "large",
      src: src,
      round: "medium",
      "aria-label": "Shimi"
    }), /*#__PURE__*/React.createElement(Avatar, {
      size: "large",
      src: src,
      round: "large",
      "aria-label": "Shimi"
    }), /*#__PURE__*/React.createElement(Avatar, {
      size: "large",
      src: src,
      "aria-label": "Shimi"
    }))
    // </Grommet>
  );
};
export default {
  title: 'Visualizations/Avatar/Round'
};