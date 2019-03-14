function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { grommet } from 'grommet/themes';
import { AnnounceContext, Box, Grommet, Heading, Text } from 'grommet';

var Announcer =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Announcer, _Component);

  function Announcer() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = Announcer.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this$props = this.props,
        announce = _this$props.announce,
        message = _this$props.message,
        mode = _this$props.mode;
    var timeout = 3000;
    announce(message, mode, timeout);
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        message = _this$props2.message,
        mode = _this$props2.mode,
        role = _this$props2.role;
    return React.createElement(Text, {
      align: "center",
      role: role,
      "aria-live": mode
    }, message);
  };

  return Announcer;
}(Component);

_defineProperty(Announcer, "propTypes", {
  announce: PropTypes.func.isRequired,
  message: PropTypes.string,
  mode: PropTypes.string,
  role: PropTypes.string
});

_defineProperty(Announcer, "defaultProps", {
  message: 'Here is a simple announcement. This will soon disappear',
  mode: 'polite',
  role: 'log'
});

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
    message: "Turn on Accessibility feature to listen to this announcement. This will soon disappear",
    mode: "assertive",
    role: "alert"
  });
});