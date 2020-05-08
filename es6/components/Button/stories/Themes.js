function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { storiesOf } from '@storybook/react';
import { User } from "grommet-icons/es6/icons/User";
import { Box, Button, grommet, Grommet, Heading, Text } from 'grommet';
import { deepMerge } from 'grommet/utils';
import { hpe } from 'grommet-theme-hpe';
import { hpe as hpeNext } from 'grommet-theme-hpe-next';
var nextHpeNext = deepMerge(hpeNext, {
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
  theme: grommet
}, {
  name: 'hpe',
  theme: hpe
}, {
  name: 'hpe next',
  theme: hpeNext
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
  icon: /*#__PURE__*/React.createElement(User, null)
}, {
  label: 'label'
}, {
  icon: /*#__PURE__*/React.createElement(User, null),
  label: 'label'
}, {
  plain: true,
  children: /*#__PURE__*/React.createElement(Box, {
    pad: "xsmall"
  }, /*#__PURE__*/React.createElement(Text, {
    color: "orange"
  }, "label"))
}];

var Example = function Example() {
  return /*#__PURE__*/React.createElement(Box, {
    pad: "large",
    gap: "large"
  }, themes.map(function (_ref) {
    var name = _ref.name,
        theme = _ref.theme;
    return /*#__PURE__*/React.createElement(Grommet, {
      key: name,
      theme: theme
    }, /*#__PURE__*/React.createElement(Box, {
      gap: "medium"
    }, /*#__PURE__*/React.createElement(Heading, {
      level: 2,
      size: "small",
      margin: "none"
    }, name), kinds.filter(function (kind) {
      return theme.button["default"] || kind.name !== 'secondary';
    }).map(function (kind) {
      return /*#__PURE__*/React.createElement(Box, {
        key: kind.name,
        flex: false
      }, /*#__PURE__*/React.createElement(Heading, {
        level: 3,
        size: "small"
      }, kind.name), states.map(function (state, index) {
        return (
          /*#__PURE__*/
          // eslint-disable-next-line react/no-array-index-key
          React.createElement(Box, {
            key: index,
            direction: "row",
            align: "center"
          }, darks.map(function (dark) {
            return /*#__PURE__*/React.createElement(Box, {
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
              return /*#__PURE__*/React.createElement(Button // eslint-disable-next-line react/no-array-index-key
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

storiesOf('Button', module).add('Themes', function () {
  return /*#__PURE__*/React.createElement(Example, null);
});