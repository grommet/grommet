function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Grommet, MaskedInput } from 'grommet';
import { grommet } from 'grommet/themes';

var TimeMaskedInput =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(TimeMaskedInput, _Component);

  function TimeMaskedInput() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      value: ''
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onChange", function (event) {
      _this.setState({
        value: event.target.value
      });
    });

    return _this;
  }

  var _proto = TimeMaskedInput.prototype;

  _proto.render = function render() {
    var value = this.state.value;
    return React.createElement(Grommet, {
      full: true,
      theme: grommet
    }, React.createElement(Box, {
      fill: true,
      align: "center",
      justify: "start",
      pad: "large"
    }, React.createElement(Box, {
      width: "medium"
    }, React.createElement(MaskedInput, {
      mask: [{
        length: [1, 2],
        options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        regexp: /^1[1-2]$|^[0-9]$/,
        placeholder: 'hh'
      }, {
        fixed: ':'
      }, {
        length: 2,
        options: ['00', '15', '30', '45'],
        regexp: /^[0-5][0-9]$|^[0-9]$/,
        placeholder: 'mm'
      }, {
        fixed: ' '
      }, {
        length: 2,
        options: ['am', 'pm'],
        regexp: /^[ap]m$|^[AP]M$|^[aApP]$/,
        placeholder: 'ap'
      }],
      value: value,
      onChange: this.onChange
    }))));
  };

  return TimeMaskedInput;
}(Component);

var PhoneMaskedInput =
/*#__PURE__*/
function (_Component2) {
  _inheritsLoose(PhoneMaskedInput, _Component2);

  function PhoneMaskedInput() {
    var _this2;

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this2 = _Component2.call.apply(_Component2, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this2)), "state", {
      value: ''
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this2)), "onChange", function (event) {
      _this2.setState({
        value: event.target.value
      });
    });

    return _this2;
  }

  var _proto2 = PhoneMaskedInput.prototype;

  _proto2.render = function render() {
    var value = this.state.value;
    return React.createElement(Grommet, {
      full: true,
      theme: grommet
    }, React.createElement(Box, {
      fill: true,
      align: "center",
      justify: "start",
      pad: "large"
    }, React.createElement(Box, {
      width: "medium"
    }, React.createElement(MaskedInput, {
      mask: [{
        fixed: '('
      }, {
        length: 3,
        regexp: /^[0-9]{1,3}$/,
        placeholder: 'xxx'
      }, {
        fixed: ')'
      }, {
        fixed: ' '
      }, {
        length: 3,
        regexp: /^[0-9]{1,3}$/,
        placeholder: 'xxx'
      }, {
        fixed: '-'
      }, {
        length: 4,
        regexp: /^[0-9]{1,4}$/,
        placeholder: 'xxxx'
      }],
      value: value,
      onChange: this.onChange
    }))));
  };

  return PhoneMaskedInput;
}(Component);

var EmailMaskedInput =
/*#__PURE__*/
function (_Component3) {
  _inheritsLoose(EmailMaskedInput, _Component3);

  function EmailMaskedInput() {
    var _this3;

    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    _this3 = _Component3.call.apply(_Component3, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this3)), "state", {
      value: ''
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this3)), "onChange", function (event) {
      _this3.setState({
        value: event.target.value
      });
    });

    return _this3;
  }

  var _proto3 = EmailMaskedInput.prototype;

  _proto3.render = function render() {
    var value = this.state.value;
    return React.createElement(Grommet, {
      full: true,
      theme: grommet
    }, React.createElement(Box, {
      fill: true,
      align: "center",
      justify: "start",
      pad: "large"
    }, React.createElement(Box, {
      width: "medium"
    }, React.createElement(MaskedInput, {
      mask: [{
        regexp: /^[\w\-_.]+$/,
        placeholder: 'example'
      }, {
        fixed: '@'
      }, {
        regexp: /^[\w]+$/,
        placeholder: 'my'
      }, {
        fixed: '.'
      }, {
        regexp: /^[\w]+$/,
        placeholder: 'com'
      }],
      value: value,
      onChange: this.onChange
    }))));
  };

  return EmailMaskedInput;
}(Component);

var IPv4ElementExp = /^[0-1][0-9][0-9]$|^2[0-4][0-9]$|^25[0-5]$|^[0-9][0-9]$|^[0-9]$/;

var IPv4MaskedInput =
/*#__PURE__*/
function (_Component4) {
  _inheritsLoose(IPv4MaskedInput, _Component4);

  function IPv4MaskedInput() {
    var _this4;

    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    _this4 = _Component4.call.apply(_Component4, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this4)), "state", {
      value: ''
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this4)), "onChange", function (event) {
      _this4.setState({
        value: event.target.value
      });
    });

    return _this4;
  }

  var _proto4 = IPv4MaskedInput.prototype;

  _proto4.render = function render() {
    var value = this.state.value;
    return React.createElement(Grommet, {
      full: true,
      theme: grommet
    }, React.createElement(Box, {
      fill: true,
      align: "center",
      justify: "start",
      pad: "large"
    }, React.createElement(Box, {
      width: "medium"
    }, React.createElement(MaskedInput, {
      mask: [{
        length: [1, 3],
        regexp: IPv4ElementExp,
        placeholder: 'xxx'
      }, {
        fixed: '.'
      }, {
        length: [1, 3],
        regexp: IPv4ElementExp,
        placeholder: 'xxx'
      }, {
        fixed: '.'
      }, {
        length: [1, 3],
        regexp: IPv4ElementExp,
        placeholder: 'xxx'
      }, {
        fixed: '.'
      }, {
        length: [1, 3],
        regexp: IPv4ElementExp,
        placeholder: 'xxx'
      }],
      value: value,
      onChange: this.onChange
    }))));
  };

  return IPv4MaskedInput;
}(Component);

storiesOf('MaskedInput', module).add('Time', function () {
  return React.createElement(TimeMaskedInput, null);
}).add('Phone', function () {
  return React.createElement(PhoneMaskedInput, null);
}).add('Email', function () {
  return React.createElement(EmailMaskedInput, null);
}).add('IPv4 Address', function () {
  return React.createElement(IPv4MaskedInput, null);
});