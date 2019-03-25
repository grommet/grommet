import React from 'react';
import { storiesOf } from '@storybook/react';
import { Attraction } from "grommet-icons/es6/icons/Attraction";
import { Car } from "grommet-icons/es6/icons/Car";
import { Grommet, Anchor, Box, Button, Grid, Text } from '..';
import { grommet } from '../../themes';

var SimpleBox = function SimpleBox() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    direction: "row-responsive",
    justify: "center",
    align: "center",
    pad: "xlarge",
    background: "dark-2",
    gap: "medium"
  }, React.createElement(Box, {
    pad: "large",
    align: "center",
    background: {
      color: 'light-2',
      opacity: 'strong'
    },
    round: true,
    gap: "small"
  }, React.createElement(Attraction, {
    size: "large"
  }), React.createElement(Text, null, "Party"), React.createElement(Anchor, {
    href: "",
    label: "Link"
  }), React.createElement(Button, {
    label: "Button",
    onClick: function onClick() {}
  })), React.createElement(Box, {
    pad: "large",
    align: "center",
    background: "dark-3",
    round: true,
    gap: "small"
  }, React.createElement(Car, {
    size: "large",
    color: "light-2"
  }), React.createElement(Text, null, "Travel"), React.createElement(Anchor, {
    href: "",
    label: "Link"
  }), React.createElement(Button, {
    label: "Button",
    onClick: function onClick() {}
  }))));
};

var CustomColorBox = function CustomColorBox() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    justify: "center",
    align: "center",
    pad: "xlarge",
    background: "linear-gradient(102.77deg, #865ED6 -9.18%, #18BAB9 209.09%)",
    round: "large"
  }, React.createElement(Text, {
    color: "white"
  }, "I have a linear gradient background")));
};

var FixedSizesBox = function FixedSizesBox() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    pad: "small",
    gap: "small"
  }, React.createElement(Box, {
    width: "small",
    height: "small",
    round: "small",
    align: "center",
    justify: "center",
    background: "brand",
    overflow: {
      horizontal: 'hidden',
      vertical: 'scroll'
    }
  }, Array(20).fill().map(function (_, i) {
    return (// eslint-disable-next-line react/no-array-index-key
      React.createElement(Text, {
        key: i
      }, "Small (" + i + ")")
    );
  })), React.createElement(Box, {
    width: "medium",
    height: "medium",
    round: "small",
    align: "center",
    justify: "center",
    background: "brand"
  }, "Medium"), React.createElement(Box, {
    width: "large",
    height: "large",
    round: "small",
    align: "center",
    justify: "center",
    background: "brand"
  }, "Large")));
};

var BorderBox = function BorderBox() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    pad: "small",
    gap: "small",
    align: "start"
  }, React.createElement(Box, {
    pad: "small",
    border: true
  }, "true"), React.createElement(Box, {
    direction: "row-responsive",
    gap: "small"
  }, ['horizontal', 'vertical', 'left', 'top', 'right', 'bottom'].map(function (border) {
    return React.createElement(Box, {
      key: border,
      pad: "small",
      border: border
    }, border);
  })), React.createElement(Box, {
    pad: "small",
    border: {
      color: 'brand'
    }
  }, "color"), React.createElement(Box, {
    direction: "row-responsive",
    gap: "small",
    align: "start"
  }, ['small', 'medium', 'large'].map(function (size) {
    return React.createElement(Box, {
      key: size,
      pad: "small",
      border: {
        size: size
      }
    }, size);
  })), React.createElement(Box, {
    direction: "row-responsive",
    gap: "small",
    align: "start"
  }, ['solid', 'dashed', 'dotted', 'double', 'groove', 'ridge', 'inset', 'outset'].map(function (type) {
    return React.createElement(Box, {
      key: type,
      pad: "small",
      border: {
        size: 'medium',
        style: type
      }
    }, type);
  }))));
};

var RoundBox = function RoundBox() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    pad: "small",
    gap: "small"
  }, React.createElement(Box, {
    pad: "small",
    background: "brand",
    round: true,
    alignSelf: "start"
  }, "true"), React.createElement(Grid, {
    columns: "small",
    gap: "small"
  }, ['xsmall', 'small', 'medium', 'large', 'xlarge', 'full'].map(function (size) {
    return React.createElement(Box, {
      key: size,
      pad: "large",
      background: "brand",
      round: {
        size: size
      }
    }, size);
  })), React.createElement(Grid, {
    columns: "small",
    gap: "small"
  }, ['left', 'top', 'right', 'bottom', 'top-left', 'top-right', 'bottom-left', 'bottom-right'].map(function (corner) {
    return React.createElement(Box, {
      key: corner,
      pad: "small",
      background: "brand",
      round: {
        corner: corner
      }
    }, corner);
  }), React.createElement(Box, {
    background: "brand",
    pad: "small",
    round: {
      corner: 'left',
      size: '15px'
    }
  }, "left rounded corner px value"))));
};

var BackgroundBox = function BackgroundBox() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    pad: "small",
    gap: "small",
    align: "start"
  }, React.createElement(Box, {
    pad: "small",
    background: {
      color: 'brand',
      opacity: true
    },
    elevation: "large"
  }, "brand opacity"), React.createElement(Box, {
    pad: "small",
    background: "brand",
    elevation: "large"
  }, "brand"), React.createElement(Box, {
    pad: "small",
    background: {
      image: 'url(http://librelogo.org/wp-content/uploads/2014/04/gradient2.png)'
    }
  }, "image"), React.createElement(Box, {
    pad: "small",
    background: {
      color: 'accent-2',
      image: 'url(http://librelogo.org/wp-content/uploads/2014/04/gradient2.png)'
    }
  }, "image + color")));
};

var ElevationBox = function ElevationBox() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    pad: "small",
    align: "start"
  }, React.createElement(Box, {
    pad: "medium",
    background: "dark-1",
    elevation: "medium",
    gap: "medium"
  }, React.createElement(Text, null, "dark on white"), React.createElement(Box, {
    pad: "medium",
    elevation: "medium",
    gap: "medium"
  }, React.createElement(Text, null, "dark on dark"), React.createElement(Box, {
    pad: "medium",
    background: "light-1",
    elevation: "medium",
    gap: "medium"
  }, React.createElement(Text, null, "light on dark"), React.createElement(Box, {
    pad: "medium",
    elevation: "medium"
  }, React.createElement(Text, null, "light on light")))))));
};

storiesOf('Box', module).add('Simple Box', function () {
  return React.createElement(SimpleBox, null);
}).add('Custom color', function () {
  return React.createElement(CustomColorBox, null);
}).add('Fixed sizes', function () {
  return React.createElement(FixedSizesBox, null);
}).add('Border', function () {
  return React.createElement(BorderBox, null);
}).add('Round', function () {
  return React.createElement(RoundBox, null);
}).add('Background', function () {
  return React.createElement(BackgroundBox, null);
}).add('Elevation', function () {
  return React.createElement(ElevationBox, null);
});