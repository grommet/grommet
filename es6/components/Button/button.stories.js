function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { storiesOf } from '@storybook/react';
import { Add } from "grommet-icons/es6/icons/Add";
import { Box, Button, Grommet, RoutedButton, Text } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from '../../utils';

var SimpleButton = function SimpleButton(props) {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    align: "center",
    pad: "large"
  }, React.createElement(Button, _extends({
    label: "Submit",
    onClick: function onClick() {}
  }, props))));
};

var IconButton = function IconButton() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    align: "center",
    pad: "large"
  }, React.createElement(Box, {
    round: "full",
    overflow: "hidden",
    background: "neutral-1"
  }, React.createElement(Button, {
    icon: React.createElement(Add, null),
    hoverIndicator: true,
    onClick: function onClick() {}
  }))));
};

var IconLabelButton = function IconLabelButton() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    align: "center",
    pad: "large",
    gap: "small"
  }, React.createElement(Button, {
    icon: React.createElement(Add, null),
    label: "Add",
    onClick: function onClick() {},
    primary: true
  }), React.createElement(Button, {
    icon: React.createElement(Add, null),
    label: "Add",
    onClick: function onClick() {}
  })));
};

var PlainButton = function PlainButton(props) {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    align: "center",
    pad: "large"
  }, React.createElement(Button, _extends({
    hoverIndicator: "light-1",
    onClick: function onClick() {}
  }, props), React.createElement(Box, {
    pad: "small",
    direction: "row",
    align: "center",
    gap: "small"
  }, React.createElement(Add, null), React.createElement(Text, null, "Add")))));
};

var AnchorButton = function AnchorButton() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    align: "center",
    pad: "large"
  }, React.createElement(Button, {
    label: "Go",
    href: "#"
  })));
};

var RouteButton = function RouteButton() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    align: "center",
    pad: "large"
  }, React.createElement(RoutedButton, {
    label: "Go",
    path: "/"
  })));
};

var CustomTagButton = function CustomTagButton() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    align: "center",
    pad: "large"
  }, React.createElement(Button, {
    as: "span",
    label: "Go",
    path: "/"
  })));
};

var customTheme = {
  global: {
    font: {
      family: 'Arial'
    }
  },
  button: {
    border: {
      radius: undefined,
      color: '#2196f3'
    },
    padding: {
      vertical: '12px',
      horizontal: '24px'
    },
    primary: {
      color: '#2196f3'
    },
    extend: function extend(props) {
      var extraStyles = '';

      if (props.primary) {
        extraStyles = "\n          text-transform: uppercase;\n        ";
      }

      return "\n        color: white;\n        font-size: 12px;\n        font-weight: bold;\n\n        " + extraStyles + "\n      ";
    }
  }
};

var CustomThemeButton = function CustomThemeButton() {
  return React.createElement(Grommet, {
    theme: customTheme
  }, React.createElement(Box, {
    align: "center",
    pad: "large"
  }, React.createElement(Button, {
    label: "Submit",
    onClick: function onClick() {},
    primary: true
  })));
};

var MultipleButton = function MultipleButton() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    align: "center",
    pad: "large"
  }, React.createElement(Box, {
    direction: "row",
    align: "center",
    gap: "small",
    pad: "xsmall"
  }, React.createElement(Button, {
    label: "Cancel",
    onClick: function onClick() {}
  }), React.createElement(Button, {
    color: "dark-1",
    primary: true,
    icon: React.createElement(Add, {
      color: "accent-1"
    }),
    label: "Add",
    onClick: function onClick() {}
  })), React.createElement(Box, {
    direction: "row",
    align: "center",
    gap: "small",
    pad: "xsmall"
  }, React.createElement(Button, {
    label: "Cancel",
    onClick: function onClick() {}
  }), React.createElement(Button, {
    color: "dark-1",
    primary: true,
    icon: React.createElement(Add, null),
    label: "Add",
    onClick: function onClick() {}
  })), React.createElement(Box, {
    direction: "row",
    align: "center",
    gap: "small",
    pad: "xsmall"
  }, React.createElement(Button, {
    label: "Cancel",
    onClick: function onClick() {}
  }), React.createElement(Button, {
    primary: true,
    icon: React.createElement(Add, null),
    label: "Add",
    onClick: function onClick() {}
  })), React.createElement(Box, {
    direction: "row",
    align: "center",
    gap: "small",
    pad: "xsmall"
  }, React.createElement(Button, {
    label: "Cancel",
    onClick: function onClick() {}
  }), React.createElement(Button, {
    color: "light-2",
    primary: true,
    icon: React.createElement(Add, null),
    label: "Add",
    onClick: function onClick() {}
  }))));
};

var ColoredButton = function ColoredButton(props) {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    align: "center",
    pad: "large",
    gap: "small"
  }, React.createElement(Button, _extends({
    primary: true,
    color: "dark-1",
    label: "Submit",
    onClick: function onClick() {}
  }, props)), React.createElement(Button, _extends({
    primary: true,
    color: "#111111",
    label: "Submit",
    onClick: function onClick() {}
  }, props)), React.createElement(Button, _extends({
    primary: true,
    color: "#000",
    label: "Submit",
    onClick: function onClick() {}
  }, props))));
};

var customButtonColor = deepMerge(grommet, {
  global: {
    colors: {
      text: {
        light: 'grey',
        dark: 'grey'
      }
    }
  },
  button: {
    color: {
      light: 'white',
      dark: 'white'
    }
  }
});

var ThemeColored = function ThemeColored() {
  return React.createElement(Grommet, {
    theme: customButtonColor
  }, React.createElement(Box, {
    align: "center",
    pad: "large",
    gap: "small"
  }, React.createElement(Button, {
    primary: true,
    label: "Submit",
    onClick: function onClick() {}
  }), React.createElement(Button, {
    primary: true,
    color: "dark-1",
    label: "Submit",
    onClick: function onClick() {}
  })));
};

var SidebarButton = function SidebarButton(_ref) {
  var label = _ref.label,
      onClick = _ref.onClick;
  return React.createElement(Button, {
    plain: true,
    onClick: onClick
  }, function (_ref2) {
    var hover = _ref2.hover;
    return React.createElement(Box, {
      background: hover ? 'accent-1' : undefined,
      pad: {
        horizontal: 'large',
        vertical: 'medium'
      }
    }, React.createElement(Text, {
      size: "large"
    }, label));
  });
};

var SidebarButtons = function SidebarButtons() {
  return React.createElement(Grommet, {
    full: true,
    theme: grommet
  }, React.createElement(Box, {
    fill: true,
    direction: "row"
  }, React.createElement(Box, {
    background: "neutral-1"
  }, React.createElement(SidebarButton, {
    label: "Dashboard",
    onClick: function onClick() {}
  }), React.createElement(SidebarButton, {
    label: "Devices",
    onClick: function onClick() {}
  }), React.createElement(SidebarButton, {
    label: "Settings",
    onClick: function onClick() {}
  }))));
};

storiesOf('Button', module).add('Default', function () {
  return React.createElement(SimpleButton, null);
}).add('Primary', function () {
  return React.createElement(SimpleButton, {
    primary: true
  });
}).add('Icon', function () {
  return React.createElement(IconButton, null);
}).add('Icon Label', function () {
  return React.createElement(IconLabelButton, null);
}).add('Disabled', function () {
  return React.createElement(SimpleButton, {
    disabled: true
  });
}).add('Plain', function () {
  return React.createElement(PlainButton, null);
}).add('Anchor', function () {
  return React.createElement(AnchorButton, null);
}).add('RoutedButton', function () {
  return React.createElement(RouteButton, null);
}).add('Active', function () {
  return React.createElement(PlainButton, {
    active: true
  });
}).add('Custom theme', function () {
  return React.createElement(CustomThemeButton, null);
}).add('Multiple Same Line', function () {
  return React.createElement(MultipleButton, null);
}).add('Colored', function () {
  return React.createElement(ColoredButton, null);
}).add('Theme Colored', function () {
  return React.createElement(ThemeColored, null);
}).add('Custom tag Button', function () {
  return React.createElement(CustomTagButton, null);
}).add('Sidebar', function () {
  return React.createElement(SidebarButtons, null);
});