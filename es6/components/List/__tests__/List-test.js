import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { cleanup, render, fireEvent } from '@testing-library/react';
import { Grommet } from '../../Grommet';
import { List } from '..';
describe('List', function () {
  afterEach(cleanup);
  test('empty', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(List, null)));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('data strings', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(List, {
      data: ['one', 'two']
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('data objects', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(List, {
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
  test('onClickItem', function () {
    var onClickItem = jest.fn();

    var _render = render(React.createElement(Grommet, null, React.createElement(List, {
      data: [{
        a: 'alpha'
      }, {
        a: 'beta'
      }],
      onClickItem: onClickItem
    }))),
        container = _render.container,
        getByText = _render.getByText;

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
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(List, {
      data: ['one', 'two'],
      background: "accent-1"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('background array', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(List, {
      data: ['one', 'two', 'three', 'four'],
      background: ['accent-1', 'accent-2']
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('border boolean', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(List, {
      data: ['one', 'two'],
      border: true
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('border side', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(List, {
      data: ['one', 'two'],
      border: "horizontal"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('border object', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(List, {
      data: ['one', 'two'],
      border: {
        color: 'accent-1',
        side: 'horizontal',
        size: 'large'
      }
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('children render', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(List, {
      data: ['one', 'two']
    }, function (item, index) {
      return item + " - " + index;
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('itemProps', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(List, {
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
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('pad string', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(List, {
      data: ['one', 'two'],
      pad: "large"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('pad object', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(List, {
      data: ['one', 'two'],
      pad: {
        horizontal: 'large'
      }
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('primaryKey', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(List, {
      data: [{
        a: 'one',
        b: 1
      }, {
        a: 'two',
        b: 2
      }],
      primaryKey: "a"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('secondaryKey', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(List, {
      data: [{
        a: 'one',
        b: 1
      }, {
        a: 'two',
        b: 2
      }],
      primaryKey: "a",
      secondaryKey: "b"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});