"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommetIcons = require("grommet-icons");

var _2 = require("..");

var _themes = require("../../themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SimpleBox = function SimpleBox() {
  return _react.default.createElement(_2.Grommet, {
    theme: _themes.grommet
  }, _react.default.createElement(_2.Box, {
    direction: "row-responsive",
    justify: "center",
    align: "center",
    pad: "xlarge",
    background: "dark-2",
    gap: "medium"
  }, _react.default.createElement(_2.Box, {
    pad: "large",
    align: "center",
    background: {
      color: 'light-2',
      opacity: 'strong'
    },
    round: true,
    gap: "small"
  }, _react.default.createElement(_grommetIcons.Attraction, {
    size: "large"
  }), _react.default.createElement(_2.Text, null, "Party"), _react.default.createElement(_2.Anchor, {
    href: "",
    label: "Link"
  }), _react.default.createElement(_2.Button, {
    label: "Button",
    onClick: function onClick() {}
  })), _react.default.createElement(_2.Box, {
    pad: "large",
    align: "center",
    background: "dark-3",
    round: true,
    gap: "small"
  }, _react.default.createElement(_grommetIcons.Car, {
    size: "large",
    color: "light-2"
  }), _react.default.createElement(_2.Text, null, "Travel"), _react.default.createElement(_2.Anchor, {
    href: "",
    label: "Link"
  }), _react.default.createElement(_2.Button, {
    label: "Button",
    onClick: function onClick() {}
  }))));
};

var CustomColorBox = function CustomColorBox() {
  return _react.default.createElement(_2.Grommet, {
    theme: _themes.grommet
  }, _react.default.createElement(_2.Box, {
    justify: "center",
    align: "center",
    pad: "xlarge",
    background: "linear-gradient(102.77deg, #865ED6 -9.18%, #18BAB9 209.09%)",
    round: "large"
  }, _react.default.createElement(_2.Text, {
    color: "white"
  }, "I have a linear gradient background")));
};

var FixedSizesBox = function FixedSizesBox() {
  return _react.default.createElement(_2.Grommet, {
    theme: _themes.grommet
  }, _react.default.createElement(_2.Box, {
    pad: "small",
    gap: "small"
  }, _react.default.createElement(_2.Box, {
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
      _react.default.createElement(_2.Text, {
        key: i
      }, "Small (" + i + ")")
    );
  })), _react.default.createElement(_2.Box, {
    width: "medium",
    height: "medium",
    round: "small",
    align: "center",
    justify: "center",
    background: "brand"
  }, "Medium"), _react.default.createElement(_2.Box, {
    width: "large",
    height: "large",
    round: "small",
    align: "center",
    justify: "center",
    background: "brand"
  }, "Large")));
};

var BorderBox = function BorderBox() {
  return _react.default.createElement(_2.Grommet, {
    theme: _themes.grommet
  }, _react.default.createElement(_2.Box, {
    pad: "small",
    gap: "small",
    align: "start"
  }, _react.default.createElement(_2.Box, {
    pad: "small",
    border: true
  }, "true"), _react.default.createElement(_2.Box, {
    direction: "row-responsive",
    gap: "small"
  }, ['horizontal', 'vertical', 'left', 'top', 'right', 'bottom'].map(function (border) {
    return _react.default.createElement(_2.Box, {
      key: border,
      pad: "small",
      border: border
    }, border);
  })), _react.default.createElement(_2.Box, {
    pad: "small",
    border: {
      color: 'brand'
    }
  }, "color"), _react.default.createElement(_2.Box, {
    direction: "row-responsive",
    gap: "small",
    align: "start"
  }, ['small', 'medium', 'large'].map(function (size) {
    return _react.default.createElement(_2.Box, {
      key: size,
      pad: "small",
      border: {
        size: size
      }
    }, size);
  })), _react.default.createElement(_2.Box, {
    direction: "row-responsive",
    gap: "small",
    align: "start"
  }, ['solid', 'dashed', 'dotted', 'double', 'groove', 'ridge', 'inset', 'outset'].map(function (type) {
    return _react.default.createElement(_2.Box, {
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
  return _react.default.createElement(_2.Grommet, {
    theme: _themes.grommet
  }, _react.default.createElement(_2.Box, {
    pad: "small",
    gap: "small"
  }, _react.default.createElement(_2.Box, {
    pad: "small",
    background: "brand",
    round: true,
    alignSelf: "start"
  }, "true"), _react.default.createElement(_2.Grid, {
    columns: "small",
    gap: "small"
  }, ['xsmall', 'small', 'medium', 'large', 'xlarge', 'full'].map(function (size) {
    return _react.default.createElement(_2.Box, {
      key: size,
      pad: "large",
      background: "brand",
      round: {
        size: size
      }
    }, size);
  })), _react.default.createElement(_2.Grid, {
    columns: "small",
    gap: "small"
  }, ['left', 'top', 'right', 'bottom', 'top-left', 'top-right', 'bottom-left', 'bottom-right'].map(function (corner) {
    return _react.default.createElement(_2.Box, {
      key: corner,
      pad: "small",
      background: "brand",
      round: {
        corner: corner
      }
    }, corner);
  }), _react.default.createElement(_2.Box, {
    background: "brand",
    pad: "small",
    round: {
      corner: 'left',
      size: '15px'
    }
  }, "left rounded corner px value"))));
};

var BackgroundBox = function BackgroundBox() {
  return _react.default.createElement(_2.Grommet, {
    theme: _themes.grommet
  }, _react.default.createElement(_2.Box, {
    pad: "small",
    gap: "small",
    align: "start"
  }, _react.default.createElement(_2.Box, {
    pad: "small",
    background: {
      color: 'brand',
      opacity: true
    },
    elevation: "large"
  }, "brand opacity"), _react.default.createElement(_2.Box, {
    pad: "small",
    background: "brand",
    elevation: "large"
  }, "brand"), _react.default.createElement(_2.Box, {
    pad: "small",
    background: {
      image: 'url(http://librelogo.org/wp-content/uploads/2014/04/gradient2.png)'
    }
  }, "image"), _react.default.createElement(_2.Box, {
    pad: "small",
    background: {
      color: 'accent-2',
      image: 'url(http://librelogo.org/wp-content/uploads/2014/04/gradient2.png)'
    }
  }, "image + color")));
};

var ElevationBox = function ElevationBox() {
  return _react.default.createElement(_2.Grommet, {
    theme: _themes.grommet
  }, _react.default.createElement(_2.Box, {
    pad: "small",
    align: "start"
  }, _react.default.createElement(_2.Box, {
    pad: "medium",
    background: "dark-1",
    elevation: "medium",
    gap: "medium"
  }, _react.default.createElement(_2.Text, null, "dark on white"), _react.default.createElement(_2.Box, {
    pad: "medium",
    elevation: "medium",
    gap: "medium"
  }, _react.default.createElement(_2.Text, null, "dark on dark"), _react.default.createElement(_2.Box, {
    pad: "medium",
    background: "light-1",
    elevation: "medium",
    gap: "medium"
  }, _react.default.createElement(_2.Text, null, "light on dark"), _react.default.createElement(_2.Box, {
    pad: "medium",
    elevation: "medium"
  }, _react.default.createElement(_2.Text, null, "light on light")))))));
};

(0, _react2.storiesOf)('Box', module).add('Simple Box', function () {
  return _react.default.createElement(SimpleBox, null);
}).add('Custom color', function () {
  return _react.default.createElement(CustomColorBox, null);
}).add('Fixed sizes', function () {
  return _react.default.createElement(FixedSizesBox, null);
}).add('Border', function () {
  return _react.default.createElement(BorderBox, null);
}).add('Round', function () {
  return _react.default.createElement(RoundBox, null);
}).add('Background', function () {
  return _react.default.createElement(BackgroundBox, null);
}).add('Elevation', function () {
  return _react.default.createElement(ElevationBox, null);
});