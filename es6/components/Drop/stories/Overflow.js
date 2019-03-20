function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { createRef, Component } from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Calendar, Drop, Heading, Grommet, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';

var OverflowDrop =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(OverflowDrop, _Component);

  function OverflowDrop() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "targetRef", createRef());

    _defineProperty(_assertThisInitialized(_this), "inputRef", createRef());

    _defineProperty(_assertThisInitialized(_this), "state", {
      date: undefined,
      showCalendar: false
    });

    _defineProperty(_assertThisInitialized(_this), "onSelect", function (nextDate) {
      var date = _this.state.date;

      _this.setState({
        date: nextDate !== date ? nextDate : undefined,
        showCalendar: false
      });
    });

    return _this;
  }

  var _proto = OverflowDrop.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.forceUpdate();
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$state = this.state,
        date = _this$state.date,
        showCalendar = _this$state.showCalendar;
    return React.createElement(Grommet, {
      theme: grommet,
      full: true
    }, React.createElement(Box, {
      fill: true,
      align: "center",
      justify: "center"
    }, React.createElement(Box, {
      background: "dark-3",
      pad: "medium",
      align: "center",
      justify: "start",
      ref: this.targetRef
    }, "Target"), this.targetRef.current && React.createElement(Drop, {
      overflow: "unset",
      align: {
        top: 'bottom',
        left: 'left'
      },
      target: this.targetRef.current,
      onClose: function onClose() {
        return _this2.setState({
          showCalendar: false
        });
      }
    }, React.createElement(Box, {
      height: "small"
    }, React.createElement(Heading, {
      level: 4
    }, "Select Start Date"), React.createElement("div", {
      style: {
        position: 'relative'
      }
    }, React.createElement(TextInput, {
      ref: this.inputRef,
      value: date || '',
      placeholder: "Focus on me",
      onFocus: function onFocus() {
        return _this2.setState({
          showCalendar: true
        });
      }
    }), showCalendar && React.createElement("div", {
      style: {
        position: 'absolute',
        background: '#eee'
      }
    }, React.createElement(Calendar, {
      date: date,
      onSelect: this.onSelect,
      size: "small"
    })))))));
  };

  return OverflowDrop;
}(Component);

storiesOf('Drop', module).add('Overflow', function () {
  return React.createElement(OverflowDrop, null);
});