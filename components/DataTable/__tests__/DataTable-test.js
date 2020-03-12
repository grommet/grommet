"use strict";

var _react = _interopRequireDefault(require("react"));

require("jest-styled-components");

var _react2 = require("@testing-library/react");

var _Grommet = require("../../Grommet");

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('DataTable', function () {
  afterEach(_react2.cleanup);
  test('empty', function () {
    var _render = (0, _react2.render)(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.DataTable, null))),
        container = _render.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('basic', function () {
    var _render2 = (0, _react2.render)(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.DataTable, {
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
    }))),
        container = _render2.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('paths', function () {
    var _render3 = (0, _react2.render)(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.DataTable, {
      columns: [{
        property: 'a',
        header: 'A'
      }, {
        property: 'b.c',
        header: 'B'
      }],
      data: [{
        a: 'one',
        b: {
          c: 1
        }
      }, {
        a: 'two',
        b: {
          c: 2
        }
      }]
    }))),
        container = _render3.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('primaryKey', function () {
    var _render4 = (0, _react2.render)(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.DataTable, {
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
      primaryKey: "b"
    }))),
        container = _render4.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('footer', function () {
    var _render5 = (0, _react2.render)(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.DataTable, {
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
    }))),
        container = _render5.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('sort', function () {
    var _render6 = (0, _react2.render)(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.DataTable, {
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
        container = _render6.container,
        getByText = _render6.getByText;

    expect(container.firstChild).toMatchSnapshot();
    var headerCell = getByText('A');

    _react2.fireEvent.click(headerCell, {});

    expect(container.firstChild).toMatchSnapshot();
  });
  test('onSort', function () {
    var onSort = jest.fn();

    var _render7 = (0, _react2.render)(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.DataTable, {
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
      onSort: onSort,
      sortable: true
    }))),
        container = _render7.container,
        getByText = _render7.getByText;

    expect(container.firstChild).toMatchSnapshot();
    var headerCell = getByText('A');

    _react2.fireEvent.click(headerCell, {});

    expect(onSort).toBeCalledWith(expect.objectContaining({
      property: 'a',
      direction: 'asc'
    }));
    expect(container.firstChild).toMatchSnapshot();
  });
  test('search', function () {
    var _render8 = (0, _react2.render)(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.DataTable, {
      columns: [{
        property: 'a',
        header: 'A',
        search: true
      }],
      data: [{
        a: 'Alpha'
      }, {
        a: 'beta'
      }, {
        a: '[]'
      }]
    }))),
        container = _render8.container;

    expect(container.firstChild).toMatchSnapshot();

    _react2.fireEvent.click(container.querySelector('[aria-label="focus-search-a"]'));

    var searchInput = container.querySelector('[name="search-a"]');
    expect(document.activeElement).toBe(searchInput);

    _react2.fireEvent.change(searchInput, {
      target: {
        value: '['
      }
    });

    expect(container.firstChild).toMatchSnapshot();
  });
  test('resizeable', function () {
    var _render9 = (0, _react2.render)(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.DataTable, {
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
    }))),
        container = _render9.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('aggregate', function () {
    var _render10 = (0, _react2.render)(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.DataTable, {
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
    }))),
        container = _render10.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('groupBy', function () {
    var _render11 = (0, _react2.render)(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.DataTable, {
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
        container = _render11.container,
        getByText = _render11.getByText;

    expect(container.firstChild).toMatchSnapshot();
    var headerCell = getByText('A');

    _react2.fireEvent.click(headerCell, {});

    expect(container.firstChild).toMatchSnapshot();
  });
  test('click', function () {
    var onClickRow = jest.fn();

    var _render12 = (0, _react2.render)(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.DataTable, {
      columns: [{
        property: 'a',
        header: 'A'
      }],
      data: [{
        a: 'alpha'
      }, {
        a: 'beta'
      }],
      onClickRow: onClickRow
    }))),
        container = _render12.container,
        getByText = _render12.getByText;

    expect(container.firstChild).toMatchSnapshot();

    _react2.fireEvent.click(getByText('beta'));

    expect(onClickRow).toBeCalledWith(expect.objectContaining({
      datum: {
        a: 'beta'
      }
    }));
    expect(container.firstChild).toMatchSnapshot();
  });
  test('background', function () {
    var _render13 = (0, _react2.render)(_react["default"].createElement(_Grommet.Grommet, null, ['accent-1', ['accent-1', 'accent-2'], {
      header: 'accent-1',
      body: 'accent-2',
      footer: 'accent-3'
    }].map(function (background) {
      return _react["default"].createElement(_.DataTable, {
        key: JSON.stringify(background),
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
        }],
        background: background
      });
    }))),
        container = _render13.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('border', function () {
    var _render14 = (0, _react2.render)(_react["default"].createElement(_Grommet.Grommet, null, [true, 'top', {
      color: 'accent-1',
      side: 'top',
      size: 'small'
    }, {
      header: 'top',
      body: {
        color: 'accent-1',
        side: 'top',
        size: 'small'
      }
    }].map(function (border) {
      return _react["default"].createElement(_.DataTable, {
        key: JSON.stringify(border),
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
        }],
        border: border
      });
    }))),
        container = _render14.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('pad', function () {
    var _render15 = (0, _react2.render)(_react["default"].createElement(_Grommet.Grommet, null, ['small', {
      vertical: 'small',
      horizontal: 'medium'
    }, {
      header: 'small',
      body: {
        vertical: 'small',
        horizontal: 'medium'
      }
    }].map(function (pad) {
      return _react["default"].createElement(_.DataTable, {
        key: JSON.stringify(pad),
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
        }],
        pad: pad
      });
    }))),
        container = _render15.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('rowProps', function () {
    var _render16 = (0, _react2.render)(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.DataTable, {
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
      }],
      rowProps: {
        one: {
          background: 'accent-1',
          border: 'bottom',
          pad: 'large'
        }
      }
    }))),
        container = _render16.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('groupBy property', function () {
    var _render17 = (0, _react2.render)(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.DataTable, {
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
      groupBy: {
        property: 'a'
      }
    }))),
        container = _render17.container,
        getByText = _render17.getByText;

    expect(container.firstChild).toMatchSnapshot();
    var headerCell = getByText('A');

    _react2.fireEvent.click(headerCell, {});

    expect(container.firstChild).toMatchSnapshot();
  });
  test('groupBy expand', function () {
    var _render18 = (0, _react2.render)(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.DataTable, {
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
      primaryKey: "b",
      groupBy: {
        property: 'a',
        expand: ['one']
      }
    }))),
        container = _render18.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('groupBy onExpand', function () {
    var onExpand = jest.fn(function (groupState) {
      return groupState;
    });

    var _render19 = (0, _react2.render)(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.DataTable, {
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
      primaryKey: "b",
      groupBy: {
        property: 'a',
        onExpand: onExpand
      }
    }))),
        getAllByLabelText = _render19.getAllByLabelText;

    var expandButtons = getAllByLabelText('expand');

    _react2.fireEvent.click(expandButtons[1], {});

    expect(onExpand).toBeCalled();
    expect(onExpand.mock.results[0].value).toEqual(['one']);
    expect(onExpand.mock.results[0].value).toMatchSnapshot();
  });
  test('replace', function () {
    var _render20 = (0, _react2.render)(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.DataTable, {
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
      primaryKey: "b",
      step: 2,
      replace: true
    }))),
        container = _render20.container;

    expect(container.firstChild).toMatchSnapshot();
  });
});