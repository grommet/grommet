import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { Accordion, AccordionPanel, Box, Grommet, Text, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';

var renderPanelHeader = function renderPanelHeader(title, active) {
  return React.createElement(Box, {
    direction: "row",
    align: "center",
    pad: "medium",
    gap: "small"
  }, React.createElement("strong", null, React.createElement(Text, null, title)), React.createElement(Text, {
    color: "brand"
  }, active ? '-' : '+'));
};

var CustomHeaderAccordion = function CustomHeaderAccordion() {
  var _useState = useState([0]),
      activeIndex = _useState[0],
      setActiveIndex = _useState[1];

  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Accordion, {
    activeIndex: activeIndex,
    onActive: function onActive(newActiveIndex) {
      return setActiveIndex(newActiveIndex);
    }
  }, React.createElement(AccordionPanel, {
    header: renderPanelHeader('Panel 1', activeIndex.includes(0))
  }, React.createElement(Box, {
    pad: "medium",
    background: "light-2",
    style: {
      height: '800px'
    }
  }, React.createElement(Text, null, "Panel 1 contents"), React.createElement(TextInput, null))), React.createElement(AccordionPanel, {
    header: renderPanelHeader('Panel 2', activeIndex.includes(1))
  }, React.createElement(Box, {
    pad: "medium",
    background: "light-2",
    style: {
      height: '50px'
    }
  }, React.createElement(Text, null, "Panel 2 contents"))), React.createElement(AccordionPanel, {
    header: renderPanelHeader('Panel 3', activeIndex.includes(2))
  }, React.createElement(Box, {
    pad: "medium",
    background: "light-2",
    style: {
      height: '300px'
    }
  }, React.createElement(Text, null, "Panel 3 contents")))));
};

storiesOf('Accordion', module).add('Custom Header', function () {
  return React.createElement(CustomHeaderAccordion, null);
});