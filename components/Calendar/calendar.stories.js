"use strict";

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

var _grommetIcons = require("grommet-icons");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SimpleCalendar =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(SimpleCalendar, _Component);

  function SimpleCalendar() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {});

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onSelect", function (nextDate) {
      var date = _this.state.date;

      _this.setState({
        date: nextDate !== date ? nextDate : undefined
      });
    });

    return _this;
  }

  var _proto = SimpleCalendar.prototype;

  _proto.render = function render() {
    var date = this.state.date;
    return _react.default.createElement(_grommet.Grommet, {
      theme: _themes.grommet
    }, _react.default.createElement(_grommet.Calendar, {
      date: date,
      onSelect: this.onSelect,
      size: "small",
      bounds: ['2018-09-08', '2018-12-13']
    }));
  };

  return SimpleCalendar;
}(_react.Component);

var RangeCalendar = function RangeCalendar() {
  return _react.default.createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, _react.default.createElement(_grommet.Calendar, {
    range: true
  }));
};

var now = new Date();
var next = new Date(now);
next.setMonth(now.getMonth() + 1, 1);

var DualCalendar =
/*#__PURE__*/
function (_Component2) {
  _inheritsLoose(DualCalendar, _Component2);

  function DualCalendar() {
    var _this2;

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this2 = _Component2.call.apply(_Component2, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this2)), "state", {
      reference1: now,
      reference2: next
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this2)), "onSelect", function (arg) {
      if (Array.isArray(arg)) {
        _this2.setState({
          date: undefined,
          dates: arg
        });
      } else {
        _this2.setState({
          date: arg,
          dates: undefined
        });
      }
    });

    return _this2;
  }

  var _proto2 = DualCalendar.prototype;

  _proto2.render = function render() {
    var _this3 = this;

    var _this$state = this.state,
        date = _this$state.date,
        dates = _this$state.dates,
        reference1 = _this$state.reference1,
        reference2 = _this$state.reference2;
    return _react.default.createElement(_grommet.Grommet, {
      theme: _themes.grommet
    }, _react.default.createElement(_grommet.Box, {
      direction: "row",
      gap: "small"
    }, _react.default.createElement(_grommet.Calendar, {
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

        _this3.setState({
          reference1: refDate,
          reference2: nextDate
        });
      },
      header: function header(_ref) {
        var currentDate = _ref.date,
            locale = _ref.locale,
            onPreviousMonth = _ref.onPreviousMonth,
            previousInBound = _ref.previousInBound;
        return _react.default.createElement(_grommet.Box, {
          direction: "row",
          align: "center",
          justify: "between"
        }, _react.default.createElement(_grommet.Button, {
          disabled: !previousInBound,
          icon: _react.default.createElement(_grommetIcons.Previous, null),
          onClick: onPreviousMonth
        }), _react.default.createElement(_grommet.Heading, {
          level: 3,
          margin: "none"
        }, currentDate.toLocaleDateString(locale, {
          month: 'long',
          year: 'numeric'
        })), _react.default.createElement(_grommetIcons.Blank, null));
      }
    }), _react.default.createElement(_grommet.Calendar, {
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

        _this3.setState({
          reference1: priorDate,
          reference2: refDate
        });
      },
      header: function header(_ref2) {
        var currentDate = _ref2.date,
            locale = _ref2.locale,
            onNextMonth = _ref2.onNextMonth,
            nextInBound = _ref2.nextInBound;
        return _react.default.createElement(_grommet.Box, {
          direction: "row",
          align: "center",
          justify: "between"
        }, _react.default.createElement(_grommetIcons.Blank, null), _react.default.createElement(_grommet.Heading, {
          level: 3,
          margin: "none"
        }, currentDate.toLocaleDateString(locale, {
          month: 'long',
          year: 'numeric'
        })), _react.default.createElement(_grommet.Button, {
          disabled: !nextInBound,
          icon: _react.default.createElement(_grommetIcons.Next, null),
          onClick: onNextMonth
        }));
      }
    })));
  };

  return DualCalendar;
}(_react.Component);

var CustomHeaderCalendar =
/*#__PURE__*/
function (_Component3) {
  _inheritsLoose(CustomHeaderCalendar, _Component3);

  function CustomHeaderCalendar() {
    var _this4;

    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    _this4 = _Component3.call.apply(_Component3, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this4)), "state", {});

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this4)), "onSelect", function (nextDate) {
      var date = _this4.state.date;

      _this4.setState({
        date: nextDate !== date ? nextDate : undefined
      });
    });

    return _this4;
  }

  var _proto3 = CustomHeaderCalendar.prototype;

  _proto3.render = function render() {
    var date = this.state.date;
    return _react.default.createElement(_grommet.Grommet, {
      theme: _themes.grommet
    }, _react.default.createElement(_grommet.Calendar, {
      date: date,
      onSelect: this.onSelect,
      size: "small",
      bounds: ['2018-09-08', '2018-12-13'],
      header: function header(_ref3) {
        var currentDate = _ref3.date,
            locale = _ref3.locale,
            onPreviousMonth = _ref3.onPreviousMonth,
            onNextMonth = _ref3.onNextMonth,
            previousInBound = _ref3.previousInBound,
            nextInBound = _ref3.nextInBound;
        return _react.default.createElement(_grommet.Box, {
          direction: "row",
          align: "center",
          justify: "between"
        }, _react.default.createElement(_grommet.Button, {
          disabled: !previousInBound,
          onClick: onPreviousMonth
        }, _react.default.createElement(_grommet.Box, null, _react.default.createElement(_grommetIcons.FormPreviousLink, null))), _react.default.createElement(_grommet.Text, {
          size: "small"
        }, _react.default.createElement("strong", null, currentDate.toLocaleDateString(locale, {
          month: 'long',
          year: 'numeric'
        }))), _react.default.createElement(_grommet.Button, {
          disabled: !nextInBound,
          onClick: onNextMonth
        }, _react.default.createElement(_grommet.Box, null, _react.default.createElement(_grommetIcons.FormNextLink, null))));
      }
    }));
  };

  return CustomHeaderCalendar;
}(_react.Component); // DSTCalendar has dates specifically chosen to identify issues with
// crossing the daylight savings time boundary (from California).


var DSTCalendar = function DSTCalendar() {
  return _react.default.createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, _react.default.createElement(_grommet.Calendar, {
    date: "2018-11-04T07:00:00.000Z",
    bounds: ['2013-11-06', '2018-12-06']
  }));
};

(0, _react2.storiesOf)('Calendar', module).add('Simple', function () {
  return _react.default.createElement(SimpleCalendar, null);
}).add('Range', function () {
  return _react.default.createElement(RangeCalendar, null);
}).add('Dual', function () {
  return _react.default.createElement(DualCalendar, null);
}).add('Custom Header', function () {
  return _react.default.createElement(CustomHeaderCalendar, null);
}).add('Daylight Savings Time', function () {
  return _react.default.createElement(DSTCalendar, null);
});