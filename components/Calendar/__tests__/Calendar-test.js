"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

var _react2 = require("@testing-library/react");

require("jest-styled-components");

var _grommetIcons = require("grommet-icons");

var _ = require("../..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var DATE = '2018-01-15T00:00:00-08:00';
var DATES = ['2018-01-12T00:00:00-08:00', ['2018-01-8T00:00:00-08:00', '2018-01-10T00:00:00-08:00']];
describe('Calendar', function () {
  afterEach(_react2.cleanup);
  test('date', function () {
    // need to set the date to avoid snapshot drift over time
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Calendar, {
      date: DATE,
      animate: false
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('dates', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Calendar, {
      dates: DATES,
      animate: false
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('daysOfWeek', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Calendar, {
      daysOfWeek: true,
      dates: DATES,
      animate: false
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('size', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Calendar, {
      size: "small",
      date: DATE,
      animate: false
    }), /*#__PURE__*/_react["default"].createElement(_.Calendar, {
      size: "medium",
      date: DATE,
      animate: false
    }), /*#__PURE__*/_react["default"].createElement(_.Calendar, {
      size: "large",
      date: DATE,
      animate: false
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('firstDayOfWeek', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Calendar, {
      firstDayOfWeek: 0,
      date: DATE,
      animate: false
    }), /*#__PURE__*/_react["default"].createElement(_.Calendar, {
      firstDayOfWeek: 1,
      date: DATE,
      animate: false
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('reference', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Calendar, {
      reference: DATE,
      animate: false
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('header', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Calendar, {
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
        return /*#__PURE__*/_react["default"].createElement(_.Box, {
          direction: "row",
          align: "center",
          justify: "between"
        }, /*#__PURE__*/_react["default"].createElement(_.Button, {
          onClick: previousInBound && onPreviousMonth
        }, /*#__PURE__*/_react["default"].createElement(_.Box, null, /*#__PURE__*/_react["default"].createElement(_grommetIcons.FormPreviousLink, null))), /*#__PURE__*/_react["default"].createElement(_.Text, {
          size: "small"
        }, /*#__PURE__*/_react["default"].createElement("strong", null, date.toLocaleDateString(locale, {
          month: 'long',
          year: 'numeric'
        }))), /*#__PURE__*/_react["default"].createElement(_.Button, {
          onClick: nextInBound && onNextMonth
        }, /*#__PURE__*/_react["default"].createElement(_.Box, null, /*#__PURE__*/_react["default"].createElement(_grommetIcons.FormNextLink, null))));
      },
      animate: false
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('select date', function () {
    var onSelect = jest.fn();

    var _render = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Calendar, {
      date: DATE,
      onSelect: onSelect,
      animate: false
    }))),
        getByText = _render.getByText,
        container = _render.container;

    expect(container.firstChild).toMatchSnapshot();

    _react2.fireEvent.click(getByText('17'));

    expect(onSelect).toBeCalledWith(expect.stringMatching(/^2018-01-17T/));
    expect(container.firstChild).toMatchSnapshot();
  });
  test('select dates', function () {
    var onSelect = jest.fn();

    var _render2 = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Calendar, {
      dates: DATES,
      onSelect: onSelect,
      animate: false
    }))),
        getByText = _render2.getByText,
        container = _render2.container;

    expect(container.firstChild).toMatchSnapshot();

    _react2.fireEvent.click(getByText('17'));

    expect(onSelect).toBeCalledWith(expect.stringMatching(/^2018-01-17T/));
    expect(container.firstChild).toMatchSnapshot();
  });
});