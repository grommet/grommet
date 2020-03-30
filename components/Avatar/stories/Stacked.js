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
    return _react["default"].createElement(_grommet.Stack, {
      anchor: "left"
    }, _react["default"].createElement(_grommet.Avatar, {
      src: bryan,
      border: border
    }), _react["default"].createElement(_grommet.Avatar, {
      src: eric,
      border: border,
      margin: {
        left: 'medium'
      }
    }), _react["default"].createElement(_grommet.Avatar, {
      src: shimi,
      border: border,
      margin: {
        left: 'large'
      }
    }));
  };

  var GroupedGravatarCentered = function GroupedGravatarCentered() {
    return _react["default"].createElement(_grommet.Stack, {
      anchor: "right",
      margin: {
        left: 'xlarge'
      }
    }, _react["default"].createElement(_grommet.Avatar, {
      src: bryan
    }), _react["default"].createElement(_grommet.Avatar, {
      src: shimi,
      margin: {
        right: 'large'
      }
    }), _react["default"].createElement(_grommet.Avatar, {
      src: eric,
      margin: {
        right: 'medium'
      }
    }));
  };

  var GroupedGravatarRTL = function GroupedGravatarRTL() {
    return _react["default"].createElement(_grommet.Stack, {
      anchor: "right",
      margin: {
        left: 'xlarge'
      }
    }, _react["default"].createElement(_grommet.Avatar, {
      size: "large",
      src: shimi
    }), _react["default"].createElement(_grommet.Avatar, {
      size: "large",
      src: eric,
      margin: {
        right: 'large'
      }
    }), _react["default"].createElement(_grommet.Avatar, {
      size: "large",
      src: bryan,
      margin: {
        right: 'xlarge'
      }
    }));
  };

  var GroupedIcons = function GroupedIcons() {
    return _react["default"].createElement(_grommet.Stack, {
      anchor: "left"
    }, _react["default"].createElement(_grommet.Avatar, {
      background: "accent-1"
    }, _react["default"].createElement(_grommetIcons.UserNew, {
      color: "accent-2"
    })), _react["default"].createElement(_grommet.Avatar, {
      background: "accent-2",
      margin: {
        left: 'medium'
      }
    }, _react["default"].createElement(_grommetIcons.UserFemale, {
      color: "accent-1"
    })), _react["default"].createElement(_grommet.Avatar, {
      background: "accent-4",
      margin: {
        left: 'large'
      }
    }, _react["default"].createElement(_grommetIcons.Favorite, {
      color: "accent-2"
    })));
  };

  return _react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, _react["default"].createElement(_grommet.Box, {
    align: "center",
    gap: "medium",
    pad: "large",
    background: "dark-1"
  }, _react["default"].createElement(_grommet.Stack, {
    anchor: "bottom-right"
  }, _react["default"].createElement(_grommet.Box, null, _react["default"].createElement(_grommet.Box, {
    direction: "row"
  }, _react["default"].createElement(_grommet.Avatar, {
    size: "xlarge",
    src: shimi,
    border: borderSmall
  }), _react["default"].createElement(_grommet.Box, {
    pad: "xxsmall"
  })), _react["default"].createElement(_grommet.Box, {
    pad: "xxsmall"
  })), _react["default"].createElement(_grommet.Avatar, {
    src: eric,
    border: borderSmall
  })), _react["default"].createElement(_grommet.Stack, {
    anchor: "top-right"
  }, _react["default"].createElement(_grommet.Avatar, {
    src: shimi
  }), _react["default"].createElement(_grommet.Box, {
    pad: "xsmall",
    round: true,
    background: "accent-4",
    responsive: false
  })), _react["default"].createElement(GroupedIcons, null), _react["default"].createElement(GroupedGravatar, {
    border: borderSmall
  }), _react["default"].createElement(GroupedGravatarCentered, null), _react["default"].createElement(GroupedGravatarRTL, null)));
};

(0, _react2.storiesOf)('Avatar', module).add('Stacked', function () {
  return _react["default"].createElement(Stacked, null);
});