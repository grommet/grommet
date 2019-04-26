function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component, useState } from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Button, Grommet, Keyboard, Text, Calendar, MaskedInput, DropButton } from 'grommet';
import { grommet } from 'grommet/themes';
import { Schedule } from "grommet-icons/es6/icons/Schedule";

var DropContent = function DropContent(props) {
  var initialDate = props.date,
      initialTime = props.time,
      onClose = props.onClose;

  var _useState = useState(),
      date = _useState[0],
      setDate = _useState[1];

  var _useState2 = useState(),
      time = _useState2[0],
      setTime = _useState2[1];

  var close = function close() {
    return onClose(date || initialDate, time || initialTime);
  };

  return React.createElement(Box, {
    align: "center"
  }, React.createElement(Calendar, {
    animate: false,
    date: date || initialDate,
    onSelect: setDate,
    showAdjacentDays: false
  }), React.createElement(Box, {
    flex: false,
    pad: "medium",
    gap: "medium"
  }, React.createElement(Keyboard, {
    onEnter: function onEnter(event) {
      event.preventDefault(); // so drop doesn't re-open

      close();
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
    value: time || initialTime,
    name: "maskedInput",
    onChange: function onChange(event) {
      return setTime(event.target.value);
    }
  })), React.createElement(Box, {
    flex: false
  }, React.createElement(Button, {
    label: "Done",
    onClick: close
  }))));
};

var DateTimeDropButton =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(DateTimeDropButton, _Component);

  function DateTimeDropButton() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      date: undefined,
      time: ''
    });

    _defineProperty(_assertThisInitialized(_this), "onClose", function (date, time) {
      _this.setState({
        date: date,
        time: time,
        open: false
      });

      setTimeout(function () {
        return _this.setState({
          open: undefined
        });
      }, 1);
    });

    return _this;
  }

  var _proto = DateTimeDropButton.prototype;

  _proto.render = function render() {
    var _this2 = this;

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
        return _this2.setState({
          open: false
        });
      },
      onOpen: function onOpen() {
        return _this2.setState({
          open: true
        });
      },
      dropContent: React.createElement(DropContent, {
        date: date,
        time: time,
        onClose: this.onClose
      })
    }, React.createElement(Box, {
      direction: "row",
      gap: "medium",
      align: "center",
      pad: "small"
    }, React.createElement(Text, {
      color: date ? undefined : 'dark-5'
    }, date ? new Date(date).toLocaleDateString() + " " + time : 'Select date & time'), React.createElement(Schedule, null)))));
  };

  return DateTimeDropButton;
}(Component);

storiesOf('MaskedInput', module).add('Date Time Drop', function () {
  return React.createElement(DateTimeDropButton, null);
});