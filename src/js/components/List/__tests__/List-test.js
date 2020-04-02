import React from 'react';
import 'jest-styled-components';
import { cleanup, render, fireEvent } from '@testing-library/react';

import { Grommet } from '../../Grommet';
import { List } from '..';

describe('List', () => {
  afterEach(cleanup);

  test('empty', () => {
    const { container } = render(
      <Grommet>
        <List />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('data strings', () => {
    const { container } = render(
      <Grommet>
        <List data={['one', 'two']} />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('data objects', () => {
    const { container } = render(
      <Grommet>
        <List
          data={[
            { a: 'one', b: 1 },
            { a: 'two', b: 2 },
          ]}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
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
    const { container } = render(
      <Grommet>
        <List data={['one', 'two']} background="accent-1" />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('background array', () => {
    const { container } = render(
      <Grommet>
        <List
          data={['one', 'two', 'three', 'four']}
          background={['accent-1', 'accent-2']}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('border boolean', () => {
    const { container } = render(
      <Grommet>
        <List data={['one', 'two']} border />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('border side', () => {
    const { container } = render(
      <Grommet>
        <List data={['one', 'two']} border="horizontal" />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('border object', () => {
    const { container } = render(
      <Grommet>
        <List
          data={['one', 'two']}
          border={{ color: 'accent-1', side: 'horizontal', size: 'large' }}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('children render', () => {
    const { container } = render(
      <Grommet>
        <List data={['one', 'two']}>
          {(item, index) => `${item} - ${index}`}
        </List>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('itemProps', () => {
    const { container } = render(
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
    expect(container.firstChild).toMatchSnapshot();
  });

  test('margin string', () => {
    const { container } = render(
      <Grommet>
        <List data={['one', 'two']} margin="large" />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('margin object', () => {
    const { container } = render(
      <Grommet>
        <List data={['one', 'two']} margin={{ horizontal: 'large' }} />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('pad string', () => {
    const { container } = render(
      <Grommet>
        <List data={['one', 'two']} pad="large" />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('pad object', () => {
    const { container } = render(
      <Grommet>
        <List data={['one', 'two']} pad={{ horizontal: 'large' }} />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('primaryKey', () => {
    const { container } = render(
      <Grommet>
        <List
          data={[
            { a: 'one', b: 1 },
            { a: 'two', b: 2 },
          ]}
          primaryKey="a"
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('secondaryKey', () => {
    const { container } = render(
      <Grommet>
        <List
          data={[
            { a: 'one', b: 1 },
            { a: 'two', b: 2 },
          ]}
          primaryKey="a"
          secondaryKey="b"
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
