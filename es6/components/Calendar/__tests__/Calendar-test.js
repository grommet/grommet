import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { FormNextLink } from "grommet-icons/es6/icons/FormNextLink";
import { FormPreviousLink } from "grommet-icons/es6/icons/FormPreviousLink";
import { Box, Button, Calendar, Grommet, Text } from '../..';
var DATE = '2018-01-15T00:00:00-08:00';
var DATES = ['2018-01-12T00:00:00-08:00', ['2018-01-8T00:00:00-08:00', '2018-01-10T00:00:00-08:00']];
describe('Calendar', function () {
  test('date', function () {
    // need to set the date to avoid snapshot drift over time
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Calendar, {
      date: DATE
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('dates', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Calendar, {
      dates: DATES
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('size', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Calendar, {
      size: "small",
      date: DATE
    }), React.createElement(Calendar, {
      size: "medium",
      date: DATE
    }), React.createElement(Calendar, {
      size: "large",
      date: DATE
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('firstDayOfWeek', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Calendar, {
      firstDayOfWeek: 0,
      date: DATE
    }), React.createElement(Calendar, {
      firstDayOfWeek: 1,
      date: DATE
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('reference', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Calendar, {
      reference: DATE
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('header', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Calendar, {
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
        return React.createElement(Box, {
          direction: "row",
          align: "center",
          justify: "between"
        }, React.createElement(Button, {
          onClick: previousInBound && onPreviousMonth
        }, React.createElement(Box, null, React.createElement(FormPreviousLink, null))), React.createElement(Text, {
          size: "small"
        }, React.createElement("strong", null, date.toLocaleDateString(locale, {
          month: 'long',
          year: 'numeric'
        }))), React.createElement(Button, {
          onClick: nextInBound && onNextMonth
        }, React.createElement(Box, null, React.createElement(FormNextLink, null))));
      }
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});