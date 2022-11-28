import React from 'react';
import { Box, Pagination, Text } from 'grommet';
export var Size = function Size() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      align: "start",
      pad: "small",
      gap: "medium"
    }, /*#__PURE__*/React.createElement(Text, null, "Small"), /*#__PURE__*/React.createElement(Pagination, {
      numberItems: 237,
      size: "small"
    }), /*#__PURE__*/React.createElement(Text, null, "Medium (Default)"), /*#__PURE__*/React.createElement(Pagination, {
      numberItems: 237,
      size: "medium"
    }), /*#__PURE__*/React.createElement(Text, null, "Large"), /*#__PURE__*/React.createElement(Pagination, {
      numberItems: 237,
      size: "large"
    }))
    // </Grommet>
  );
};

export default {
  title: 'Controls/Pagination/Size'
};