"use strict";

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

var _grommetIcons = require("grommet-icons");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
    return _react.default.createElement(_grommet.Grommet, {
      theme: _themes.grommet
    }, _react.default.createElement(_grommet.Box, {
      justify: "center",
      pad: "large",
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

(0, _react2.storiesOf)('Calendar', module).add('Dual', function () {
  return _react.default.createElement(DualCalendar, null);
});