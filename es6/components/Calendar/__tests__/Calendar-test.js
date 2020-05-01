import React from 'react';
import renderer from 'react-test-renderer';
import { cleanup, fireEvent, render } from '@testing-library/react';
import 'jest-styled-components';
import { FormNextLink } from "grommet-icons/es6/icons/FormNextLink";
import { FormPreviousLink } from "grommet-icons/es6/icons/FormPreviousLink";
import { Box, Button, Calendar, Grommet, Text } from '../..';
var DATE = '2018-01-15T00:00:00-08:00';
var DATES = ['2018-01-12T00:00:00-08:00', ['2018-01-8T00:00:00-08:00', '2018-01-10T00:00:00-08:00']];
describe('Calendar', function () {
  afterEach(cleanup);
  test('date', function () {
    // need to set the date to avoid snapshot drift over time
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Calendar, {
      date: DATE,
      animate: false
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('dates', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Calendar, {
      dates: DATES,
      animate: false
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('daysOfWeek', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Calendar, {
      daysOfWeek: true,
      dates: DATES,
      animate: false
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('size', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Calendar, {
      size: "small",
      date: DATE,
      animate: false
    }), /*#__PURE__*/React.createElement(Calendar, {
      size: "medium",
      date: DATE,
      animate: false
    }), /*#__PURE__*/React.createElement(Calendar, {
      size: "large",
      date: DATE,
      animate: false
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('firstDayOfWeek', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Calendar, {
      firstDayOfWeek: 0,
      date: DATE,
      animate: false
    }), /*#__PURE__*/React.createElement(Calendar, {
      firstDayOfWeek: 1,
      date: DATE,
      animate: false
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('reference', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Calendar, {
      reference: DATE,
      animate: false
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('header', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Calendar, {
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
        return /*#__PURE__*/React.createElement(Box, {
          direction: "row",
          align: "center",
          justify: "between"
        }, /*#__PURE__*/React.createElement(Button, {
          onClick: previousInBound && onPreviousMonth
        }, /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(FormPreviousLink, null))), /*#__PURE__*/React.createElement(Text, {
          size: "small"
        }, /*#__PURE__*/React.createElement("strong", null, date.toLocaleDateString(locale, {
          month: 'long',
          year: 'numeric'
        }))), /*#__PURE__*/React.createElement(Button, {
          onClick: nextInBound && onNextMonth
        }, /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(FormNextLink, null))));
      },
      animate: false
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('select date', function () {
    var onSelect = jest.fn();

    var _render = render( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Calendar, {
      date: DATE,
      onSelect: onSelect,
      animate: false
    }))),
        getByText = _render.getByText,
        container = _render.container;

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByText('17'));
    expect(onSelect).toBeCalledWith(expect.stringMatching(/^2018-01-17T/));
    expect(container.firstChild).toMatchSnapshot();
  });
  test('select dates', function () {
    var onSelect = jest.fn();

    var _render2 = render( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Calendar, {
      dates: DATES,
      onSelect: onSelect,
      animate: false
    }))),
        getByText = _render2.getByText,
        container = _render2.container;

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByText('17'));
    expect(onSelect).toBeCalledWith(expect.stringMatching(/^2018-01-17T/));
    expect(container.firstChild).toMatchSnapshot();
  });
});