import React from 'react';
import { Accordion, AccordionPanel, Box } from 'grommet';
export var Multiple = function Multiple() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, null, /*#__PURE__*/React.createElement(Accordion, {
      multiple: true
    }, /*#__PURE__*/React.createElement(AccordionPanel, {
      label: "Panel 1"
    }, /*#__PURE__*/React.createElement(Box, {
      background: "light-2",
      overflow: "auto",
      height: "medium"
    }, /*#__PURE__*/React.createElement(Box, {
      height: "large",
      flex: false
    }, "Panel 1 contents"))), /*#__PURE__*/React.createElement(AccordionPanel, {
      label: "Panel 2"
    }, /*#__PURE__*/React.createElement(Box, {
      background: "light-2",
      style: {
        height: '50px'
      }
    }, "Panel 2 contents")), /*#__PURE__*/React.createElement(AccordionPanel, {
      label: "Panel 3"
    }, /*#__PURE__*/React.createElement(Box, {
      background: "light-2",
      style: {
        height: '300px'
      }
    }, "Panel 3 contents"))))
    // </Grommet>
  );
};

Multiple.parameters = {
  chromatic: {
    disable: true
  }
};
export default {
  title: 'Controls/Accordion/Multiple'
};