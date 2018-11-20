"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

require("jest-styled-components");

var _grommetIcons = require("grommet-icons");

var _ = require("../..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DATE = '2018-01-15T00:00:00-08:00';
var DATES = ['2018-01-12T00:00:00-08:00', ['2018-01-8T00:00:00-08:00', '2018-01-10T00:00:00-08:00']];
describe('Calendar', function () {
  test('date', function () {
    // need to set the date to avoid snapshot drift over time
    var component = _reactTestRenderer.default.create(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Calendar, {
      date: DATE
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('dates', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Calendar, {
      dates: DATES
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('size', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Calendar, {
      size: "small",
      date: DATE
    }), _react.default.createElement(_.Calendar, {
      size: "medium",
      date: DATE
    }), _react.default.createElement(_.Calendar, {
      size: "large",
      date: DATE
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('firstDayOfWeek', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Calendar, {
      firstDayOfWeek: 0,
      date: DATE
    }), _react.default.createElement(_.Calendar, {
      firstDayOfWeek: 1,
      date: DATE
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('reference', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Calendar, {
      reference: DATE
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('header', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Calendar, {
      date: DATE,
      onSelect: function onSelect() {},
      size: "small",
      bounds: ['2018-09-08', '2018-12-13'],
      header: function header(_ref) {
        var date = _ref.date,
            locale = _ref.locale,
            onPreviousMonth = _ref.onPreviousMonth,
            onNextMonth = _ref.onNextMonth,
            previousInBound = _ref.previousInBound,
            nextInBound = _ref.nextInBound;
        return _react.default.createElement(_.Box, {
          direction: "row",
          align: "center",
          justify: "between"
        }, _react.default.createElement(_.Button, {
          onClick: previousInBound && onPreviousMonth
        }, _react.default.createElement(_.Box, null, _react.default.createElement(_grommetIcons.FormPreviousLink, null))), _react.default.createElement(_.Text, {
          size: "small"
        }, _react.default.createElement("strong", null, date.toLocaleDateString(locale, {
          month: 'long',
          year: 'numeric'
        }))), _react.default.createElement(_.Button, {
          onClick: nextInBound && onNextMonth
        }, _react.default.createElement(_.Box, null, _react.default.createElement(_grommetIcons.FormNextLink, null))));
      }
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});