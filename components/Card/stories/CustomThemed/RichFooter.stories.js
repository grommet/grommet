"use strict";

exports.__esModule = true;
exports["default"] = exports.RichFooter = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
var _grommetIcons = require("grommet-icons");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _objectDestructuringEmpty(t) { if (null == t) throw new TypeError("Cannot destructure " + t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var theme = {
  global: {
    font: {
      family: "Comic Sans MS, -apple-system,\n         BlinkMacSystemFont, \n         \"Segoe UI\", \n         Roboto"
    }
  },
  card: {
    elevation: 'none',
    background: 'light-2',
    footer: {
      pad: 'medium'
    }
  }
};
var RichFooter = exports.RichFooter = function RichFooter() {
  var _React$useState = _react["default"].useState(false),
    open = _React$useState[0],
    setOpen = _React$useState[1];
  var _React$useState2 = _react["default"].useState(false),
    favorite = _React$useState2[0],
    setFavorite = _React$useState2[1];
  var ExpandButton = function ExpandButton(_ref) {
    var rest = _extends({}, (_objectDestructuringEmpty(_ref), _ref));
    var Icon = open ? _grommetIcons.FormUp : _grommetIcons.FormDown;
    return /*#__PURE__*/_react["default"].createElement(_grommet.Button, _extends({
      hoverIndicator: "light-4",
      icon: /*#__PURE__*/_react["default"].createElement(Icon, {
        color: "brand"
      })
    }, rest));
  };
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: theme
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "medium",
    align: "start"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Card, {
    elevation: "large",
    width: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.CardBody, {
    height: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Image, {
    fit: "cover",
    src: "//v2.grommet.io/assets/IMG_4245.jpg",
    a11yTitle: "bridge"
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: {
      horizontal: 'medium'
    },
    responsive: false
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
    level: "3",
    margin: {
      vertical: 'medium'
    }
  }, "Bridge"), /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, {
    margin: {
      top: 'none'
    }
  }, "A structure carrying a road, path, railroad, or canal across a river, ravine, road, railroad, or other obstacle.")), /*#__PURE__*/_react["default"].createElement(_grommet.CardFooter, null, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row",
    align: "center",
    gap: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Favorite, {
      color: favorite ? 'red' : undefined
    }),
    hoverIndicator: true,
    onClick: function onClick() {
      setFavorite(!favorite);
    }
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.ShareOption, {
      color: "plain"
    }),
    hoverIndicator: true
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Anchor, {
    href: "https://www.collinsdictionary.com/us/dictionary/english/bridge",
    label: "Learn More"
  })), /*#__PURE__*/_react["default"].createElement(ExpandButton, {
    onClick: function onClick() {
      return setOpen(!open);
    }
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Collapsible, {
    open: open
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, {
    margin: "medium",
    color: "dark-3"
  }, "The greatest bridge builders of antiquity were the ancient Romans. The Romans built arch bridges and aqueducts that could stand in conditions that would damage or destroy earlier designs. Some stand today.")))));
};
RichFooter.storyName = 'Rich footer';
var _default = exports["default"] = {
  title: 'Layout/Card/Custom Themed/Rich footer'
};