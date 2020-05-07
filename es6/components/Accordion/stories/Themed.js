import React from 'react';
import { storiesOf } from '@storybook/react';
import { Accordion, AccordionPanel, Box, Grommet } from 'grommet';
import { hpe } from 'grommet-theme-hpe-next';
import { deepMerge } from 'grommet/utils';
var theme = deepMerge(hpe, {
  accordion: {
    border: undefined,
    heading: {
      margin: {
        vertical: 'medium',
        horizontal: 'xsmall'
      }
    },
    hover: {
      color: undefined
    },
    panel: {
      border: {
        side: 'horizontal'
      }
    }
  }
});

var AccordionExample = function AccordionExample() {
  var pad = 'small';
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: theme
  }, /*#__PURE__*/React.createElement(Accordion, {
    pad: "small"
  }, /*#__PURE__*/React.createElement(AccordionPanel, {
    label: "Our Company"
  }, /*#__PURE__*/React.createElement(Box, {
    pad: pad
  }, "We are HPE.")), /*#__PURE__*/React.createElement(AccordionPanel, {
    label: "Our History"
  }, /*#__PURE__*/React.createElement(Box, {
    pad: pad
  }, "At Hewlett Packard Enterprise, we advance the way you live and work by engineering experiences that unlock your full potential.")), /*#__PURE__*/React.createElement(AccordionPanel, {
    label: "Our Purpose"
  }, /*#__PURE__*/React.createElement(Box, {
    pad: pad
  }, "We advance the way you live and work by engineering experiences that unlock your full potential.")), /*#__PURE__*/React.createElement(AccordionPanel, {
    label: "What's New"
  }, /*#__PURE__*/React.createElement(Box, {
    pad: pad
  }, "We make Bold Moves."))));
};

storiesOf('Accordion', module).add('Themed', function () {
  return /*#__PURE__*/React.createElement(AccordionExample, null);
});