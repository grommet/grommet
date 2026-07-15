var _excluded = ["children", "title", "subTitle", "size"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React from 'react';
import { Location } from "grommet-icons/es6/icons/Location";
import { System } from "grommet-icons/es6/icons/System";
import { ShieldSecurity } from "grommet-icons/es6/icons/ShieldSecurity";
import { Tasks } from "grommet-icons/es6/icons/Tasks";
import { User } from "grommet-icons/es6/icons/User";
import { Wifi } from "grommet-icons/es6/icons/Wifi";
import { Box, Card, CardBody, CardFooter, Grid, Grommet, Main, Text } from 'grommet';
var data = [{
  color: 'blue',
  icon: /*#__PURE__*/React.createElement(Wifi, {
    size: "large"
  }),
  title: 'Remote Access',
  subTitle: 'Lights out Management (LOM)',
  message: 'Connected'
}, {
  color: 'green',
  icon: /*#__PURE__*/React.createElement(System, {
    size: "large"
  }),
  title: 'System',
  subTitle: 'Sub-system and Devices',
  message: 'Composable System'
}, {
  color: 'red',
  icon: /*#__PURE__*/React.createElement(User, {
    size: "large"
  }),
  title: 'User Sessions',
  subTitle: 'User Access on Server',
  message: '4 active sessions'
}, {
  color: 'purple',
  icon: /*#__PURE__*/React.createElement(Tasks, {
    size: "large"
  }),
  title: 'Logs',
  subTitle: 'Events, Integration, and Status',
  message: '204,353'
}, {
  color: 'orange',
  icon: /*#__PURE__*/React.createElement(Location, {
    size: "large"
  }),
  title: 'Beacons',
  subTitle: 'Unique identification light',
  message: '24 beacons connected'
}, {
  color: 'teal',
  icon: /*#__PURE__*/React.createElement(ShieldSecurity, {
    size: "large"
  }),
  title: 'Security',
  subTitle: 'Trusted Platform Module',
  message: 'No Module Connected'
}];
var theme = {
  global: {
    font: {
      family: "-apple-system,\n         BlinkMacSystemFont,\n         \"Segoe UI\""
    },
    colors: {
      blue: '#00C8FF',
      green: '#17EBA0',
      teal: '#82FFF2',
      purple: '#e8c3f7',
      red: '#f5afab',
      orange: '#FFBC44',
      yellow: '#FFEB59'
    }
  },
  card: {
    footer: {
      pad: {
        horizontal: 'medium',
        vertical: 'small'
      },
      background: '#FFFFFF27'
    }
  }
};
var Identifier = function Identifier(_ref) {
  var children = _ref.children,
    title = _ref.title,
    subTitle = _ref.subTitle,
    size = _ref.size,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  return /*#__PURE__*/React.createElement(Box, _extends({
    gap: "small",
    align: "center"
  }, rest), children, /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Text, {
    size: size,
    weight: "bold"
  }, title), /*#__PURE__*/React.createElement(Text, {
    size: size
  }, subTitle)));
};
export var Themed = function Themed() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: theme,
    full: true
  }, /*#__PURE__*/React.createElement(Main, null, /*#__PURE__*/React.createElement(Box, {
    pad: "large"
  }, /*#__PURE__*/React.createElement(Grid, {
    gap: "medium",
    rows: "small",
    columns: {
      count: 'fit',
      size: 'small'
    }
  }, data.map(function (value) {
    return /*#__PURE__*/React.createElement(Card, {
      background: value.color,
      key: value.message
    }, /*#__PURE__*/React.createElement(CardBody, {
      pad: "small"
    }, /*#__PURE__*/React.createElement(Identifier, {
      pad: "small",
      title: value.title,
      subTitle: value.subTitle,
      size: "small",
      align: "start"
    }, value.icon)), /*#__PURE__*/React.createElement(CardFooter, {
      pad: {
        horizontal: 'medium',
        vertical: 'small'
      }
    }, /*#__PURE__*/React.createElement(Text, {
      size: "xsmall"
    }, value.message)));
  })))));
};
export default {
  title: 'Layout/Card/Custom Themed/Themed'
};