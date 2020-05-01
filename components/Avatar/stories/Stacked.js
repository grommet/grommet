"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommetIcons = require("grommet-icons");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Stacked = function Stacked() {
  var shimi = '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80';
  var eric = '//s.gravatar.com/avatar/99020cae7ff399a4fbea19c0634f77c3?s=80';
  var bryan = '//s.gravatar.com/avatar/10d15019166606cfed23846a7f902660?s=80';
  var borderSmall = {
    color: 'white',
    size: 'small'
  };

  var GroupedGravatar = function GroupedGravatar(_ref) {
    var border = _ref.border;
    return /*#__PURE__*/_react["default"].createElement(_grommet.Stack, {
      anchor: "left"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Avatar, {
      src: bryan,
      border: border
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Avatar, {
      src: eric,
      border: border,
      margin: {
        left: 'medium'
      }
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Avatar, {
      src: shimi,
      border: border,
      margin: {
        left: 'large'
      }
    }));
  };

  var GroupedGravatarCentered = function GroupedGravatarCentered() {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Stack, {
      anchor: "right",
      margin: {
        left: 'xlarge'
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Avatar, {
      src: bryan
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Avatar, {
      src: shimi,
      margin: {
        right: 'large'
      }
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Avatar, {
      src: eric,
      margin: {
        right: 'medium'
      }
    }));
  };

  var GroupedGravatarRTL = function GroupedGravatarRTL() {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Stack, {
      anchor: "right",
      margin: {
        left: 'xlarge'
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Avatar, {
      size: "large",
      src: shimi
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Avatar, {
      size: "large",
      src: eric,
      margin: {
        right: 'large'
      }
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Avatar, {
      size: "large",
      src: bryan,
      margin: {
        right: 'xlarge'
      }
    }));
  };

  var GroupedIcons = function GroupedIcons() {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Stack, {
      anchor: "left"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Avatar, {
      background: "accent-1"
    }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.UserNew, {
      color: "accent-2"
    })), /*#__PURE__*/_react["default"].createElement(_grommet.Avatar, {
      background: "accent-2",
      margin: {
        left: 'medium'
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.UserFemale, {
      color: "accent-1"
    })), /*#__PURE__*/_react["default"].createElement(_grommet.Avatar, {
      background: "accent-4",
      margin: {
        left: 'large'
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Favorite, {
      color: "accent-2"
    })));
  };

  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    gap: "medium",
    pad: "large",
    background: "dark-1"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Stack, {
    anchor: "bottom-right"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, null, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Avatar, {
    size: "xlarge",
    src: shimi,
    border: borderSmall
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "xxsmall"
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "xxsmall"
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Avatar, {
    src: eric,
    border: borderSmall
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Stack, {
    anchor: "top-right"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Avatar, {
    src: shimi
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "xsmall",
    round: true,
    background: "accent-4",
    responsive: false
  })), /*#__PURE__*/_react["default"].createElement(GroupedIcons, null), /*#__PURE__*/_react["default"].createElement(GroupedGravatar, {
    border: borderSmall
  }), /*#__PURE__*/_react["default"].createElement(GroupedGravatarCentered, null), /*#__PURE__*/_react["default"].createElement(GroupedGravatarRTL, null)));
};

(0, _react2.storiesOf)('Avatar', module).add('Stacked', function () {
  return /*#__PURE__*/_react["default"].createElement(Stacked, null);
});