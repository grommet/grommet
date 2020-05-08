"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommetIcons = require("grommet-icons");

var _grommet = require("grommet");

var _utils = require("grommet/utils");

var _grommetThemeHpe = require("grommet-theme-hpe");

var _grommetThemeHpeNext = require("grommet-theme-hpe-next");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var nextHpeNext = (0, _utils.deepMerge)(_grommetThemeHpeNext.hpe, {
  global: {
    colors: {
      control: 'green'
    }
  },
  button: {
    "default": {
      color: 'text',
      border: undefined,
      padding: {
        horizontal: '12px',
        vertical: '6px'
      }
    },
    primary: {
      background: {
        color: 'green'
      },
      border: undefined,
      color: 'text-strong',
      padding: {
        horizontal: '12px',
        vertical: '6px'
      }
    },
    secondary: {
      border: {
        color: 'green',
        width: '2px'
      },
      color: 'text',
      padding: {
        horizontal: '10px',
        vertical: '4px'
      }
    },
    active: {
      background: {
        color: 'background-contrast'
      },
      color: 'text',
      secondary: {
        border: {
          color: 'transparent'
        }
      }
    },
    disabled: {
      background: {
        color: 'transparent'
      },
      color: 'text-weak',
      primary: {
        border: {
          color: 'text-weak',
          width: '2px'
        },
        padding: {
          horizontal: '10px',
          vertical: '4px'
        }
      },
      secondary: {
        border: {
          color: 'text-weak'
        }
      },
      opacity: 1.0
    },
    hover: {
      "default": {
        background: {
          color: 'background-contrast'
        },
        color: undefined
      },
      secondary: {
        border: {
          width: '3px'
        },
        padding: {
          horizontal: '9px',
          vertical: '3px'
        }
      }
    }
  }
});
var themes = [{
  name: 'grommet',
  theme: _grommet.grommet
}, {
  name: 'hpe',
  theme: _grommetThemeHpe.hpe
}, {
  name: 'hpe next',
  theme: _grommetThemeHpeNext.hpe
}, {
  name: 'next hpe next',
  theme: nextHpeNext
}];
var darks = [false, true];
var kinds = [{
  name: 'default',
  props: {}
}, {
  name: 'primary',
  props: {
    primary: true
  }
}, {
  name: 'secondary',
  props: {
    secondary: true
  }
}];
var states = [{}, {
  active: true
}, {
  disabled: true
}, {
  color: 'teal'
}, {
  color: '#9999ff'
}, {
  color: '#333399'
}, {
  hoverIndicator: 'teal'
}];
var contents = [{
  icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.User, null)
}, {
  label: 'label'
}, {
  icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.User, null),
  label: 'label'
}, {
  plain: true,
  children: /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "xsmall"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    color: "orange"
  }, "label"))
}];

var Example = function Example() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "large",
    gap: "large"
  }, themes.map(function (_ref) {
    var name = _ref.name,
        theme = _ref.theme;
    return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
      key: name,
      theme: theme
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      gap: "medium"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
      level: 2,
      size: "small",
      margin: "none"
    }, name), kinds.filter(function (kind) {
      return theme.button["default"] || kind.name !== 'secondary';
    }).map(function (kind) {
      return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
        key: kind.name,
        flex: false
      }, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
        level: 3,
        size: "small"
      }, kind.name), states.map(function (state, index) {
        return (
          /*#__PURE__*/
          // eslint-disable-next-line react/no-array-index-key
          _react["default"].createElement(_grommet.Box, {
            key: index,
            direction: "row",
            align: "center"
          }, darks.map(function (dark) {
            return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
              key: dark,
              direction: dark ? 'row-reverse' : 'row',
              align: "center",
              gap: "small",
              background: {
                color: 'background',
                dark: dark
              },
              pad: "small"
            }, contents.map(function (content, index2) {
              return /*#__PURE__*/_react["default"].createElement(_grommet.Button // eslint-disable-next-line react/no-array-index-key
              , _extends({
                key: index2
              }, kind.props, content, state));
            }));
          }))
        );
      }));
    })));
  }));
};

(0, _react2.storiesOf)('Button', module).add('Themes', function () {
  return /*#__PURE__*/_react["default"].createElement(Example, null);
});