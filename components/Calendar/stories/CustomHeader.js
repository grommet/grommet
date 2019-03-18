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
    return _react.default.createElement(_grommet.Grommet, {
      theme: _themes.grommet
    }, _react.default.createElement(_grommet.Box, {
      align: "center",
      pad: "large"
    }, _react.default.createElement(_grommet.Calendar, {
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
    })));
  };

  return CustomHeaderCalendar;
}(_react.Component);

(0, _react2.storiesOf)('Calendar', module).add('Custom Header', function () {
  return _react.default.createElement(CustomHeaderCalendar, null);
});