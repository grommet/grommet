function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { User } from "grommet-icons/es6/icons/User";
import { Box, Button, grommet, Grommet, Heading, Text } from 'grommet';
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
export var Kind = function Kind() {
  return /*#__PURE__*/React.createElement(Box, {
    pad: "large",
    gap: "large"
  }, /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    gap: "medium"
  }, kinds.map(function (kind) {
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
  }))));
};