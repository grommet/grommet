"use strict";

exports.__esModule = true;
exports["default"] = exports.DoubleFooter = void 0;
var _react = _interopRequireDefault(require("react"));
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _grommetIcons = require("grommet-icons");
var _grommet = require("grommet");
var _data = require("./data");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _objectDestructuringEmpty(t) { if (null == t) throw new TypeError("Cannot destructure " + t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var StyledAnchor = (0, _styledComponents["default"])(_grommet.Anchor).withConfig({
  displayName: "DoubleFooterstories__StyledAnchor",
  componentId: "sc-xnt6p7-0"
})(["font-weight:200;"]);
var FooterAnchor = function FooterAnchor(_ref) {
  var rest = _extends({}, (_objectDestructuringEmpty(_ref), _ref));
  return /*#__PURE__*/_react["default"].createElement(StyledAnchor, _extends({
    href: "/",
    size: "small",
    color: "white"
  }, rest));
};
var FooterContent = function FooterContent() {
  return _data.fiveColumns.map(function (item) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      gap: "medium",
      key: item[0]
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      weight: "bold",
      size: "small"
    }, item[0]), /*#__PURE__*/_react["default"].createElement(_grommet.Box, null, [1, 2, 3, 4].map(function (i) {
      return /*#__PURE__*/_react["default"].createElement(FooterAnchor, {
        key: item[i]
      }, item[i]);
    })));
  });
};
var DoubleFooter = exports.DoubleFooter = function DoubleFooter() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, null, /*#__PURE__*/_react["default"].createElement(_grommet.Main, {
      background: "light-4",
      elevation: "large",
      pad: "large",
      border: true
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      margin: "small",
      size: "xsmall"
    }, "Main Content"), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      flex: true
    })), /*#__PURE__*/_react["default"].createElement(_grommet.Footer, {
      background: "dark-1",
      pad: "large",
      title: "Links",
      role: "contentinfo"
    }, /*#__PURE__*/_react["default"].createElement(FooterContent, null)), /*#__PURE__*/_react["default"].createElement(_grommet.Footer, {
      background: "dark-2",
      pad: {
        horizontal: 'large',
        vertical: 'small'
      },
      title: "Copyright",
      role: "none"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      direction: "row",
      gap: "small"
    }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Grommet, {
      color: "brand"
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      alignSelf: "center"
    }, "grommet.io")), /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      textAlign: "center",
      size: "small"
    }, "\xA9 2019 Copyright")))
    // </Grommet>
  );
};
DoubleFooter.storyName = 'Double footer';
var _default = exports["default"] = {
  title: 'Layout/Footer/Double footer'
};