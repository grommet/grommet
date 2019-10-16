import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { Attraction } from "grommet-icons/es6/icons/Attraction";
import { Car } from "grommet-icons/es6/icons/Car";
import { TreeOption } from "grommet-icons/es6/icons/TreeOption";
import { Box, Grommet, Tab, Tabs } from 'grommet';
import { grommet } from 'grommet/themes';

var ResponsiveTabs = function ResponsiveTabs() {
  var _useState = useState(),
      index = _useState[0],
      setIndex = _useState[1];

  var onActive = function onActive(nextIndex) {
    return setIndex(nextIndex);
  };

  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Tabs, {
    activeIndex: index,
    onActive: onActive
  }, React.createElement(Tab, {
    title: "Tab 1"
  }, React.createElement(Box, {
    margin: "small",
    pad: "large",
    align: "center",
    background: "accent-1"
  }, React.createElement(Attraction, {
    size: "xlarge"
  }))), React.createElement(Tab, {
    title: "Tab 2"
  }, React.createElement(Box, {
    margin: "small",
    pad: "large",
    align: "center",
    background: "accent-2"
  }, React.createElement(TreeOption, {
    size: "xlarge"
  }))), React.createElement(Tab, {
    title: "Tab 3"
  }, React.createElement(Box, {
    margin: "small",
    pad: "large",
    align: "center",
    background: "accent-3"
  }, React.createElement(Car, {
    size: "xlarge"
  }))), React.createElement(Tab, {
    title: "Tab 4"
  }, React.createElement(Box, {
    margin: "small",
    pad: "large",
    align: "center",
    background: "accent-1"
  }, React.createElement(Attraction, {
    size: "xlarge"
  }))), React.createElement(Tab, {
    title: "Tab 5"
  }, React.createElement(Box, {
    margin: "small",
    pad: "large",
    align: "center",
    background: "accent-2"
  }, React.createElement(TreeOption, {
    size: "xlarge"
  }))), React.createElement(Tab, {
    title: "Tab 6"
  }, React.createElement(Box, {
    margin: "small",
    pad: "large",
    align: "center",
    background: "accent-3"
  }, React.createElement(Car, {
    size: "xlarge"
  }))), React.createElement(Tab, {
    title: "Tab 7"
  }, React.createElement(Box, {
    margin: "small",
    pad: "large",
    align: "center",
    background: "accent-1"
  }, React.createElement(Attraction, {
    size: "xlarge"
  }))), React.createElement(Tab, {
    title: "Tab 8"
  }, React.createElement(Box, {
    margin: "small",
    pad: "large",
    align: "center",
    background: "accent-2"
  }, React.createElement(TreeOption, {
    size: "xlarge"
  }))), React.createElement(Tab, {
    title: "Tab 9"
  }, React.createElement(Box, {
    margin: "small",
    pad: "large",
    align: "center",
    background: "accent-3"
  }, React.createElement(Car, {
    size: "xlarge"
  }))), React.createElement(Tab, {
    title: "Tab 10"
  }, React.createElement(Box, {
    margin: "small",
    pad: "large",
    align: "center",
    background: "accent-1"
  }, React.createElement(Attraction, {
    size: "xlarge"
  }))), React.createElement(Tab, {
    title: "Tab 11"
  }, React.createElement(Box, {
    margin: "small",
    pad: "large",
    align: "center",
    background: "accent-1"
  }, React.createElement(Attraction, {
    size: "xlarge"
  }))), React.createElement(Tab, {
    title: "Tab 12"
  }, React.createElement(Box, {
    margin: "small",
    pad: "large",
    align: "center",
    background: "accent-2"
  }, React.createElement(TreeOption, {
    size: "xlarge"
  }))), React.createElement(Tab, {
    title: "Tab 13"
  }, React.createElement(Box, {
    margin: "small",
    pad: "large",
    align: "center",
    background: "accent-3"
  }, React.createElement(Car, {
    size: "xlarge"
  }))), React.createElement(Tab, {
    title: "Tab 14"
  }, React.createElement(Box, {
    margin: "small",
    pad: "large",
    align: "center",
    background: "accent-1"
  }, React.createElement(Attraction, {
    size: "xlarge"
  }))), React.createElement(Tab, {
    title: "Tab 15"
  }, React.createElement(Box, {
    margin: "small",
    pad: "large",
    align: "center",
    background: "accent-2"
  }, React.createElement(TreeOption, {
    size: "xlarge"
  }))), React.createElement(Tab, {
    title: "Tab 16"
  }, React.createElement(Box, {
    margin: "small",
    pad: "large",
    align: "center",
    background: "accent-3"
  }, React.createElement(Car, {
    size: "xlarge"
  }))), React.createElement(Tab, {
    title: "Tab 17"
  }, React.createElement(Box, {
    margin: "small",
    pad: "large",
    align: "center",
    background: "accent-1"
  }, React.createElement(Attraction, {
    size: "xlarge"
  }))), React.createElement(Tab, {
    title: "Tab 18"
  }, React.createElement(Box, {
    margin: "small",
    pad: "large",
    align: "center",
    background: "accent-2"
  }, React.createElement(TreeOption, {
    size: "xlarge"
  }))), React.createElement(Tab, {
    title: "Tab 19"
  }, React.createElement(Box, {
    margin: "small",
    pad: "large",
    align: "center",
    background: "accent-3"
  }, React.createElement(Car, {
    size: "xlarge"
  }))), React.createElement(Tab, {
    title: "Tab 20"
  }, React.createElement(Box, {
    margin: "small",
    pad: "large",
    align: "center",
    background: "accent-1"
  }, React.createElement(Attraction, {
    size: "xlarge"
  })))));
};

storiesOf('Tabs', module).add('Responsive', function () {
  return React.createElement(ResponsiveTabs, null);
});