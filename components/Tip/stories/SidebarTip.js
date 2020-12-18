"use strict";

exports.__esModule = true;
exports.SidebarTip = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _grommetIcons = require("grommet-icons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var src = '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80';
var customTheme = {
  global: {
    font: {
      family: "-apple-system, BlinkMacSystemFont"
    }
  },
  tip: {
    drop: {
      align: {
        left: 'right'
      }
    },
    content: {
      animation: 'slideRight',
      margin: 'small',
      pad: 'small',
      background: {
        color: 'accent-1',
        opacity: 0.9
      },
      round: {
        size: 'medium',
        corner: 'right'
      },
      flex: false // so Tip won't get cut on a window resize

    }
  }
};

var NotificationAlert = function NotificationAlert() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    alignSelf: "center"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    tip: {
      dropProps: {
        align: {
          left: 'right'
        }
      },
      content: /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
        animation: "jiggle"
      }, "New Analytics!")
    },
    icon: /*#__PURE__*/_react["default"].createElement(_grommet.Stack, {
      anchor: "top-right"
    }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Notification, null), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      background: "accent-1",
      pad: "xsmall",
      round: true,
      responsive: false
    }))
  }));
};

var SidebarHeader = function SidebarHeader() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Avatar, {
    background: "linear-gradient(#6FFFB0 0%, #7D4CDB 100%)",
    border: {
      color: 'white',
      size: 'small'
    },
    round: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Gremlin, {
    color: "white"
  })));
};

var iconsMap = function iconsMap(color) {
  return [/*#__PURE__*/_react["default"].createElement(_grommetIcons.Analytics, {
    color: color
  }), /*#__PURE__*/_react["default"].createElement(_grommetIcons.Stakeholder, {
    color: color
  }), /*#__PURE__*/_react["default"].createElement(_grommetIcons.Calculator, {
    color: color
  })];
};

var SidebarButton = function SidebarButton(_ref) {
  var iconName = _ref.iconName,
      index = _ref.index;
  var hoverColor = {
    color: 'accent-1',
    opacity: 0.9
  };
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: "horizontal"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Tip, {
    content: /*#__PURE__*/_react["default"].createElement(_grommet.Box, null, iconName),
    dropProps: {
      align: {
        left: 'right'
      }
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    hoverIndicator: hoverColor,
    plain: true
  }, function (_ref2) {
    var hover = _ref2.hover;
    return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      pad: {
        vertical: 'small'
      },
      align: "center"
    }, iconsMap(hover ? 'black' : 'white')[index]);
  })));
};

var SidebarTip = function SidebarTip() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: customTheme,
    full: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row",
    height: {
      min: '100%'
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Sidebar, {
    background: "brand",
    header: /*#__PURE__*/_react["default"].createElement(SidebarHeader, null),
    pad: {
      vertical: 'small'
    },
    footer: /*#__PURE__*/_react["default"].createElement(_grommet.Box, null, /*#__PURE__*/_react["default"].createElement(NotificationAlert, null), /*#__PURE__*/_react["default"].createElement(_grommet.Avatar, {
      margin: "small",
      src: src
    }))
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Nav, null, ['Analytics', 'Stakeholder', 'Calculator'].map(function (iconName, index) {
    return /*#__PURE__*/_react["default"].createElement(SidebarButton, {
      key: iconName,
      iconName: iconName,
      index: index
    });
  })))));
};

exports.SidebarTip = SidebarTip;
SidebarTip.story = {
  name: 'Sidebar'
};