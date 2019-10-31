function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { grommet } from 'grommet/themes';
import { AnnounceContext, Box, Grommet, Heading, Text } from 'grommet';

var Announcer = function Announcer(_ref) {
  var announce = _ref.announce,
      message = _ref.message,
      mode = _ref.mode,
      role = _ref.role;
  React.useEffect(function () {
    var timeout = 3000;
    announce(message, mode, timeout);
  }, [announce, message, mode]);
  return React.createElement(Text, {
    align: "center",
    role: role,
    "aria-live": mode
  }, message);
};

Announcer.propTypes = {
  announce: PropTypes.func.isRequired,
  message: PropTypes.string,
  mode: PropTypes.string,
  role: PropTypes.string
};
Announcer.defaultProps = {
  message: 'Here is a simple announcement. This will soon disappear',
  mode: 'polite',
  role: 'log'
};

var AnnounceContextComponent = function AnnounceContextComponent(props) {
  return React.createElement(Grommet, {
    theme: grommet,
    full: true
  }, React.createElement(Box, {
    justify: "center",
    align: "center",
    background: "brand",
    fill: true
  }, React.createElement(Heading, null, "Welcome to announcement section"), React.createElement(AnnounceContext.Consumer, null, function (announce) {
    return React.createElement(Announcer, _extends({
      announce: announce
    }, props));
  })));
};

storiesOf('AnnounceContext', module).add('Polite', function () {
  return React.createElement(AnnounceContextComponent, null);
}).add('Assertive', function () {
  return React.createElement(AnnounceContextComponent, {
    message: "Turn on Accessibility feature to listen to this announcement.  This will soon disappear",
    mode: "assertive",
    role: "alert"
  });
});