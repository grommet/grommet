function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Button, Grommet, Text, Calendar, MaskedInput, DropButton } from 'grommet';
import { grommet } from 'grommet/themes';
import { Schedule } from "grommet-icons/es6/icons/Schedule";

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

    _defineProperty(_assertThisInitialized(_this), "state", {
      value: ''
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (event) {
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

    _defineProperty(_assertThisInitialized(_this2), "state", {
      value: ''
    });

    _defineProperty(_assertThisInitialized(_this2), "onChange", function (event) {
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

    _defineProperty(_assertThisInitialized(_this3), "state", {
      value: ''
    });

    _defineProperty(_assertThisInitialized(_this3), "onChange", function (event) {
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

    _defineProperty(_assertThisInitialized(_this4), "state", {
      value: ''
    });

    _defineProperty(_assertThisInitialized(_this4), "onChange", function (event) {
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

var DropContent = function DropContent(props) {
  var date = props.date,
      onSelect = props.onSelect,
      time = props.time,
      onClose = props.onClose,
      onChange = props.onChange;
  return React.createElement(Box, {
    align: "center"
  }, React.createElement(Calendar, {
    date: date,
    onSelect: onSelect,
    showAdjacentDays: false
  }), React.createElement(Box, {
    width: "small",
    align: "center",
    margin: {
      bottom: 'small'
    }
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
    value: time,
    name: "maskedInput",
    onChange: onChange
  })), React.createElement(Button, {
    margin: "small",
    label: "Close",
    onClick: onClose
  }));
};

var TimeMaskedInputInDropButton =
/*#__PURE__*/
function (_Component5) {
  _inheritsLoose(TimeMaskedInputInDropButton, _Component5);

  function TimeMaskedInputInDropButton() {
    var _this5;

    for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      args[_key5] = arguments[_key5];
    }

    _this5 = _Component5.call.apply(_Component5, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this5), "state", {
      date: undefined,
      time: ''
    });

    _defineProperty(_assertThisInitialized(_this5), "onChange", function (event) {
      _this5.setState({
        time: event.target.value
      });
    });

    _defineProperty(_assertThisInitialized(_this5), "onClose", function () {
      _this5.setState({
        open: false
      });

      setTimeout(function () {
        return _this5.setState({
          open: undefined
        });
      }, 1);
    });

    _defineProperty(_assertThisInitialized(_this5), "onSelect", function (date) {
      return _this5.setState({
        date: date,
        open: false
      });
    });

    return _this5;
  }

  var _proto5 = TimeMaskedInputInDropButton.prototype;

  _proto5.render = function render() {
    var _this6 = this;

    var _this$state = this.state,
        date = _this$state.date,
        open = _this$state.open,
        time = _this$state.time;
    return React.createElement(Grommet, {
      theme: grommet
    }, React.createElement(Box, {
      align: "center",
      pad: "large"
    }, React.createElement(DropButton, {
      open: open,
      onClose: function onClose() {
        return _this6.setState({
          open: false
        });
      },
      onOpen: function onOpen() {
        return _this6.setState({
          open: true
        });
      },
      dropContent: React.createElement(DropContent, {
        onSelect: this.onSelect,
        date: date,
        onChange: this.onChange,
        time: time,
        onClose: this.onClose
      })
    }, React.createElement(Box, {
      direction: "row",
      gap: "medium",
      align: "center",
      pad: "small"
    }, React.createElement(Text, null, date ? new Date(date).toLocaleDateString() + " " + time : 'Select date & time'), React.createElement(Schedule, null)))));
  };

  return TimeMaskedInputInDropButton;
}(Component);

storiesOf('MaskedInput', module).add('Time', function () {
  return React.createElement(TimeMaskedInput, null);
}).add('Phone', function () {
  return React.createElement(PhoneMaskedInput, null);
}).add('Email', function () {
  return React.createElement(EmailMaskedInput, null);
}).add('IPv4 Address', function () {
  return React.createElement(IPv4MaskedInput, null);
}).add('Inside Drop Button', function () {
  return React.createElement(TimeMaskedInputInDropButton, null);
});