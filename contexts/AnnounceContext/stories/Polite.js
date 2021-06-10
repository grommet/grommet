"use strict";

exports.__esModule = true;
exports["default"] = exports.Polite = void 0;

var _react = _interopRequireWildcard(require("react"));

var _grommetIcons = require("grommet-icons");

var _themes = require("grommet/themes");

var _grommet = require("grommet");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// used only for the grommet's font
var message = "Thank you for clicking the Announce Button, \nthis announcement is being broadcast on the Button's click.";

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

var Polite = function Polite() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet,
    full: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    justify: "center",
    align: "center",
    background: "brand",
    fill: true
  }, /*#__PURE__*/_react["default"].createElement(PageContent, {
    mode: "polite",
    role: "log"
  })));
};

exports.Polite = Polite;
var _default = {
  title: 'Utilities/AnnounceContext/Polite'
};
exports["default"] = _default;