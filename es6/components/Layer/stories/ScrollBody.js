import React from 'react';
import { storiesOf } from '@storybook/react';
import { FormClose } from "grommet-icons/es6/icons/FormClose";
import { Box, Button, Grommet, Layer, Text } from 'grommet';
import { grommet } from 'grommet/themes';

var ScrollBodyLayer = function ScrollBodyLayer() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Layer, {
    full: "vertical",
    position: "right"
  }, React.createElement(Box, {
    fill: true,
    style: {
      minWidth: '378px'
    }
  }, React.createElement(Box, {
    direction: "row",
    align: "center",
    as: "header",
    elevation: "small",
    justify: "between"
  }, React.createElement(Text, {
    margin: {
      left: 'small'
    }
  }, "Header"), React.createElement(Button, {
    icon: React.createElement(FormClose, null)
  })), React.createElement(Box, {
    flex: true,
    overflow: "auto",
    pad: "xsmall"
  }, React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body"), React.createElement("span", null, "body")), React.createElement(Box, {
    as: "footer",
    border: {
      side: 'top'
    },
    pad: "small",
    justify: "end",
    direction: "row",
    align: "center"
  }, React.createElement(Button, {
    primary: true,
    label: "Save"
  })))));
};

storiesOf('Layer', module).add('Fixed Header, Scroll Body', function () {
  return React.createElement(ScrollBodyLayer, null);
});