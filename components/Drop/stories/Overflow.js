"use strict";

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

    _defineProperty(_assertThisInitialized(_this), "targetRef", (0, _react.createRef)());

    _defineProperty(_assertThisInitialized(_this), "inputRef", (0, _react.createRef)());

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
    return _react.default.createElement(_grommet.Grommet, {
      theme: _themes.grommet,
      full: true
    }, _react.default.createElement(_grommet.Box, {
      fill: true,
      align: "center",
      justify: "center"
    }, _react.default.createElement(_grommet.Box, {
      background: "dark-3",
      pad: "medium",
      align: "center",
      justify: "start",
      ref: this.targetRef
    }, "Target"), this.targetRef.current && _react.default.createElement(_grommet.Drop, {
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
    }, _react.default.createElement(_grommet.Box, {
      height: "small"
    }, _react.default.createElement(_grommet.Heading, {
      level: 4
    }, "Select Start Date"), _react.default.createElement("div", {
      style: {
        position: 'relative'
      }
    }, _react.default.createElement(_grommet.TextInput, {
      ref: this.inputRef,
      value: date || '',
      placeholder: "Focus on me",
      onFocus: function onFocus() {
        return _this2.setState({
          showCalendar: true
        });
      }
    }), showCalendar && _react.default.createElement("div", {
      style: {
        position: 'absolute',
        background: '#eee'
      }
    }, _react.default.createElement(_grommet.Calendar, {
      date: date,
      onSelect: this.onSelect,
      size: "small"
    })))))));
  };

  return OverflowDrop;
}(_react.Component);

(0, _react2.storiesOf)('Drop', module).add('Overflow', function () {
  return _react.default.createElement(OverflowDrop, null);
});