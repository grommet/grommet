"use strict";

exports.__esModule = true;
exports["default"] = exports.Responsive = void 0;

var _react = _interopRequireWildcard(require("react"));

var _grommetIcons = require("grommet-icons");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var ResponsiveTabs = function ResponsiveTabs() {
  var _useState = (0, _react.useState)(),
      index = _useState[0],
      setIndex = _useState[1];

  var onActive = function onActive(nextIndex) {
    return setIndex(nextIndex);
  };

  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Tabs, {
    activeIndex: index,
    onActive: onActive
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Tab, {
    title: "Tab 1"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    margin: "small",
    pad: "large",
    align: "center",
    background: "accent-1"
  }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Attraction, {
    size: "xlarge"
  }))), /*#__PURE__*/_react["default"].createElement(_grommet.Tab, {
    title: "Tab 2"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    margin: "small",
    pad: "large",
    align: "center",
    background: "accent-2"
  }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.TreeOption, {
    size: "xlarge"
  }))), /*#__PURE__*/_react["default"].createElement(_grommet.Tab, {
    title: "Tab 3"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    margin: "small",
    pad: "large",
    align: "center",
    background: "accent-3"
  }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Car, {
    size: "xlarge"
  }))), /*#__PURE__*/_react["default"].createElement(_grommet.Tab, {
    title: "Tab 4"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    margin: "small",
    pad: "large",
    align: "center",
    background: "accent-1"
  }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Attraction, {
    size: "xlarge"
  }))), /*#__PURE__*/_react["default"].createElement(_grommet.Tab, {
    title: "Tab 5"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    margin: "small",
    pad: "large",
    align: "center",
    background: "accent-2"
  }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.TreeOption, {
    size: "xlarge"
  }))), /*#__PURE__*/_react["default"].createElement(_grommet.Tab, {
    title: "Tab 6"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    margin: "small",
    pad: "large",
    align: "center",
    background: "accent-3"
  }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Car, {
    size: "xlarge"
  }))), /*#__PURE__*/_react["default"].createElement(_grommet.Tab, {
    title: "Tab 7"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    margin: "small",
    pad: "large",
    align: "center",
    background: "accent-1"
  }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Attraction, {
    size: "xlarge"
  }))), /*#__PURE__*/_react["default"].createElement(_grommet.Tab, {
    title: "Tab 8"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    margin: "small",
    pad: "large",
    align: "center",
    background: "accent-2"
  }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.TreeOption, {
    size: "xlarge"
  }))), /*#__PURE__*/_react["default"].createElement(_grommet.Tab, {
    title: "Tab 9"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    margin: "small",
    pad: "large",
    align: "center",
    background: "accent-3"
  }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Car, {
    size: "xlarge"
  }))), /*#__PURE__*/_react["default"].createElement(_grommet.Tab, {
    title: "Tab 10"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    margin: "small",
    pad: "large",
    align: "center",
    background: "accent-1"
  }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Attraction, {
    size: "xlarge"
  }))), /*#__PURE__*/_react["default"].createElement(_grommet.Tab, {
    title: "Tab 11"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    margin: "small",
    pad: "large",
    align: "center",
    background: "accent-1"
  }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Attraction, {
    size: "xlarge"
  }))), /*#__PURE__*/_react["default"].createElement(_grommet.Tab, {
    title: "Tab 12"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    margin: "small",
    pad: "large",
    align: "center",
    background: "accent-2"
  }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.TreeOption, {
    size: "xlarge"
  }))), /*#__PURE__*/_react["default"].createElement(_grommet.Tab, {
    title: "Tab 13"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    margin: "small",
    pad: "large",
    align: "center",
    background: "accent-3"
  }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Car, {
    size: "xlarge"
  }))), /*#__PURE__*/_react["default"].createElement(_grommet.Tab, {
    title: "Tab 14"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    margin: "small",
    pad: "large",
    align: "center",
    background: "accent-1"
  }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Attraction, {
    size: "xlarge"
  }))), /*#__PURE__*/_react["default"].createElement(_grommet.Tab, {
    title: "Tab 15"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    margin: "small",
    pad: "large",
    align: "center",
    background: "accent-2"
  }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.TreeOption, {
    size: "xlarge"
  }))), /*#__PURE__*/_react["default"].createElement(_grommet.Tab, {
    title: "Tab 16"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    margin: "small",
    pad: "large",
    align: "center",
    background: "accent-3"
  }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Car, {
    size: "xlarge"
  }))), /*#__PURE__*/_react["default"].createElement(_grommet.Tab, {
    title: "Tab 17"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    margin: "small",
    pad: "large",
    align: "center",
    background: "accent-1"
  }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Attraction, {
    size: "xlarge"
  }))), /*#__PURE__*/_react["default"].createElement(_grommet.Tab, {
    title: "Tab 18"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    margin: "small",
    pad: "large",
    align: "center",
    background: "accent-2"
  }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.TreeOption, {
    size: "xlarge"
  }))), /*#__PURE__*/_react["default"].createElement(_grommet.Tab, {
    title: "Tab 19"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    margin: "small",
    pad: "large",
    align: "center",
    background: "accent-3"
  }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Car, {
    size: "xlarge"
  }))), /*#__PURE__*/_react["default"].createElement(_grommet.Tab, {
    title: "Tab 20"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    margin: "small",
    pad: "large",
    align: "center",
    background: "accent-1"
  }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Attraction, {
    size: "xlarge"
  })))));
};

var Responsive = function Responsive() {
  return /*#__PURE__*/_react["default"].createElement(ResponsiveTabs, null);
};

exports.Responsive = Responsive;
var _default = {
  title: 'Controls/Tabs/Responsive'
};
exports["default"] = _default;