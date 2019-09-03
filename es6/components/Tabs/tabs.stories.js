import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { css } from 'styled-components';
import { Attraction } from "grommet-icons/es6/icons/Attraction";
import { Car } from "grommet-icons/es6/icons/Car";
import { CircleInformation } from "grommet-icons/es6/icons/CircleInformation";
import { Currency } from "grommet-icons/es6/icons/Currency";
import { TreeOption } from "grommet-icons/es6/icons/TreeOption";
import { Box, Heading, Grommet, FormField, Tab, Tabs, Text, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';

var UncontrolledTabs = function UncontrolledTabs(_ref) {
  var plain = _ref.plain;
  return React.createElement(Grommet, {
    theme: grommet,
    full: true
  }, React.createElement(Box, {
    fill: true
  }, React.createElement(Tabs, {
    flex: true
  }, React.createElement(Tab, {
    plain: plain,
    title: "Tab 1"
  }, React.createElement(Box, {
    fill: true,
    pad: "large",
    align: "center",
    background: "accent-1"
  }, React.createElement(Attraction, {
    size: "xlarge"
  }))), React.createElement(Tab, {
    plain: plain,
    title: "Tab 2"
  }, React.createElement(Box, {
    fill: true,
    pad: "large",
    align: "center",
    background: "accent-2"
  }, React.createElement(TreeOption, {
    size: "xlarge"
  }))), React.createElement(Tab, {
    plain: plain,
    title: "Tab 3"
  }, React.createElement(Box, {
    fill: true,
    pad: "large",
    align: "center",
    background: "accent-3"
  }, React.createElement(Car, {
    size: "xlarge"
  }))))));
};

UncontrolledTabs.defaultProps = {
  plain: false
};
UncontrolledTabs.propTypes = {
  plain: PropTypes.bool
};

var ControlledTabs = function ControlledTabs() {
  var _React$useState = React.useState(),
      index = _React$useState[0],
      setIndex = _React$useState[1];

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
  })))));
};

var ResponsiveTabs = function ResponsiveTabs() {
  var _React$useState2 = React.useState(),
      index = _React$useState2[0],
      setIndex = _React$useState2[1];

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

var RichTabTitle = function RichTabTitle(_ref2) {
  var icon = _ref2.icon,
      label = _ref2.label;
  return React.createElement(Box, {
    direction: "row",
    align: "center",
    gap: "xsmall",
    margin: "xsmall"
  }, icon, React.createElement(Text, {
    size: "small"
  }, React.createElement("strong", null, label)));
};

RichTabTitle.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired
};

var RichTabs = function RichTabs() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Tabs, null, React.createElement(Tab, {
    title: React.createElement(RichTabTitle, {
      icon: React.createElement(CircleInformation, {
        color: "accent-2"
      }),
      label: "Personal Data"
    })
  }, React.createElement(FormField, {
    label: "Name"
  }, React.createElement(TextInput, {
    placeholder: "Enter your name..."
  }))), React.createElement(Tab, {
    title: React.createElement(RichTabTitle, {
      icon: React.createElement(Currency, {
        color: "neutral-2"
      }),
      label: "Payment"
    })
  }, React.createElement(FormField, {
    label: "Card Number"
  }, React.createElement(TextInput, {
    placeholder: "Enter your card number..."
  })))));
};

var customTheme = deepMerge(grommet, {
  global: {
    edgeSize: {
      small: '10px'
    },
    elevation: {
      light: {
        small: '0px 1px 5px rgba(0, 0, 0, 0.50)',
        medium: '0px 3px 8px rgba(0, 0, 0, 0.50)'
      }
    }
  },
  tab: {
    active: {
      background: 'dark-1',
      color: 'accent-1'
    },
    background: 'dark-3',
    border: undefined,
    color: 'white',
    hover: {
      background: 'dark-1'
    },
    margin: undefined,
    pad: {
      bottom: undefined,
      horizontal: 'small'
    },
    extend: function extend(_ref3) {
      var theme = _ref3.theme;
      return css(["border-radius:", ";box-shadow:", ";"], theme.global.control.border.radius, theme.global.elevation.light.small);
    }
  },
  tabs: {
    background: 'dark-3',
    gap: 'medium',
    header: {
      background: 'dark-2',
      extend: function extend(_ref4) {
        var theme = _ref4.theme;
        return css(["padding:", ";box-shadow:", ";"], theme.global.edgeSize.small, theme.global.elevation.light.medium);
      }
    },
    panel: {
      extend: function extend(_ref5) {
        var theme = _ref5.theme;
        return css(["padding:", ";box-shadow:", ";"], theme.global.edgeSize.large, theme.global.elevation.light.medium);
      }
    }
  }
});

var CustomTabs = function CustomTabs() {
  return React.createElement(Grommet, {
    theme: customTheme
  }, React.createElement(Tabs, null, React.createElement(Tab, {
    title: React.createElement(RichTabTitle, {
      icon: React.createElement(CircleInformation, {
        color: "accent-1"
      }),
      label: "Personal Data"
    })
  }, React.createElement(FormField, {
    label: "Name"
  }, React.createElement(TextInput, {
    placeholder: "Enter your name..."
  }))), React.createElement(Tab, {
    title: React.createElement(RichTabTitle, {
      icon: React.createElement(Currency, {
        color: "light-3"
      }),
      label: "Payment"
    })
  }, React.createElement(FormField, {
    label: "Card Number"
  }, React.createElement(TextInput, {
    placeholder: "Enter your card number..."
  }))), React.createElement(Tab, {
    title: "Simple Tab"
  }, "This Tab has a different styling than the RichTabTitle (e.g tab.active.color)")));
};

var ScrollableTabs = function ScrollableTabs() {
  return React.createElement(Grommet, {
    theme: grommet,
    full: true
  }, React.createElement(Box, {
    fill: true
  }, React.createElement(Tabs, {
    flex: true
  }, React.createElement(Tab, {
    title: "Tab 1"
  }, React.createElement(Box, {
    fill: true,
    overflow: "auto",
    pad: "xlarge",
    align: "center",
    background: "accent-1"
  }, React.createElement(Heading, null, "hello!"), React.createElement(Heading, null, "hello!"), React.createElement(Heading, null, "hello!"), React.createElement(Heading, null, "hello!"), React.createElement(Heading, null, "hello!"), React.createElement(Heading, null, "hello!"), React.createElement(Heading, null, "hello!"), React.createElement(Heading, null, "hello!"), React.createElement(Heading, null, "hello!"), React.createElement(Heading, null, "hello!"), React.createElement(Heading, null, "hello!"), React.createElement(Heading, null, "hello!"), React.createElement(Heading, null, "hello!"), React.createElement(Heading, null, "hello!"), React.createElement(Heading, null, "hello!"), React.createElement(Heading, null, "hello!"), React.createElement(Heading, null, "hello!"), React.createElement(Heading, null, "hello!"), React.createElement(Heading, null, "hello!"), React.createElement(Heading, null, "hello!"))), React.createElement(Tab, {
    title: "Tab 2"
  }, React.createElement(Box, {
    margin: "small",
    pad: "large",
    align: "center",
    background: "accent-2"
  }, React.createElement(TreeOption, {
    size: "xlarge"
  }))))));
};

storiesOf('Tabs', module).add('Uncontrolled', function () {
  return React.createElement(UncontrolledTabs, null);
}).add('Controlled', function () {
  return React.createElement(ControlledTabs, null);
}).add('Responsive', function () {
  return React.createElement(ResponsiveTabs, null);
}).add('Rich', function () {
  return React.createElement(RichTabs, null);
}).add('Custom Theme', function () {
  return React.createElement(CustomTabs, null);
}).add('Scrollable', function () {
  return React.createElement(ScrollableTabs, null);
}).add('Plain', function () {
  return React.createElement(UncontrolledTabs, {
    plain: true
  });
});