import React from 'react';
import { FormClose } from "grommet-icons/es6/icons/FormClose";
import { Box, Button, Layer, Text } from 'grommet';
export var ScrollBodyLayer = function ScrollBodyLayer() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Layer, {
      full: "vertical",
      position: "right"
    }, /*#__PURE__*/React.createElement(Box, {
      fill: true,
      style: {
        minWidth: '378px'
      }
    }, /*#__PURE__*/React.createElement(Box, {
      direction: "row",
      align: "center",
      as: "header",
      elevation: "small",
      justify: "between"
    }, /*#__PURE__*/React.createElement(Text, {
      margin: {
        left: 'small'
      }
    }, "Header"), /*#__PURE__*/React.createElement(Button, {
      icon: /*#__PURE__*/React.createElement(FormClose, null)
    })), /*#__PURE__*/React.createElement(Box, {
      flex: true,
      overflow: "auto",
      pad: "xsmall"
    }, /*#__PURE__*/React.createElement("span", null, "body"), /*#__PURE__*/React.createElement("span", null, "body"), /*#__PURE__*/React.createElement("span", null, "body"), /*#__PURE__*/React.createElement("span", null, "body"), /*#__PURE__*/React.createElement("span", null, "body"), /*#__PURE__*/React.createElement("span", null, "body"), /*#__PURE__*/React.createElement("span", null, "body"), /*#__PURE__*/React.createElement("span", null, "body"), /*#__PURE__*/React.createElement("span", null, "body"), /*#__PURE__*/React.createElement("span", null, "body"), /*#__PURE__*/React.createElement("span", null, "body"), /*#__PURE__*/React.createElement("span", null, "body"), /*#__PURE__*/React.createElement("span", null, "body"), /*#__PURE__*/React.createElement("span", null, "body"), /*#__PURE__*/React.createElement("span", null, "body"), /*#__PURE__*/React.createElement("span", null, "body"), /*#__PURE__*/React.createElement("span", null, "body"), /*#__PURE__*/React.createElement("span", null, "body"), /*#__PURE__*/React.createElement("span", null, "body"), /*#__PURE__*/React.createElement("span", null, "body"), /*#__PURE__*/React.createElement("span", null, "body"), /*#__PURE__*/React.createElement("span", null, "body"), /*#__PURE__*/React.createElement("span", null, "body"), /*#__PURE__*/React.createElement("span", null, "body"), /*#__PURE__*/React.createElement("span", null, "body"), /*#__PURE__*/React.createElement("span", null, "body"), /*#__PURE__*/React.createElement("span", null, "body"), /*#__PURE__*/React.createElement("span", null, "body"), /*#__PURE__*/React.createElement("span", null, "body"), /*#__PURE__*/React.createElement("span", null, "body"), /*#__PURE__*/React.createElement("span", null, "body"), /*#__PURE__*/React.createElement("span", null, "body"), /*#__PURE__*/React.createElement("span", null, "body"), /*#__PURE__*/React.createElement("span", null, "body"), /*#__PURE__*/React.createElement("span", null, "body"), /*#__PURE__*/React.createElement("span", null, "body"), /*#__PURE__*/React.createElement("span", null, "body"), /*#__PURE__*/React.createElement("span", null, "body"), /*#__PURE__*/React.createElement("span", null, "body"), /*#__PURE__*/React.createElement("span", null, "body"), /*#__PURE__*/React.createElement("span", null, "body"), /*#__PURE__*/React.createElement("span", null, "body"), /*#__PURE__*/React.createElement("span", null, "body"), /*#__PURE__*/React.createElement("span", null, "body"), /*#__PURE__*/React.createElement("span", null, "body"), /*#__PURE__*/React.createElement("span", null, "body"), /*#__PURE__*/React.createElement("span", null, "body"), /*#__PURE__*/React.createElement("span", null, "body"), /*#__PURE__*/React.createElement("span", null, "body"), /*#__PURE__*/React.createElement("span", null, "body"), /*#__PURE__*/React.createElement("span", null, "body"), /*#__PURE__*/React.createElement("span", null, "body"), /*#__PURE__*/React.createElement("span", null, "body"), /*#__PURE__*/React.createElement("span", null, "body"), /*#__PURE__*/React.createElement("span", null, "body"), /*#__PURE__*/React.createElement("span", null, "body"), /*#__PURE__*/React.createElement("span", null, "body"), /*#__PURE__*/React.createElement("span", null, "body"), /*#__PURE__*/React.createElement("span", null, "body"), /*#__PURE__*/React.createElement("span", null, "body"), /*#__PURE__*/React.createElement("span", null, "body"), /*#__PURE__*/React.createElement("span", null, "body"), /*#__PURE__*/React.createElement("span", null, "body")), /*#__PURE__*/React.createElement(Box, {
      as: "footer",
      border: {
        side: 'top'
      },
      pad: "small",
      justify: "end",
      direction: "row",
      align: "center"
    }, /*#__PURE__*/React.createElement(Button, {
      primary: true,
      label: "Save"
    }))))
    // </Grommet>
  );
};

ScrollBodyLayer.storyName = 'Fixed header, scroll body';
export default {
  title: 'Layout/Layer/Fixed header, scroll body'
};