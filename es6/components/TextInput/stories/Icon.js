import React from 'react';
import { Search } from "grommet-icons/es6/icons/Search";
import { Box, TextInput } from 'grommet';
export var Icon = function Icon() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      fill: true,
      align: "center",
      justify: "start",
      pad: "large"
    }, /*#__PURE__*/React.createElement(Box, {
      width: "medium",
      gap: "medium"
    }, /*#__PURE__*/React.createElement(TextInput, {
      icon: /*#__PURE__*/React.createElement(Search, null),
      placeholder: "search ..."
    }), /*#__PURE__*/React.createElement(TextInput, {
      icon: /*#__PURE__*/React.createElement(Search, null),
      reverse: true,
      placeholder: "search ..."
    })))
    // </Grommet>
  );
};

export default {
  title: 'Input/TextInput/Icon'
};