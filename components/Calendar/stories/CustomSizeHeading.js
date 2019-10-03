"use strict";

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _utils = require("grommet/utils");

var _grommet = require("grommet");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var customHeading = (0, _utils.deepMerge)(_grommet.grommet, {
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
    return _react["default"].createElement(_grommet.Grommet, {
      theme: customHeading
    }, _react["default"].createElement(_grommet.Box, {
      align: "center",
      pad: "large"
    }, _react["default"].createElement(_grommet.Calendar, {
      date: date,
      onSelect: this.onSelect,
      bounds: ['2018-09-08', '2020-12-13']
    })));
  };

  return CustomSizeCalendar;
}(_react.Component);

(0, _react2.storiesOf)('Calendar', module).add('Heading Size', function () {
  return _react["default"].createElement(CustomSizeCalendar, null);
});