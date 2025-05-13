"use strict";

exports.__esModule = true;
exports["default"] = exports.Polite = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommetIcons = require("grommet-icons");
var _themes = require("grommet/themes");
var _grommet = require("grommet");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
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