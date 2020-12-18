"use strict";

exports.__esModule = true;
exports.RichFooter = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _grommetIcons = require("grommet-icons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

var RichFooter = function RichFooter() {
  var _React$useState = _react["default"].useState(false),
      open = _React$useState[0],
      setOpen = _React$useState[1];

  var _React$useState2 = _react["default"].useState(false),
      favorite = _React$useState2[0],
      setFavorite = _React$useState2[1];

  var ExpandButton = function ExpandButton(_ref) {
    var rest = _extends({}, _ref);

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

exports.RichFooter = RichFooter;
RichFooter.story = {
  name: 'Rich footer'
};