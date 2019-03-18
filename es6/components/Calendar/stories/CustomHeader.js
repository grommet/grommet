function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Button, Calendar, Grommet, Text } from 'grommet';
import { grommet } from 'grommet/themes';
import { FormPreviousLink } from "grommet-icons/es6/icons/FormPreviousLink";
import { FormNextLink } from "grommet-icons/es6/icons/FormNextLink";

var CustomHeaderCalendar =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(CustomHeaderCalendar, _Component);

  function CustomHeaderCalendar() {
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

  var _proto = CustomHeaderCalendar.prototype;

  _proto.render = function render() {
    var date = this.state.date;
    return React.createElement(Grommet, {
      theme: grommet
    }, React.createElement(Box, {
      align: "center",
      pad: "large"
    }, React.createElement(Calendar, {
      date: date,
      onSelect: this.onSelect,
      size: "small",
      bounds: ['2018-09-08', '2018-12-13'],
      header: function header(_ref) {
        var currentDate = _ref.date,
            locale = _ref.locale,
            onPreviousMonth = _ref.onPreviousMonth,
            onNextMonth = _ref.onNextMonth,
            previousInBound = _ref.previousInBound,
            nextInBound = _ref.nextInBound;
        return React.createElement(Box, {
          direction: "row",
          align: "center",
          justify: "between"
        }, React.createElement(Button, {
          disabled: !previousInBound,
          onClick: onPreviousMonth
        }, React.createElement(Box, null, React.createElement(FormPreviousLink, null))), React.createElement(Text, {
          size: "small"
        }, React.createElement("strong", null, currentDate.toLocaleDateString(locale, {
          month: 'long',
          year: 'numeric'
        }))), React.createElement(Button, {
          disabled: !nextInBound,
          onClick: onNextMonth
        }, React.createElement(Box, null, React.createElement(FormNextLink, null))));
      }
    })));
  };

  return CustomHeaderCalendar;
}(Component);

storiesOf('Calendar', module).add('Custom Header', function () {
  return React.createElement(CustomHeaderCalendar, null);
});