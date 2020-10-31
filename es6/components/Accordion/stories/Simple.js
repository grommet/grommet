function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { Accordion, AccordionPanel, Box, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

var SimpleAccordion = function SimpleAccordion(props) {
  var animate = props.animate,
      multiple = props.multiple,
      rest = _objectWithoutPropertiesLoose(props, ["animate", "multiple"]);

  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, rest, /*#__PURE__*/React.createElement(Accordion, {
    animate: animate,
    multiple: multiple
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
  }, "Panel 3 contents")))));
};

export var Simple = function Simple() {
  return /*#__PURE__*/React.createElement(SimpleAccordion, null);
};
export var DarkNoAnimation = function DarkNoAnimation() {
  return /*#__PURE__*/React.createElement(SimpleAccordion, {
    animate: false,
    background: "dark-2"
  });
};
DarkNoAnimation.story = {
  name: 'Dark no animation',
  parameters: {
    chromatic: {
      disable: true
    }
  }
};
export var Multiple = function Multiple() {
  return /*#__PURE__*/React.createElement(SimpleAccordion, {
    multiple: true
  });
};
Multiple.story = {
  parameters: {
    chromatic: {
      disable: true
    }
  }
};