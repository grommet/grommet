// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Add } from "grommet-icons/es6/icons/Add";
import { Box, Button, Grommet, Text } from 'grommet';
export var ChildrenPlainOption = function ChildrenPlainOption() {
  return /*#__PURE__*/React.createElement(Box, {
    pad: "large",
    gap: "large"
  }, /*#__PURE__*/React.createElement(Grommet, {
    options: {
      button: {
        childrenPlain: false
      }
    }
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    gap: "small"
  }, /*#__PURE__*/React.createElement(Text, {
    size: "small",
    color: "text-weak"
  }, "options.button.childrenPlain defaults to true. Setting it to false stops automatically forcing plain when Button has children."), /*#__PURE__*/React.createElement(Button, {
    hoverIndicator: "light-1",
    onClick: function onClick() {}
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "small",
    direction: "row",
    align: "center",
    gap: "small"
  }, /*#__PURE__*/React.createElement(Add, null), /*#__PURE__*/React.createElement(Text, null, "Option false"))), /*#__PURE__*/React.createElement(Button, {
    hoverIndicator: "light-1",
    plain: true,
    onClick: function onClick() {}
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "small",
    direction: "row",
    align: "center",
    gap: "small"
  }, /*#__PURE__*/React.createElement(Add, null), /*#__PURE__*/React.createElement(Text, null, "Explicit plain"))))), /*#__PURE__*/React.createElement(Grommet, {
    options: {
      button: {
        childrenPlain: false
      }
    },
    theme: {
      global: {
        font: {
          family: "-apple-system, BlinkMacSystemFont"
        }
      },
      button: {
        "default": {}
      }
    }
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    gap: "small"
  }, /*#__PURE__*/React.createElement(Text, {
    size: "small",
    color: "text-weak"
  }, "Same behavior applies for kind buttons."), /*#__PURE__*/React.createElement(Button, {
    hoverIndicator: "light-1",
    onClick: function onClick() {}
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "small",
    direction: "row",
    align: "center",
    gap: "small"
  }, /*#__PURE__*/React.createElement(Add, null), /*#__PURE__*/React.createElement(Text, null, "Kind option false"))), /*#__PURE__*/React.createElement(Button, {
    hoverIndicator: "light-1",
    plain: true,
    onClick: function onClick() {}
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "small",
    direction: "row",
    align: "center",
    gap: "small"
  }, /*#__PURE__*/React.createElement(Add, null), /*#__PURE__*/React.createElement(Text, null, "Kind explicit plain"))))));
};
ChildrenPlainOption.storyName = 'Children Plain Option';
export default {
  title: 'Controls/Button/Custom Themed/Children Plain Option'
};