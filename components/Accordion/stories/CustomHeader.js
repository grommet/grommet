"use strict";

exports.__esModule = true;
exports["default"] = exports.Header = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var renderPanelHeader = function renderPanelHeader(title, active) {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row",
    align: "center",
    pad: "medium",
    gap: "small"
  }, /*#__PURE__*/_react["default"].createElement("strong", null, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, title)), /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    color: "brand"
  }, active ? '-' : '+'));
};
var CustomHeaderAccordion = function CustomHeaderAccordion() {
  var _useState = (0, _react.useState)([0]),
    activeIndex = _useState[0],
    setActiveIndex = _useState[1];
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Accordion, {
      activeIndex: activeIndex,
      onActive: function onActive(newActiveIndex) {
        return setActiveIndex(newActiveIndex);
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommet.AccordionPanel, {
      header: renderPanelHeader('Panel 1', activeIndex.includes(0))
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      pad: "medium",
      background: "light-2",
      style: {
        height: '800px'
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Panel 1 contents"), /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
      a11yTitle: "panel 1 text box"
    }))), /*#__PURE__*/_react["default"].createElement(_grommet.AccordionPanel, {
      header: renderPanelHeader('Panel 2', activeIndex.includes(1))
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      pad: "medium",
      background: "light-2",
      style: {
        height: '50px'
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Panel 2 contents"))), /*#__PURE__*/_react["default"].createElement(_grommet.AccordionPanel, {
      header: renderPanelHeader('Panel 3', activeIndex.includes(2))
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      pad: "medium",
      background: "light-2",
      style: {
        height: '300px'
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Panel 3 contents"))))
    // </Grommet>
  );
};

var Header = exports.Header = function Header() {
  return /*#__PURE__*/_react["default"].createElement(CustomHeaderAccordion, null);
};
var _default = exports["default"] = {
  title: 'Controls/Accordion/Header'
};