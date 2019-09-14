function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { deepMerge } from 'grommet/utils';
import { Box, Calendar, Grommet, grommet } from 'grommet';
var customHeading = deepMerge(grommet, {
  calendar: {
    heading: {
      level: '3'
    }
  }
});

var CustomSizeCalendar =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(CustomSizeCalendar, _Component);

  function CustomSizeCalendar() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {});

    _defineProperty(_assertThisInitialized(_this), "onSelect", function (nextDate) {
      var date = _this.state.date;

      _this.setState({
        date: nextDate !== date ? nextDate : undefined
      });
    });

    return _this;
  }

  var _proto = CustomSizeCalendar.prototype;

  _proto.render = function render() {
    var date = this.state.date;
    return React.createElement(Grommet, {
      theme: customHeading
    }, React.createElement(Box, {
      align: "center",
      pad: "large"
    }, React.createElement(Calendar, {
      date: date,
      onSelect: this.onSelect,
      bounds: ['2018-09-08', '2020-12-13']
    })));
  };

  return CustomSizeCalendar;
}(Component);

storiesOf('Calendar', module).add('Heading Size', function () {
  return React.createElement(CustomSizeCalendar, null);
});