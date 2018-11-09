import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { cleanup, render, fireEvent } from 'react-testing-library';
import { Grommet } from '../../Grommet';
import { DataTable } from '..';
describe('DataTable', function () {
  afterEach(cleanup);
  test('empty', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(DataTable, null)));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('basic', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(DataTable, {
      columns: [{
        property: 'a',
        header: 'A'
      }, {
        property: 'b',
        header: 'B'
      }],
      data: [{
        a: 'one',
        b: 1
      }, {
        a: 'two',
        b: 2
      }]
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('footer', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(DataTable, {
      columns: [{
        property: 'a',
        header: 'A',
        footer: 'Total'
      }, {
        property: 'b',
        header: 'B'
      }],
      data: [{
        a: 'one',
        b: 1
      }, {
        a: 'two',
        b: 2
      }]
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('sort', function () {
    var _render = render(React.createElement(Grommet, null, React.createElement(DataTable, {
      columns: [{
        property: 'a',
        header: 'A'
      }, {
        property: 'b',
        header: 'B'
      }],
      data: [{
        a: 'zero',
        b: 0
      }, {
        a: 'one',
        b: 1
      }, {
        a: 'two',
        b: 2
      }],
      sortable: true
    }))),
        container = _render.container,
        getByText = _render.getByText;

    expect(container.firstChild).toMatchSnapshot();
    var headerCell = getByText('A');
    fireEvent.click(headerCell, {});
    expect(container.firstChild).toMatchSnapshot();
  });
  test('resizeable', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(DataTable, {
      columns: [{
        property: 'a',
        header: 'A'
      }, {
        property: 'b',
        header: 'B'
      }],
      data: [{
        a: 'one',
        b: 1
      }, {
        a: 'two',
        b: 2
      }],
      resizeable: true
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('aggregate', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(DataTable, {
      columns: [{
        property: 'a',
        header: 'A'
      }, {
        property: 'b',
        header: 'B',
        aggregate: 'sum',
        footer: {
          aggregate: true
        }
      }],
      data: [{
        a: 'one',
        b: 1
      }, {
        a: 'two',
        b: 2
      }]
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('groupBy', function () {
    var _render2 = render(React.createElement(Grommet, null, React.createElement(DataTable, {
      columns: [{
        property: 'a',
        header: 'A'
      }, {
        property: 'b',
        header: 'B'
      }],
      data: [{
        a: 'one',
        b: 1.1
      }, {
        a: 'one',
        b: 1.2
      }, {
        a: 'two',
        b: 2.1
      }, {
        a: 'two',
        b: 2.2
      }],
      groupBy: "a"
    }))),
        container = _render2.container,
        getByText = _render2.getByText;

    expect(container.firstChild).toMatchSnapshot();
    var headerCell = getByText('A');
    fireEvent.click(headerCell, {});
    expect(container.firstChild).toMatchSnapshot();
  });
});