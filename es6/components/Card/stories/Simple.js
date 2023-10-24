import React from 'react';
import { Box, Card, CardBody, CardFooter, CardHeader, Text } from 'grommet';
export var Simple = function Simple() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      pad: "large",
      gap: "medium",
      width: "medium"
    }, /*#__PURE__*/React.createElement(Card, {
      pad: "small",
      background: "dark-1",
      gap: "medium"
    }, /*#__PURE__*/React.createElement(CardHeader, null, "header"), /*#__PURE__*/React.createElement(CardBody, null, "body"), /*#__PURE__*/React.createElement(CardFooter, null, "footer")), /*#__PURE__*/React.createElement(Card, {
      pad: "small",
      gap: "medium",
      background: "light-4"
    }, /*#__PURE__*/React.createElement(CardBody, null, "body"), /*#__PURE__*/React.createElement(Box, null, "box - random component")), /*#__PURE__*/React.createElement(Card, {
      pad: "small",
      gap: "medium"
    }, /*#__PURE__*/React.createElement(CardBody, null, "body"), /*#__PURE__*/React.createElement(CardHeader, null, "header"), /*#__PURE__*/React.createElement(CardFooter, null, "footer")), /*#__PURE__*/React.createElement(Card, {
      pad: "small",
      gap: "medium",
      background: "light-1"
    }, /*#__PURE__*/React.createElement(Text, null, "text - random component"), /*#__PURE__*/React.createElement(Box, null, "box - random component")))
    // </Grommet>
  );
};

export default {
  title: 'Layout/Card/Simple'
};