import React from 'react';
import { Box, DateInput } from 'grommet';
export var ReadOnly = function ReadOnly() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      fill: true,
      align: "center",
      pad: "large"
    }, /*#__PURE__*/React.createElement(Box, {
      width: "medium",
      gap: "medium"
    }, /*#__PURE__*/React.createElement(DateInput, {
      value: "02/11/2024",
      "aria-label": "read only",
      readOnly: true,
      format: "mm/dd/yyyy"
    }), /*#__PURE__*/React.createElement(DateInput, {
      value: "02/11/2024",
      "aria-label": "read only copy",
      readOnlyCopy: true,
      format: "mm/dd/yyyy"
    })))
    // </Grommet>
  );
};
export default {
  title: 'Input/DateInput/ReadOnly'
};