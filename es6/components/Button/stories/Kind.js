function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React from 'react';
import { User } from "grommet-icons/es6/icons/User";
import { Box, Button, Heading, Text } from 'grommet';
import { useThemeValue } from '../../../utils/useThemeValue';
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
  }, /*#__PURE__*/React.createElement(Text, null, "label"))
}];
export var Kind = function Kind() {
  var _useThemeValue = useThemeValue(),
    theme = _useThemeValue.theme;
  return /*#__PURE__*/React.createElement(Box, {
    pad: "large",
    gap: "large"
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
          var backgroundFallback = dark ? 'black' : 'white';
          return /*#__PURE__*/React.createElement(Box, {
            key: dark,
            direction: dark ? 'row-reverse' : 'row',
            align: "center",
            gap: "small",
            background: {
              color: theme.global.colors.background ? 'background' : backgroundFallback,
              dark: dark
            },
            pad: "small"
          }, contents.map(function (content, index2) {
            return /*#__PURE__*/React.createElement(Button
            // eslint-disable-next-line react/no-array-index-key
            , _extends({
              key: index2
            }, kind.props, content, state));
          }));
        }))
      );
    }));
  })));
};
export default {
  title: 'Controls/Button/Kind'
};