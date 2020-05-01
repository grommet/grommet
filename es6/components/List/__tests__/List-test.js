import React from 'react';
import 'jest-styled-components';
import { cleanup, render, fireEvent } from '@testing-library/react';
import { Grommet } from '../../Grommet';
import { List } from '..';
describe('List', function () {
  afterEach(cleanup);
  test('empty', function () {
    var _render = render( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(List, null))),
        container = _render.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('data strings', function () {
    var _render2 = render( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(List, {
      data: ['one', 'two']
    }))),
        container = _render2.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('data objects', function () {
    var _render3 = render( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(List, {
      data: [{
        a: 'one',
        b: 1
      }, {
        a: 'two',
        b: 2
      }]
    }))),
        container = _render3.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('onClickItem', function () {
    var onClickItem = jest.fn();

    var _render4 = render( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(List, {
      data: [{
        a: 'alpha'
      }, {
        a: 'beta'
      }],
      onClickItem: onClickItem
    }))),
        container = _render4.container,
        getByText = _render4.getByText;

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByText('beta'));
    expect(onClickItem).toBeCalledWith(expect.objectContaining({
      item: {
        a: 'beta'
      }
    }));
    expect(container.firstChild).toMatchSnapshot();
  });
  test('background string', function () {
    var _render5 = render( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(List, {
      data: ['one', 'two'],
      background: "accent-1"
    }))),
        container = _render5.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('background array', function () {
    var _render6 = render( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(List, {
      data: ['one', 'two', 'three', 'four'],
      background: ['accent-1', 'accent-2']
    }))),
        container = _render6.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('border boolean', function () {
    var _render7 = render( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(List, {
      data: ['one', 'two'],
      border: true
    }))),
        container = _render7.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('border side', function () {
    var _render8 = render( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(List, {
      data: ['one', 'two'],
      border: "horizontal"
    }))),
        container = _render8.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('border object', function () {
    var _render9 = render( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(List, {
      data: ['one', 'two'],
      border: {
        color: 'accent-1',
        side: 'horizontal',
        size: 'large'
      }
    }))),
        container = _render9.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('children render', function () {
    var _render10 = render( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(List, {
      data: ['one', 'two']
    }, function (item, index) {
      return item + " - " + index;
    }))),
        container = _render10.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('itemProps', function () {
    var _render11 = render( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(List, {
      data: ['one', 'two'],
      itemProps: {
        1: {
          background: 'accent-1',
          border: {
            side: 'horizontal',
            size: 'small'
          },
          pad: 'large'
        }
      }
    }))),
        container = _render11.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('margin string', function () {
    var _render12 = render( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(List, {
      data: ['one', 'two'],
      margin: "large"
    }))),
        container = _render12.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('margin object', function () {
    var _render13 = render( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(List, {
      data: ['one', 'two'],
      margin: {
        horizontal: 'large'
      }
    }))),
        container = _render13.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('pad string', function () {
    var _render14 = render( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(List, {
      data: ['one', 'two'],
      pad: "large"
    }))),
        container = _render14.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('pad object', function () {
    var _render15 = render( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(List, {
      data: ['one', 'two'],
      pad: {
        horizontal: 'large'
      }
    }))),
        container = _render15.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('primaryKey', function () {
    var _render16 = render( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(List, {
      data: [{
        a: 'one',
        b: 1
      }, {
        a: 'two',
        b: 2
      }],
      primaryKey: "a"
    }))),
        container = _render16.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('secondaryKey', function () {
    var _render17 = render( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(List, {
      data: [{
        a: 'one',
        b: 1
      }, {
        a: 'two',
        b: 2
      }],
      primaryKey: "a",
      secondaryKey: "b"
    }))),
        container = _render17.container;

    expect(container.firstChild).toMatchSnapshot();
  });
});