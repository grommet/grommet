import React from 'react';
import { Avatar, Button, Box, Grommet, Nav, Sidebar, Stack, Tip } from 'grommet';
import { Analytics } from "grommet-icons/es6/icons/Analytics";
import { Calculator } from "grommet-icons/es6/icons/Calculator";
import { Gremlin } from "grommet-icons/es6/icons/Gremlin";
import { Notification } from "grommet-icons/es6/icons/Notification";
import { Stakeholder } from "grommet-icons/es6/icons/Stakeholder";
var src = '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80';
var customTheme = {
  global: {
    font: {
      family: "-apple-system, BlinkMacSystemFont"
    }
  },
  tip: {
    drop: {
      align: {
        left: 'right'
      }
    },
    content: {
      animation: 'slideRight',
      margin: 'small',
      pad: 'small',
      background: {
        color: 'accent-1',
        opacity: 0.9
      },
      round: {
        size: 'medium',
        corner: 'right'
      },
      flex: false // so Tip won't get cut on a window resize

    }
  }
};

var NotificationAlert = function NotificationAlert() {
  return /*#__PURE__*/React.createElement(Box, {
    alignSelf: "center"
  }, /*#__PURE__*/React.createElement(Button, {
    tip: {
      dropProps: {
        align: {
          left: 'right'
        }
      },
      content: /*#__PURE__*/React.createElement(Box, {
        animation: "jiggle"
      }, "New Analytics!")
    },
    icon: /*#__PURE__*/React.createElement(Stack, {
      anchor: "top-right"
    }, /*#__PURE__*/React.createElement(Notification, null), /*#__PURE__*/React.createElement(Box, {
      background: "accent-1",
      pad: "xsmall",
      round: true,
      responsive: false
    }))
  }));
};

var SidebarHeader = function SidebarHeader() {
  return /*#__PURE__*/React.createElement(Box, {
    pad: "small"
  }, /*#__PURE__*/React.createElement(Avatar, {
    background: "linear-gradient(#6FFFB0 0%, #7D4CDB 100%)",
    border: {
      color: 'white',
      size: 'small'
    },
    round: "medium"
  }, /*#__PURE__*/React.createElement(Gremlin, {
    color: "white"
  })));
};

var iconsMap = function iconsMap(color) {
  return [/*#__PURE__*/React.createElement(Analytics, {
    color: color
  }), /*#__PURE__*/React.createElement(Stakeholder, {
    color: color
  }), /*#__PURE__*/React.createElement(Calculator, {
    color: color
  })];
};

var SidebarButton = function SidebarButton(_ref) {
  var iconName = _ref.iconName,
      index = _ref.index;
  var hoverColor = {
    color: 'accent-1',
    opacity: 0.9
  };
  return /*#__PURE__*/React.createElement(Box, {
    fill: "horizontal"
  }, /*#__PURE__*/React.createElement(Tip, {
    content: /*#__PURE__*/React.createElement(Box, null, iconName),
    dropProps: {
      align: {
        left: 'right'
      }
    }
  }, /*#__PURE__*/React.createElement(Button, {
    hoverIndicator: hoverColor,
    plain: true
  }, function (_ref2) {
    var hover = _ref2.hover;
    return /*#__PURE__*/React.createElement(Box, {
      pad: {
        vertical: 'small'
      },
      align: "center"
    }, iconsMap(hover ? 'black' : 'white')[index]);
  })));
};

export var SidebarTip = function SidebarTip() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: customTheme,
    full: true
  }, /*#__PURE__*/React.createElement(Box, {
    direction: "row",
    height: {
      min: '100%'
    }
  }, /*#__PURE__*/React.createElement(Sidebar, {
    background: "brand",
    header: /*#__PURE__*/React.createElement(SidebarHeader, null),
    pad: {
      vertical: 'small'
    },
    footer: /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(NotificationAlert, null), /*#__PURE__*/React.createElement(Avatar, {
      margin: "small",
      src: src
    }))
  }, /*#__PURE__*/React.createElement(Nav, null, ['Analytics', 'Stakeholder', 'Calculator'].map(function (iconName, index) {
    return /*#__PURE__*/React.createElement(SidebarButton, {
      key: iconName,
      iconName: iconName,
      index: index
    });
  })))));
};
SidebarTip.story = {
  name: 'Sidebar'
};