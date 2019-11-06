import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { cleanup, render, fireEvent } from '@testing-library/react';

import { Grommet } from '../../Grommet';
import { List } from '..';

describe('List', () => {
  afterEach(cleanup);

  test('empty', () => {
    const component = renderer.create(
      <Grommet>
        <List />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('data strings', () => {
    const component = renderer.create(
      <Grommet>
        <List data={['one', 'two']} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('data objects', () => {
    const component = renderer.create(
      <Grommet>
        <List data={[{ a: 'one', b: 1 }, { a: 'two', b: 2 }]} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('onClickItem', () => {
    const onClickItem = jest.fn();
    const { container, getByText } = render(
      <Grommet>
        <List
          data={[{ a: 'alpha' }, { a: 'beta' }]}
          onClickItem={onClickItem}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByText('beta'));
    expect(onClickItem).toBeCalledWith(
      expect.objectContaining({ item: { a: 'beta' } }),
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('background string', () => {
    const component = renderer.create(
      <Grommet>
        <List data={['one', 'two']} background="accent-1" />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('background array', () => {
    const component = renderer.create(
      <Grommet>
        <List
          data={['one', 'two', 'three', 'four']}
          background={['accent-1', 'accent-2']}
        />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('border boolean', () => {
    const component = renderer.create(
      <Grommet>
        <List data={['one', 'two']} border />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('border side', () => {
    const component = renderer.create(
      <Grommet>
        <List data={['one', 'two']} border="horizontal" />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('border object', () => {
    const component = renderer.create(
      <Grommet>
        <List
          data={['one', 'two']}
          border={{ color: 'accent-1', side: 'horizontal', size: 'large' }}
        />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('children render', () => {
    const component = renderer.create(
      <Grommet>
        <List data={['one', 'two']}>
          {(item, index) => `${item} - ${index}`}
        </List>
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('itemProps', () => {
    const component = renderer.create(
      <Grommet>
        <List
          data={['one', 'two']}
          itemProps={{
            1: {
              background: 'accent-1',
              border: { side: 'horizontal', size: 'small' },
              pad: 'large',
            },
          }}
        />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('pad string', () => {
    const component = renderer.create(
      <Grommet>
        <List data={['one', 'two']} pad="large" />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('pad object', () => {
    const component = renderer.create(
      <Grommet>
        <List data={['one', 'two']} pad={{ horizontal: 'large' }} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('primaryKey', () => {
    const component = renderer.create(
      <Grommet>
        <List data={[{ a: 'one', b: 1 }, { a: 'two', b: 2 }]} primaryKey="a" />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('secondaryKey', () => {
    const component = renderer.create(
      <Grommet>
        <List
          data={[{ a: 'one', b: 1 }, { a: 'two', b: 2 }]}
          primaryKey="a"
          secondaryKey="b"
        />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
