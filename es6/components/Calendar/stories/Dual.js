function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Button, Calendar, Grommet, Heading } from 'grommet';
import { grommet } from 'grommet/themes';
import { Blank } from "grommet-icons/es6/icons/Blank";
import { Previous } from "grommet-icons/es6/icons/Previous";
import { Next } from "grommet-icons/es6/icons/Next";
var now = new Date();
var next = new Date(now);
next.setMonth(now.getMonth() + 1, 1);

var DualCalendar =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(DualCalendar, _Component);

  function DualCalendar() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      reference1: now,
      reference2: next
    });

    _defineProperty(_assertThisInitialized(_this), "onSelect", function (arg) {
      if (Array.isArray(arg)) {
        _this.setState({
          date: undefined,
          dates: arg
        });
      } else {
        _this.setState({
          date: arg,
          dates: undefined
        });
      }
    });

    return _this;
  }

  var _proto = DualCalendar.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var _this$state = this.state,
        date = _this$state.date,
        dates = _this$state.dates,
        reference1 = _this$state.reference1,
        reference2 = _this$state.reference2;
    return React.createElement(Grommet, {
      theme: grommet
    }, React.createElement(Box, {
      justify: "center",
      pad: "large",
      direction: "row",
      gap: "small"
    }, React.createElement(Calendar, {
      animate: false,
      showAdjacentDays: false,
      range: true,
      date: date,
      dates: dates,
      onSelect: this.onSelect,
      reference: reference1.toISOString(),
      onReference: function onReference(reference) {
        var refDate = new Date(reference);
        var nextDate = new Date(refDate);
        nextDate.setMonth(refDate.getMonth() + 1, 1);

        _this2.setState({
          reference1: refDate,
          reference2: nextDate
        });
      },
      header: function header(_ref) {
        var currentDate = _ref.date,
            locale = _ref.locale,
            onPreviousMonth = _ref.onPreviousMonth,
            previousInBound = _ref.previousInBound;
        return React.createElement(Box, {
          direction: "row",
          align: "center",
          justify: "between"
        }, React.createElement(Button, {
          disabled: !previousInBound,
          icon: React.createElement(Previous, null),
          onClick: onPreviousMonth
        }), React.createElement(Heading, {
          level: 3,
          margin: "none"
        }, currentDate.toLocaleDateString(locale, {
          month: 'long',
          year: 'numeric'
        })), React.createElement(Blank, null));
      }
    }), React.createElement(Calendar, {
      animate: false,
      showAdjacentDays: false,
      date: date,
      dates: dates,
      range: true,
      onSelect: this.onSelect,
      reference: reference2.toISOString(),
      onReference: function onReference(reference) {
        var refDate = new Date(reference);
        var priorDate = new Date(refDate);
        priorDate.setMonth(refDate.getMonth() - 1, 1);

        _this2.setState({
          reference1: priorDate,
          reference2: refDate
        });
      },
      header: function header(_ref2) {
        var currentDate = _ref2.date,
            locale = _ref2.locale,
            onNextMonth = _ref2.onNextMonth,
            nextInBound = _ref2.nextInBound;
        return React.createElement(Box, {
          direction: "row",
          align: "center",
          justify: "between"
        }, React.createElement(Blank, null), React.createElement(Heading, {
          level: 3,
          margin: "none"
        }, currentDate.toLocaleDateString(locale, {
          month: 'long',
          year: 'numeric'
        })), React.createElement(Button, {
          disabled: !nextInBound,
          icon: React.createElement(Next, null),
          onClick: onNextMonth
        }));
      }
    })));
  };

  return DualCalendar;
}(Component);

storiesOf('Calendar', module).add('Dual', function () {
  return React.createElement(DualCalendar, null);
});