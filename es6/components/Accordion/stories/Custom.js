function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { storiesOf } from '@storybook/react';
import { SubtractCircle } from "grommet-icons/es6/icons/SubtractCircle";
import { AddCircle } from "grommet-icons/es6/icons/AddCircle";
import { Accordion, AccordionPanel, Box, Grommet, Text } from 'grommet';
var CustomAccordionTheme = {
  accordion: {
    heading: {
      level: '3'
    },
    icons: {
      collapse: SubtractCircle,
      expand: AddCircle,
      color: 'hotpink'
    },
    border: undefined
  }
};

var CustomAccordion = function CustomAccordion(_ref) {
  var animate = _ref.animate,
      multiple = _ref.multiple,
      rest = _objectWithoutPropertiesLoose(_ref, ["animate", "multiple"]);

  return React.createElement(Grommet, {
    theme: CustomAccordionTheme
  }, React.createElement(Box, _extends({}, rest, {
    pad: "large",
    align: "center",
    justify: "center"
  }), React.createElement(Accordion, {
    animate: animate,
    multiple: true
  }, React.createElement(AccordionPanel, {
    label: React.createElement(Text, {
      size: "large"
    }, "Panel 1 - uses large Text size")
  }, React.createElement(Box, {
    background: "light-2",
    height: "small"
  }, "Important Info")), React.createElement(AccordionPanel, {
    label: React.createElement(Text, {
      size: "xlarge",
      margin: "vertical"
    }, "Panel 2 - uses xlarge Text size")
  }, React.createElement(Box, {
    background: "light-2",
    height: "xsmall"
  }, React.createElement(Text, {
    size: "small"
  }, "Important Info"))), React.createElement(AccordionPanel, {
    label: "Panel 3 - uses custom theme heading level for sizing"
  }, React.createElement(Box, {
    background: "light-2",
    height: "xsmall"
  }, React.createElement(Text, {
    size: "small"
  }, "Important Info"))))));
};

storiesOf('Accordion', module).add('Custom', function () {
  return React.createElement(CustomAccordion, null);
});