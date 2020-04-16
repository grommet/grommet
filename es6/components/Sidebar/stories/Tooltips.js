import React, { useRef, useState } from 'react';
import { storiesOf } from '@storybook/react';
import { Avatar, Button, Box, Drop, grommet, Grommet, Nav, Stack } from 'grommet';
import { Analytics } from "grommet-icons/es6/icons/Analytics";
import { Calculator } from "grommet-icons/es6/icons/Calculator";
import { Gremlin } from "grommet-icons/es6/icons/Gremlin";
import { Notification } from "grommet-icons/es6/icons/Notification";
import { Stakeholder } from "grommet-icons/es6/icons/Stakeholder";
import { Sidebar } from '../Sidebar';
var src = '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80';

var NotificationIcon = function NotificationIcon() {
  return React.createElement(Stack, {
    anchor: "top-right"
  }, React.createElement(Notification, null), React.createElement(Box, {
    background: "accent-1",
    pad: "xsmall",
    round: true,
    responsive: false
  }));
};

var NotificationAlert = function NotificationAlert() {
  var ref = useRef();

  var _useState = useState(),
      over = _useState[0],
      setOver = _useState[1];

  return React.createElement(Box, {
    alignSelf: "center"
  }, React.createElement(Button, {
    onFocus: function onFocus() {
      return setOver(true);
    },
    onBlur: function onBlur() {
      return setOver(false);
    },
    onMouseOver: function onMouseOver() {
      return setOver(true);
    },
    onMouseOut: function onMouseOut() {
      return setOver(false);
    },
    icon: React.createElement(NotificationIcon, null),
    ref: ref
  }), ref.current && over && React.createElement(Drop, {
    align: {
      left: 'right'
    },
    plain: true,
    target: ref.current
  }, React.createElement(Box, {
    animation: "jiggle",
    background: "accent-1",
    round: {
      corner: 'left'
    },
    pad: "small",
    margin: {
      vertical: 'large'
    }
  }, "New Analytics!")));
};

var SidebarFooter = function SidebarFooter() {
  return React.createElement(Box, null, React.createElement(NotificationAlert, null), React.createElement(Avatar, {
    margin: "small",
    src: src
  }));
};

var SidebarHeader = function SidebarHeader() {
  return React.createElement(Box, {
    pad: "small"
  }, React.createElement(Avatar, {
    background: "linear-gradient(#6FFFB0 0%, #7D4CDB 100%)",
    border: {
      color: 'white',
      size: 'small'
    },
    round: "medium"
  }, React.createElement(Gremlin, {
    color: "white"
  })));
};

var iconsMap = function iconsMap(color) {
  return [React.createElement(Analytics, {
    color: color
  }), React.createElement(Stakeholder, {
    color: color
  }), React.createElement(Calculator, {
    color: color
  })];
};

var SidebarButton = function SidebarButton(_ref) {
  var iconName = _ref.iconName,
      index = _ref.index;

  var _useState2 = useState(),
      over = _useState2[0],
      setOver = _useState2[1];

  var tooltipColor = {
    color: 'accent-1',
    opacity: 0.9
  };
  var ref = useRef();
  return React.createElement(Box, {
    fill: "horizontal"
  }, React.createElement(Button, {
    ref: ref,
    onMouseOver: function onMouseOver() {
      return setOver(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setOver(false);
    },
    onFocus: function onFocus() {
      return setOver(false);
    },
    onBlur: function onBlur() {
      return setOver(false);
    },
    hoverIndicator: tooltipColor,
    plain: true
  }, function (_ref2) {
    var hover = _ref2.hover;
    return React.createElement(Box, {
      pad: {
        vertical: 'small'
      },
      align: "center"
    }, iconsMap(hover ? 'black' : 'white')[index]);
  }), ref.current && over && React.createElement(Drop, {
    align: {
      left: 'right'
    },
    target: ref.current,
    plain: true
  }, React.createElement(Box, {
    animation: "slideRight",
    margin: "xsmall",
    pad: "small",
    background: tooltipColor,
    round: {
      size: 'medium',
      corner: 'right'
    }
  }, iconName)));
};

export var TooltipsSidebar = function TooltipsSidebar() {
  return React.createElement(Grommet, {
    theme: grommet,
    full: true
  }, React.createElement(Box, {
    direction: "row",
    height: {
      min: '100%'
    }
  }, React.createElement(Sidebar, {
    overflow: "auto",
    background: "brand",
    header: React.createElement(SidebarHeader, null),
    footer: React.createElement(SidebarFooter, null),
    pad: "none"
  }, React.createElement(Nav, null, ['Analytics', 'Stakeholder', 'Calculator'].map(function (iconName, index) {
    return React.createElement(SidebarButton, {
      key: iconName,
      iconName: iconName,
      index: index
    });
  })))));
};
storiesOf('Sidebar', module).add('Tooltips', function () {
  return React.createElement(TooltipsSidebar, null);
});