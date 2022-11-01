import React, { useState } from 'react';
import { Box, Tab, Tabs } from 'grommet';
import { Attraction } from "grommet-icons/es6/icons/Attraction";
import { Car } from "grommet-icons/es6/icons/Car";
import { TreeOption } from "grommet-icons/es6/icons/TreeOption";
var ResponsiveTabs = function ResponsiveTabs() {
  var _useState = useState(),
    index = _useState[0],
    setIndex = _useState[1];
  var onActive = function onActive(nextIndex) {
    return setIndex(nextIndex);
  };
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      align: "center",
      pad: "xlarge"
    }, /*#__PURE__*/React.createElement(Tabs, {
      justify: "start",
      alignControls: "start",
      activeIndex: index,
      onActive: onActive
    }, /*#__PURE__*/React.createElement(Tab, {
      title: "Tab 1"
    }, /*#__PURE__*/React.createElement(Box, {
      margin: "small",
      pad: "large",
      align: "center",
      background: "brand"
    }, /*#__PURE__*/React.createElement(Attraction, {
      size: "xlarge"
    }))), /*#__PURE__*/React.createElement(Tab, {
      title: "Tab 2"
    }, /*#__PURE__*/React.createElement(Box, {
      margin: "small",
      pad: "large",
      align: "center",
      background: "light-4"
    }, /*#__PURE__*/React.createElement(TreeOption, {
      size: "xlarge"
    }))), /*#__PURE__*/React.createElement(Tab, {
      title: "Tab 3"
    }, /*#__PURE__*/React.createElement(Box, {
      margin: "small",
      pad: "large",
      align: "center",
      background: "dark-3"
    }, /*#__PURE__*/React.createElement(Car, {
      size: "xlarge"
    }))), /*#__PURE__*/React.createElement(Tab, {
      title: "Tab 4"
    }, /*#__PURE__*/React.createElement(Box, {
      margin: "small",
      pad: "large",
      align: "center",
      background: "brand"
    }, /*#__PURE__*/React.createElement(Attraction, {
      size: "xlarge"
    }))), /*#__PURE__*/React.createElement(Tab, {
      title: "Tab 5"
    }, /*#__PURE__*/React.createElement(Box, {
      margin: "small",
      pad: "large",
      align: "center",
      background: "light-4"
    }, /*#__PURE__*/React.createElement(TreeOption, {
      size: "xlarge"
    }))), /*#__PURE__*/React.createElement(Tab, {
      title: "Tab 6"
    }, /*#__PURE__*/React.createElement(Box, {
      margin: "small",
      pad: "large",
      align: "center",
      background: "dark-3"
    }, /*#__PURE__*/React.createElement(Car, {
      size: "xlarge"
    }))), /*#__PURE__*/React.createElement(Tab, {
      title: "Tab 7"
    }, /*#__PURE__*/React.createElement(Box, {
      margin: "small",
      pad: "large",
      align: "center",
      background: "brand"
    }, /*#__PURE__*/React.createElement(Attraction, {
      size: "xlarge"
    }))), /*#__PURE__*/React.createElement(Tab, {
      title: "Tab 8"
    }, /*#__PURE__*/React.createElement(Box, {
      margin: "small",
      pad: "large",
      align: "center",
      background: "light-4"
    }, /*#__PURE__*/React.createElement(TreeOption, {
      size: "xlarge"
    }))), /*#__PURE__*/React.createElement(Tab, {
      title: "Tab 9"
    }, /*#__PURE__*/React.createElement(Box, {
      margin: "small",
      pad: "large",
      align: "center",
      background: "dark-3"
    }, /*#__PURE__*/React.createElement(Car, {
      size: "xlarge"
    }))), /*#__PURE__*/React.createElement(Tab, {
      title: "Tab 10"
    }, /*#__PURE__*/React.createElement(Box, {
      margin: "small",
      pad: "large",
      align: "center",
      background: "brand"
    }, /*#__PURE__*/React.createElement(Attraction, {
      size: "xlarge"
    }))), /*#__PURE__*/React.createElement(Tab, {
      title: "Tab 11"
    }, /*#__PURE__*/React.createElement(Box, {
      margin: "small",
      pad: "large",
      align: "center",
      background: "light-4"
    }, /*#__PURE__*/React.createElement(TreeOption, {
      size: "xlarge"
    }))), /*#__PURE__*/React.createElement(Tab, {
      title: "Tab 12"
    }, /*#__PURE__*/React.createElement(Box, {
      margin: "small",
      pad: "large",
      align: "center",
      background: "dark-3"
    }, /*#__PURE__*/React.createElement(Car, {
      size: "xlarge"
    })))))
    // </Grommet>
  );
};

export var Responsive = function Responsive() {
  return /*#__PURE__*/React.createElement(ResponsiveTabs, null);
};
export default {
  title: 'Controls/Tabs/Responsive'
};