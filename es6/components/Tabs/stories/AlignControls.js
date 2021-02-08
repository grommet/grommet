import React from 'react';
import { Attraction } from "grommet-icons/es6/icons/Attraction";
import { Car } from "grommet-icons/es6/icons/Car";
import { TreeOption } from "grommet-icons/es6/icons/TreeOption";
import { Box, Grommet, grommet, Tab, Tabs } from 'grommet';
import { deepMerge } from 'grommet/utils';
var myTheme = deepMerge(grommet, {
  tabs: {
    header: {
      border: {
        side: 'bottom',
        color: 'blue',
        size: 'small'
      }
    }
  },
  tab: {
    border: {
      side: 'bottom',
      color: 'dark-4'
    },
    pad: 'small',
    margin: {
      // bring the overall tabs border behind invidual tab borders
      vertical: '-2px',
      horizontal: 'none'
    }
  }
});

var AlignControlsTabs = function AlignControlsTabs() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: myTheme,
    full: true
  }, /*#__PURE__*/React.createElement(Tabs, {
    justify: "start",
    alignControls: "start"
  }, /*#__PURE__*/React.createElement(Tab, {
    title: "Tab 1"
  }, /*#__PURE__*/React.createElement(Box, {
    fill: true,
    pad: "large",
    align: "center"
  }, /*#__PURE__*/React.createElement(Attraction, {
    size: "xlarge"
  }))), /*#__PURE__*/React.createElement(Tab, {
    title: "Tab 2"
  }, /*#__PURE__*/React.createElement(Box, {
    fill: true,
    pad: "large",
    align: "center"
  }, /*#__PURE__*/React.createElement(TreeOption, {
    size: "xlarge"
  }))), /*#__PURE__*/React.createElement(Tab, {
    title: "Tab 3"
  }, /*#__PURE__*/React.createElement(Box, {
    fill: true,
    pad: "large",
    align: "center"
  }, /*#__PURE__*/React.createElement(Car, {
    size: "xlarge"
  })))));
};

export var AlignControls = function AlignControls() {
  return /*#__PURE__*/React.createElement(AlignControlsTabs, null);
};
AlignControls.storyName = 'Align controls';
export default {
  title: 'Controls/Tabs/Align controls'
};