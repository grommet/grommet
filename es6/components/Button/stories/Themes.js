function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { storiesOf } from '@storybook/react';
import { User } from "grommet-icons/es6/icons/User";
import { Box, Button, grommet, Grommet, Heading, Text } from 'grommet';
import { hpe } from 'grommet-theme-hpe';
import { hpe as hpeNext } from 'grommet-theme-hpe-next';
var themes = [{
  name: 'grommet',
  theme: grommet
}, {
  name: 'hpe',
  theme: hpe
}, {
  name: 'hpe next',
  theme: hpeNext
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
  children: /*#__PURE__*/React.createElement(Box, {
    pad: "xsmall"
  }, /*#__PURE__*/React.createElement(Text, null, "label"))
}];

var Example = function Example() {
  return /*#__PURE__*/React.createElement(Box, {
    pad: "large",
    gap: "large"
  }, themes.map(function (_ref) {
    var name = _ref.name,
        theme = _ref.theme;
    return /*#__PURE__*/React.createElement(Grommet, {
      theme: theme
    }, /*#__PURE__*/React.createElement(Box, {
      gap: "medium"
    }, /*#__PURE__*/React.createElement(Heading, {
      level: 2,
      size: "small",
      margin: "none"
    }, name), kinds.map(function (kind) {
      return /*#__PURE__*/React.createElement(Box, {
        key: kind.name,
        flex: false
      }, /*#__PURE__*/React.createElement(Heading, {
        level: 3,
        size: "small"
      }, kind.name), states.map(function (state) {
        return /*#__PURE__*/React.createElement(Box, {
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
          }, contents.map(function (content, index) {
            return /*#__PURE__*/React.createElement(Button // eslint-disable-next-line react/no-array-index-key
            , _extends({
              key: index
            }, kind.props, content, state));
          }));
        }));
      }));
    })));
  }));
};

storiesOf('Button', module).add('Themes', function () {
  return /*#__PURE__*/React.createElement(Example, null);
});