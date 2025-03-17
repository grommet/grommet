"use strict";

exports.__esModule = true;
exports["default"] = exports.ResponsiveContainer = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _grommetIcons = require("grommet-icons");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
// Some content to show the effects of responsive layout.
// The heading will change size at the small breakpoint
// and the child Text items will switch from row to column
// layout at the small breakpoint.
var Content = function Content(_ref) {
  var title = _ref.title,
    children = _ref.children;
  var size = (0, _react.useContext)(_grommet.ResponsiveContext);
  var theme = (0, _react.useContext)(_grommet.ThemeContext);
  var smallBreakpoint = theme.global.breakpoints.small.value;
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, null, title), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row-responsive",
    gap: {
      column: 'medium',
      row: 'xsmall'
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "I am row-responsive"), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Small breakpoint: ", smallBreakpoint), children, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Current size:\xA0", /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    weight: "bold"
  }, size), ' ')));
};
var App = function App(_ref2) {
  var title = _ref2.title,
    _ref2$responsive = _ref2.responsive,
    responsive = _ref2$responsive === void 0 ? true : _ref2$responsive;
  var widthRef = _react["default"].useRef(undefined);
  var containerRef = _react["default"].useRef(undefined);

  // track the width of the container just so we can display it as it changes
  (0, _react.useEffect)(function () {
    var resizeObserver;
    var element = containerRef.current;
    if (typeof window !== 'undefined' && window.ResizeObserver) {
      resizeObserver = new window.ResizeObserver(function (entries) {
        var entry = entries[0].borderBoxSize[0];
        var width = entry == null ? void 0 : entry.inlineSize;
        if (widthRef.current) {
          widthRef.current.innerText = "Container width: " + width.toFixed() + "px";
        }
      });
      if (element) {
        resizeObserver.observe(containerRef.current);
      }
    } else {
      // fallback for server side rendering
      var _containerRef$current = containerRef.current.getBoundingClientRect(),
        width = _containerRef$current.width;
      if (widthRef.current) {
        widthRef.current.innerText = "Container width: " + width.toFixed() + "px";
      }
    }
    return function () {
      if (resizeObserver && element) {
        resizeObserver.unobserve(element);
      }
    };
  });
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    ref: containerRef,
    gap: "medium",
    flex: "grow",
    responsive: responsive
  }, /*#__PURE__*/_react["default"].createElement(Content, {
    title: title
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    ref: widthRef
  })));
};
var SidePanel = function SidePanel() {
  var _React$useState = _react["default"].useState(true),
    open = _React$useState[0],
    setOpen = _React$useState[1];
  var onToggle = function onToggle() {
    return setOpen(function (prev) {
      return !prev;
    });
  };
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row",
    align: "start"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    icon: open ? /*#__PURE__*/_react["default"].createElement(_grommetIcons.FormNext, null) : /*#__PURE__*/_react["default"].createElement(_grommetIcons.FormPrevious, null),
    onClick: onToggle
  }), open && /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    width: "large",
    border: {
      side: 'left'
    },
    align: "center",
    justify: "center",
    fill: "vertical"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Right hand side")));
};
var ResponsiveContainer = exports.ResponsiveContainer = function ResponsiveContainer() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row",
    height: "100vh",
    width: "100vw",
    overflow: "hidden"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    overflow: "auto",
    fill: "horizontal"
  }, /*#__PURE__*/_react["default"].createElement(App, {
    title: "Responsive to container",
    responsive: "container"
  }), /*#__PURE__*/_react["default"].createElement(App, {
    title: "Responsive to window"
  })), /*#__PURE__*/_react["default"].createElement(SidePanel, null));
};
ResponsiveContainer.storyName = 'Responsive container';
ResponsiveContainer.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = exports["default"] = {
  title: 'Layout/Box/Responsive container'
};