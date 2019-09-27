import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { cleanup, render, fireEvent } from '@testing-library/react';
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
  test('paths', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(DataTable, {
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
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('primaryKey', function () {
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
      primaryKey: "b"
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
  test('search', function () {
    var _render2 = render(React.createElement(Grommet, null, React.createElement(DataTable, {
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
        container = _render2.container;

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(container.querySelector('[aria-label="focus-search-a"]'));
    var searchInput = container.querySelector('[name="search-a"]');
    expect(document.activeElement).toBe(searchInput);
    fireEvent.change(searchInput, {
      target: {
        value: '['
      }
    });
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
    var _render3 = render(React.createElement(Grommet, null, React.createElement(DataTable, {
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
        container = _render3.container,
        getByText = _render3.getByText;

    expect(container.firstChild).toMatchSnapshot();
    var headerCell = getByText('A');
    fireEvent.click(headerCell, {});
    expect(container.firstChild).toMatchSnapshot();
  });
  test('click', function () {
    var onClickRow = jest.fn();

    var _render4 = render(React.createElement(Grommet, null, React.createElement(DataTable, {
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
        container = _render4.container,
        getByText = _render4.getByText;

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByText('beta'));
    expect(onClickRow).toBeCalledWith(expect.objectContaining({
      datum: {
        a: 'beta'
      }
    }));
    expect(container.firstChild).toMatchSnapshot();
  });
  test('background', function () {
    var component = renderer.create(React.createElement(Grommet, null, ['accent-1', ['accent-1', 'accent-2'], {
      header: 'accent-1',
      body: 'accent-2',
      footer: 'accent-3'
    }].map(function (background) {
      return React.createElement(DataTable, {
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
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('border', function () {
    var component = renderer.create(React.createElement(Grommet, null, [true, 'top', {
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
      return React.createElement(DataTable, {
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
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('pad', function () {
    var component = renderer.create(React.createElement(Grommet, null, ['small', {
      vertical: 'small',
      horizontal: 'medium'
    }, {
      header: 'small',
      body: {
        vertical: 'small',
        horizontal: 'medium'
      }
    }].map(function (pad) {
      return React.createElement(DataTable, {
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
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('rowProps', function () {
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
      }],
      rowProps: {
        one: {
          background: 'accent-1',
          border: 'bottom',
          pad: 'large'
        }
      }
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('groupBy property', function () {
    var _render5 = render(React.createElement(Grommet, null, React.createElement(DataTable, {
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
        container = _render5.container,
        getByText = _render5.getByText;

    expect(container.firstChild).toMatchSnapshot();
    var headerCell = getByText('A');
    fireEvent.click(headerCell, {});
    expect(container.firstChild).toMatchSnapshot();
  });
  test('groupBy expand', function () {
    var _render6 = render(React.createElement(Grommet, null, React.createElement(DataTable, {
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
        container = _render6.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('groupBy onExpand', function () {
    var onExpand = jest.fn(function (groupState) {
      return groupState;
    });

    var _render7 = render(React.createElement(Grommet, null, React.createElement(DataTable, {
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
        getAllByLabelText = _render7.getAllByLabelText;

    var expandButtons = getAllByLabelText('expand');
    fireEvent.click(expandButtons[1], {});
    expect(onExpand).toBeCalled();
    expect(onExpand.mock.results[0].value).toEqual(['one']);
    expect(onExpand.mock.results[0].value).toMatchSnapshot();
  });
  test('replace', function () {
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
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});