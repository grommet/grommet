import React from 'react';
import { Favorite } from "grommet-icons/es6/icons/Favorite";
import { Avatar, Box } from 'grommet';
export var Basic = function Basic() {
  var src = '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80';
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    React.createElement(Box, {
      align: "center",
      justify: "center",
      direction: "row",
      gap: "small",
      pad: "large"
    }, /*#__PURE__*/React.createElement(Avatar, {
      src: src
    }), /*#__PURE__*/React.createElement(Avatar, {
      background: "dark-4"
    }, /*#__PURE__*/React.createElement(Favorite, {
      color: "light-2"
    })), /*#__PURE__*/React.createElement(Avatar, {
      background: "dark-2"
    }, "R"), /*#__PURE__*/React.createElement(Avatar, {
      background: "brand"
    }, "SY"))
    // </Grommed>
  );
};

export default {
  title: 'Visualizations/Avatar/Basic'
};