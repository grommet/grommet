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

  test('strings', () => {
    const component = renderer.create(
      <Grommet>
        <List data={['one', 'two']} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('objects', () => {
    const component = renderer.create(
      <Grommet>
        <List data={[{ a: 'one', b: 1 }, { a: 'two', b: 2 }]} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('click', () => {
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
});
