"use strict";

exports.__esModule = true;
exports["default"] = exports.Responsive = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _grommetIcons = require("grommet-icons");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
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