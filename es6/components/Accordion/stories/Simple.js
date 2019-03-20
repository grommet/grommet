function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { storiesOf } from '@storybook/react';
import { Accordion, AccordionPanel, Box, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

var SimpleAccordion = function SimpleAccordion(props) {
  var animate = props.animate,
      multiple = props.multiple,
      rest = _objectWithoutPropertiesLoose(props, ["animate", "multiple"]);

  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, rest, React.createElement(Accordion, {
    animate: animate,
    multiple: multiple
  }, React.createElement(AccordionPanel, {
    label: "Panel 1"
  }, React.createElement(Box, {
    background: "light-2",
    overflow: "auto",
    height: "medium"
  }, React.createElement(Box, {
    height: "large",
    flex: false
  }, "Panel 1 contents"))), React.createElement(AccordionPanel, {
    label: "Panel 2"
  }, React.createElement(Box, {
    background: "light-2",
    style: {
      height: '50px'
    }
  }, "Panel 2 contents")), React.createElement(AccordionPanel, {
    label: "Panel 3"
  }, React.createElement(Box, {
    background: "light-2",
    style: {
      height: '300px'
    }
  }, "Panel 3 contents")))));
};

storiesOf('Accordion', module).add('Simple', function () {
  return React.createElement(SimpleAccordion, null);
}).add('Dark no animation', function () {
  return React.createElement(SimpleAccordion, {
    animate: false,
    background: "dark-2"
  });
}).add('Multiple', function () {
  return React.createElement(SimpleAccordion, {
    multiple: true
  });
});