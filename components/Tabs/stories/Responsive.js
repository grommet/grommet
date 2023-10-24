"use strict";

exports.__esModule = true;
exports["default"] = exports.Responsive = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _grommetIcons = require("grommet-icons");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var ResponsiveTabs = function ResponsiveTabs() {
  var _useState = (0, _react.useState)(),
    index = _useState[0],
    setIndex = _useState[1];
  var onActive = function onActive(nextIndex) {
    return setIndex(nextIndex);
  };
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      align: "center",
      pad: "xlarge"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Tabs, {
      justify: "start",
      alignControls: "start",
      activeIndex: index,
      onActive: onActive
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Tab, {
      title: "Tab 1"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      margin: "small",
      pad: "large",
      align: "center",
      background: "brand"
    }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Attraction, {
      size: "xlarge"
    }))), /*#__PURE__*/_react["default"].createElement(_grommet.Tab, {
      title: "Tab 2"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      margin: "small",
      pad: "large",
      align: "center",
      background: "light-4"
    }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.TreeOption, {
      size: "xlarge"
    }))), /*#__PURE__*/_react["default"].createElement(_grommet.Tab, {
      title: "Tab 3"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      margin: "small",
      pad: "large",
      align: "center",
      background: "dark-3"
    }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Car, {
      size: "xlarge"
    }))), /*#__PURE__*/_react["default"].createElement(_grommet.Tab, {
      title: "Tab 4"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      margin: "small",
      pad: "large",
      align: "center",
      background: "brand"
    }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Attraction, {
      size: "xlarge"
    }))), /*#__PURE__*/_react["default"].createElement(_grommet.Tab, {
      title: "Tab 5"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      margin: "small",
      pad: "large",
      align: "center",
      background: "light-4"
    }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.TreeOption, {
      size: "xlarge"
    }))), /*#__PURE__*/_react["default"].createElement(_grommet.Tab, {
      title: "Tab 6"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      margin: "small",
      pad: "large",
      align: "center",
      background: "dark-3"
    }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Car, {
      size: "xlarge"
    }))), /*#__PURE__*/_react["default"].createElement(_grommet.Tab, {
      title: "Tab 7"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      margin: "small",
      pad: "large",
      align: "center",
      background: "brand"
    }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Attraction, {
      size: "xlarge"
    }))), /*#__PURE__*/_react["default"].createElement(_grommet.Tab, {
      title: "Tab 8"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      margin: "small",
      pad: "large",
      align: "center",
      background: "light-4"
    }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.TreeOption, {
      size: "xlarge"
    }))), /*#__PURE__*/_react["default"].createElement(_grommet.Tab, {
      title: "Tab 9"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      margin: "small",
      pad: "large",
      align: "center",
      background: "dark-3"
    }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Car, {
      size: "xlarge"
    }))), /*#__PURE__*/_react["default"].createElement(_grommet.Tab, {
      title: "Tab 10"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      margin: "small",
      pad: "large",
      align: "center",
      background: "brand"
    }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Attraction, {
      size: "xlarge"
    }))), /*#__PURE__*/_react["default"].createElement(_grommet.Tab, {
      title: "Tab 11"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      margin: "small",
      pad: "large",
      align: "center",
      background: "light-4"
    }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.TreeOption, {
      size: "xlarge"
    }))), /*#__PURE__*/_react["default"].createElement(_grommet.Tab, {
      title: "Tab 12"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      margin: "small",
      pad: "large",
      align: "center",
      background: "dark-3"
    }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Car, {
      size: "xlarge"
    })))))
    // </Grommet>
  );
};

var Responsive = exports.Responsive = function Responsive() {
  return /*#__PURE__*/_react["default"].createElement(ResponsiveTabs, null);
};
var _default = exports["default"] = {
  title: 'Controls/Tabs/Responsive'
};