"use strict";

exports.__esModule = true;
exports["default"] = exports.Polite = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommetIcons = require("grommet-icons");
var _themes = require("grommet/themes");
var _grommet = require("grommet");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
// used only for the grommet's font

var message = "Thank you for clicking the Announce Button,\nthis announcement is being broadcast on the Button's click.";
var PageContent = function PageContent(_ref) {
  var mode = _ref.mode;
  var announce = (0, _react.useContext)(_grommet.AnnounceContext);
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    gap: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, {
    textAlign: "center"
  }, "Announce can only be \"observed\" via a screen reader. Here's", ' ', /*#__PURE__*/_react["default"].createElement(_grommet.Anchor, {
    label: " how to turn it on",
    href: "https://www.codecademy.com/articles/how-to-setup-screen-reader#:~:text=(OS%20X)%20VoiceOver,Command%2DF5%20turns%20it%20off."
  }), ", hint: Command-F5 on OSX. Clicking the Button below will trigger an announcement."), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    label: "Announce",
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Announce, null),
    a11yTitle: "Announce button",
    reverse: true,
    onClick: function onClick() {
      announce(message, mode);
    }
  }));
};
var Polite = exports.Polite = function Polite() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet,
    full: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    justify: "center",
    align: "center",
    fill: true
  }, /*#__PURE__*/_react["default"].createElement(PageContent, {
    mode: "polite",
    role: "log"
  })));
};
var _default = exports["default"] = {
  title: 'Utilities/AnnounceContext/Polite'
};