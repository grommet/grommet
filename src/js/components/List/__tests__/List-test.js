import React from 'react';
import 'jest-styled-components';
import { cleanup, render, fireEvent } from '@testing-library/react';

import { MnetUIBase } from '../../MnetUIBase';
import { List } from '..';

describe('List', () => {
  afterEach(cleanup);

  test('empty', () => {
    const { container } = render(
      <MnetUIBase>
        <List />
      </MnetUIBase>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('data strings', () => {
    const { container } = render(
      <MnetUIBase>
        <List data={['one', 'two']} />
      </MnetUIBase>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('data objects', () => {
    const { container } = render(
      <MnetUIBase>
        <List
          data={[
            { a: 'one', b: 1 },
            { a: 'two', b: 2 },
          ]}
        />
      </MnetUIBase>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('onClickItem', () => {
    const onClickItem = jest.fn();
    const { container, getByText } = render(
      <MnetUIBase>
        <List
          data={[{ a: 'alpha' }, { a: 'beta' }]}
          onClickItem={onClickItem}
        />
      </MnetUIBase>,
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
      <MnetUIBase>
        <List data={['one', 'two']} background="accent-1" />
      </MnetUIBase>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('background array', () => {
    const { container } = render(
      <MnetUIBase>
        <List
          data={['one', 'two', 'three', 'four']}
          background={['accent-1', 'accent-2']}
        />
      </MnetUIBase>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('border boolean', () => {
    const { container } = render(
      <MnetUIBase>
        <List data={['one', 'two']} border />
      </MnetUIBase>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('border side', () => {
    const { container } = render(
      <MnetUIBase>
        <List data={['one', 'two']} border="horizontal" />
      </MnetUIBase>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('border object', () => {
    const { container } = render(
      <MnetUIBase>
        <List
          data={['one', 'two']}
          border={{ color: 'accent-1', side: 'horizontal', size: 'large' }}
        />
      </MnetUIBase>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('children render', () => {
    const { container } = render(
      <MnetUIBase>
        <List data={['one', 'two']}>
          {(item, index) => `${item} - ${index}`}
        </List>
      </MnetUIBase>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('itemProps', () => {
    const { container } = render(
      <MnetUIBase>
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
      </MnetUIBase>,
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
      <MnetUIBase>
        <List data={['one', 'two']} pad="large" />
      </MnetUIBase>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('pad object', () => {
    const { container } = render(
      <MnetUIBase>
        <List data={['one', 'two']} pad={{ horizontal: 'large' }} />
      </MnetUIBase>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('primaryKey', () => {
    const { container } = render(
      <MnetUIBase>
        <List
          data={[
            { a: 'one', b: 1 },
            { a: 'two', b: 2 },
          ]}
          primaryKey="a"
        />
      </MnetUIBase>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('secondaryKey', () => {
    const { container } = render(
      <MnetUIBase>
        <List
          data={[
            { a: 'one', b: 1 },
            { a: 'two', b: 2 },
          ]}
          primaryKey="a"
          secondaryKey="b"
        />
      </MnetUIBase>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
