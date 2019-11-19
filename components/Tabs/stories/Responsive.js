"use strict";

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _grommetIcons = require("grommet-icons");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var ResponsiveTabs = function ResponsiveTabs() {
  var _useState = (0, _react.useState)(),
      index = _useState[0],
      setIndex = _useState[1];

  var onActive = function onActive(nextIndex) {
    return setIndex(nextIndex);
  };

  return _react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, _react["default"].createElement(_grommet.Tabs, {
    activeIndex: index,
    onActive: onActive
  }, _react["default"].createElement(_grommet.Tab, {
    title: "Tab 1"
  }, _react["default"].createElement(_grommet.Box, {
    margin: "small",
    pad: "large",
    align: "center",
    background: "accent-1"
  }, _react["default"].createElement(_grommetIcons.Attraction, {
    size: "xlarge"
  }))), _react["default"].createElement(_grommet.Tab, {
    title: "Tab 2"
  }, _react["default"].createElement(_grommet.Box, {
    margin: "small",
    pad: "large",
    align: "center",
    background: "accent-2"
  }, _react["default"].createElement(_grommetIcons.TreeOption, {
    size: "xlarge"
  }))), _react["default"].createElement(_grommet.Tab, {
    title: "Tab 3"
  }, _react["default"].createElement(_grommet.Box, {
    margin: "small",
    pad: "large",
    align: "center",
    background: "accent-3"
  }, _react["default"].createElement(_grommetIcons.Car, {
    size: "xlarge"
  }))), _react["default"].createElement(_grommet.Tab, {
    title: "Tab 4"
  }, _react["default"].createElement(_grommet.Box, {
    margin: "small",
    pad: "large",
    align: "center",
    background: "accent-1"
  }, _react["default"].createElement(_grommetIcons.Attraction, {
    size: "xlarge"
  }))), _react["default"].createElement(_grommet.Tab, {
    title: "Tab 5"
  }, _react["default"].createElement(_grommet.Box, {
    margin: "small",
    pad: "large",
    align: "center",
    background: "accent-2"
  }, _react["default"].createElement(_grommetIcons.TreeOption, {
    size: "xlarge"
  }))), _react["default"].createElement(_grommet.Tab, {
    title: "Tab 6"
  }, _react["default"].createElement(_grommet.Box, {
    margin: "small",
    pad: "large",
    align: "center",
    background: "accent-3"
  }, _react["default"].createElement(_grommetIcons.Car, {
    size: "xlarge"
  }))), _react["default"].createElement(_grommet.Tab, {
    title: "Tab 7"
  }, _react["default"].createElement(_grommet.Box, {
    margin: "small",
    pad: "large",
    align: "center",
    background: "accent-1"
  }, _react["default"].createElement(_grommetIcons.Attraction, {
    size: "xlarge"
  }))), _react["default"].createElement(_grommet.Tab, {
    title: "Tab 8"
  }, _react["default"].createElement(_grommet.Box, {
    margin: "small",
    pad: "large",
    align: "center",
    background: "accent-2"
  }, _react["default"].createElement(_grommetIcons.TreeOption, {
    size: "xlarge"
  }))), _react["default"].createElement(_grommet.Tab, {
    title: "Tab 9"
  }, _react["default"].createElement(_grommet.Box, {
    margin: "small",
    pad: "large",
    align: "center",
    background: "accent-3"
  }, _react["default"].createElement(_grommetIcons.Car, {
    size: "xlarge"
  }))), _react["default"].createElement(_grommet.Tab, {
    title: "Tab 10"
  }, _react["default"].createElement(_grommet.Box, {
    margin: "small",
    pad: "large",
    align: "center",
    background: "accent-1"
  }, _react["default"].createElement(_grommetIcons.Attraction, {
    size: "xlarge"
  }))), _react["default"].createElement(_grommet.Tab, {
    title: "Tab 11"
  }, _react["default"].createElement(_grommet.Box, {
    margin: "small",
    pad: "large",
    align: "center",
    background: "accent-1"
  }, _react["default"].createElement(_grommetIcons.Attraction, {
    size: "xlarge"
  }))), _react["default"].createElement(_grommet.Tab, {
    title: "Tab 12"
  }, _react["default"].createElement(_grommet.Box, {
    margin: "small",
    pad: "large",
    align: "center",
    background: "accent-2"
  }, _react["default"].createElement(_grommetIcons.TreeOption, {
    size: "xlarge"
  }))), _react["default"].createElement(_grommet.Tab, {
    title: "Tab 13"
  }, _react["default"].createElement(_grommet.Box, {
    margin: "small",
    pad: "large",
    align: "center",
    background: "accent-3"
  }, _react["default"].createElement(_grommetIcons.Car, {
    size: "xlarge"
  }))), _react["default"].createElement(_grommet.Tab, {
    title: "Tab 14"
  }, _react["default"].createElement(_grommet.Box, {
    margin: "small",
    pad: "large",
    align: "center",
    background: "accent-1"
  }, _react["default"].createElement(_grommetIcons.Attraction, {
    size: "xlarge"
  }))), _react["default"].createElement(_grommet.Tab, {
    title: "Tab 15"
  }, _react["default"].createElement(_grommet.Box, {
    margin: "small",
    pad: "large",
    align: "center",
    background: "accent-2"
  }, _react["default"].createElement(_grommetIcons.TreeOption, {
    size: "xlarge"
  }))), _react["default"].createElement(_grommet.Tab, {
    title: "Tab 16"
  }, _react["default"].createElement(_grommet.Box, {
    margin: "small",
    pad: "large",
    align: "center",
    background: "accent-3"
  }, _react["default"].createElement(_grommetIcons.Car, {
    size: "xlarge"
  }))), _react["default"].createElement(_grommet.Tab, {
    title: "Tab 17"
  }, _react["default"].createElement(_grommet.Box, {
    margin: "small",
    pad: "large",
    align: "center",
    background: "accent-1"
  }, _react["default"].createElement(_grommetIcons.Attraction, {
    size: "xlarge"
  }))), _react["default"].createElement(_grommet.Tab, {
    title: "Tab 18"
  }, _react["default"].createElement(_grommet.Box, {
    margin: "small",
    pad: "large",
    align: "center",
    background: "accent-2"
  }, _react["default"].createElement(_grommetIcons.TreeOption, {
    size: "xlarge"
  }))), _react["default"].createElement(_grommet.Tab, {
    title: "Tab 19"
  }, _react["default"].createElement(_grommet.Box, {
    margin: "small",
    pad: "large",
    align: "center",
    background: "accent-3"
  }, _react["default"].createElement(_grommetIcons.Car, {
    size: "xlarge"
  }))), _react["default"].createElement(_grommet.Tab, {
    title: "Tab 20"
  }, _react["default"].createElement(_grommet.Box, {
    margin: "small",
    pad: "large",
    align: "center",
    background: "accent-1"
  }, _react["default"].createElement(_grommetIcons.Attraction, {
    size: "xlarge"
  })))));
};

(0, _react2.storiesOf)('Tabs', module).add('Responsive', function () {
  return _react["default"].createElement(ResponsiveTabs, null);
});