"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

require("jest-styled-components");

var _reactTestingLibrary = require("react-testing-library");

var _Grommet = require("../../Grommet");

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('DataTable', function () {
  afterEach(_reactTestingLibrary.cleanup);
  test('empty', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.DataTable, null)));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('basic', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.DataTable, {
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
    var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.DataTable, {
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
    var _render = (0, _reactTestingLibrary.render)(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.DataTable, {
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

    _reactTestingLibrary.fireEvent.click(headerCell, {});

    expect(container.firstChild).toMatchSnapshot();
  });
  test('resizeable', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.DataTable, {
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
    var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.DataTable, {
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
    var _render2 = (0, _reactTestingLibrary.render)(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.DataTable, {
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

    _reactTestingLibrary.fireEvent.click(headerCell, {});

    expect(container.firstChild).toMatchSnapshot();
  });
});