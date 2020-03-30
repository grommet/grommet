import React from 'react';
import 'jest-styled-components';
import { cleanup, render, fireEvent } from '@testing-library/react';

import { Grommet } from '../../Grommet';
import { DataTable } from '..';

describe('DataTable', () => {
  afterEach(cleanup);

  test('empty', () => {
    const { container } = render(
      <Grommet>
        <DataTable />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('basic', () => {
    const { container } = render(
      <Grommet>
        <DataTable
          columns={[
            { property: 'a', header: 'A' },
            { property: 'b', header: 'B' },
          ]}
          data={[
            { a: 'one', b: 1 },
            { a: 'two', b: 2 },
          ]}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('!primaryKey', () => {
    const { container } = render(
      <Grommet>
        <DataTable
          columns={[
            { property: 'a', header: 'A' },
            { property: 'b', header: 'B' },
          ]}
          data={[
            { a: 'one', b: 1 },
            { a: 'two', b: 2 },
          ]}
          primaryKey={false}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('paths', () => {
    const { container } = render(
      <Grommet>
        <DataTable
          columns={[
            { property: 'a', header: 'A' },
            { property: 'b.c', header: 'B' },
          ]}
          data={[
            { a: 'one', b: { c: 1 } },
            { a: 'two', b: { c: 2 } },
          ]}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('primaryKey', () => {
    const { container } = render(
      <Grommet>
        <DataTable
          columns={[
            { property: 'a', header: 'A' },
            { property: 'b', header: 'B' },
          ]}
          data={[
            { a: 'one', b: 1 },
            { a: 'two', b: 2 },
          ]}
          primaryKey="b"
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('footer', () => {
    const { container } = render(
      <Grommet>
        <DataTable
          columns={[
            { property: 'a', header: 'A', footer: 'Total' },
            { property: 'b', header: 'B' },
          ]}
          data={[
            { a: 'one', b: 1 },
            { a: 'two', b: 2 },
          ]}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('sort', () => {
    const { container, getByText } = render(
      <Grommet>
        <DataTable
          columns={[
            { property: 'a', header: 'A' },
            { property: 'b', header: 'B' },
          ]}
          data={[
            { a: 'zero', b: 0 },
            { a: 'one', b: 1 },
            { a: 'two', b: 2 },
          ]}
          sortable
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();

    const headerCell = getByText('A');
    fireEvent.click(headerCell, {});
    expect(container.firstChild).toMatchSnapshot();
  });

  test('onSort', () => {
    const onSort = jest.fn();
    const { container, getByText } = render(
      <Grommet>
        <DataTable
          columns={[
            { property: 'a', header: 'A' },
            { property: 'b', header: 'B' },
          ]}
          data={[
            { a: 'zero', b: 0 },
            { a: 'one', b: 1 },
            { a: 'two', b: 2 },
          ]}
          onSort={onSort}
          sortable
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();

    const headerCell = getByText('A');
    fireEvent.click(headerCell, {});
    expect(onSort).toBeCalledWith(
      expect.objectContaining({ property: 'a', direction: 'asc' }),
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('search', () => {
    const { container } = render(
      <Grommet>
        <DataTable
          columns={[{ property: 'a', header: 'A', search: true }]}
          data={[{ a: 'Alpha' }, { a: 'beta' }, { a: '[]' }]}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(container.querySelector('[aria-label="focus-search-a"]'));
    const searchInput = container.querySelector('[name="search-a"]');
    expect(document.activeElement).toBe(searchInput);
    fireEvent.change(searchInput, {
      target: { value: '[' },
    });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('resizeable', () => {
    const { container } = render(
      <Grommet>
        <DataTable
          columns={[
            { property: 'a', header: 'A' },
            { property: 'b', header: 'B' },
          ]}
          data={[
            { a: 'one', b: 1 },
            { a: 'two', b: 2 },
          ]}
          resizeable
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('aggregate', () => {
    const { container } = render(
      <Grommet>
        <DataTable
          columns={[
            { property: 'a', header: 'A' },
            {
              property: 'b',
              header: 'B',
              aggregate: 'sum',
              footer: { aggregate: true },
            },
          ]}
          data={[
            { a: 'one', b: 1 },
            { a: 'two', b: 2 },
          ]}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('groupBy', () => {
    const { container, getByText } = render(
      <Grommet>
        <DataTable
          columns={[
            { property: 'a', header: 'A' },
            { property: 'b', header: 'B' },
          ]}
          data={[
            { a: 'one', b: 1.1 },
            { a: 'one', b: 1.2 },
            { a: 'two', b: 2.1 },
            { a: 'two', b: 2.2 },
          ]}
          groupBy="a"
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();

    const headerCell = getByText('A');
    fireEvent.click(headerCell, {});
    expect(container.firstChild).toMatchSnapshot();
  });

  test('click', () => {
    const onClickRow = jest.fn();
    const { container, getByText } = render(
      <Grommet>
        <DataTable
          columns={[{ property: 'a', header: 'A' }]}
          data={[{ a: 'alpha' }, { a: 'beta' }]}
          onClickRow={onClickRow}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByText('beta'));
    expect(onClickRow).toBeCalledWith(
      expect.objectContaining({ datum: { a: 'beta' } }),
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('background', () => {
    const { container } = render(
      <Grommet>
        {[
          'accent-1',
          ['accent-1', 'accent-2'],
          { header: 'accent-1', body: 'accent-2', footer: 'accent-3' },
        ].map(background => (
          <DataTable
            key={JSON.stringify(background)}
            columns={[
              { property: 'a', header: 'A', footer: 'Total' },
              { property: 'b', header: 'B' },
            ]}
            data={[
              { a: 'one', b: 1 },
              { a: 'two', b: 2 },
            ]}
            background={background}
          />
        ))}
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('border', () => {
    const { container } = render(
      <Grommet>
        {[
          true,
          'top',
          { color: 'accent-1', side: 'top', size: 'small' },
          {
            header: 'top',
            body: { color: 'accent-1', side: 'top', size: 'small' },
          },
        ].map(border => (
          <DataTable
            key={JSON.stringify(border)}
            columns={[
              { property: 'a', header: 'A', footer: 'Total' },
              { property: 'b', header: 'B' },
            ]}
            data={[
              { a: 'one', b: 1 },
              { a: 'two', b: 2 },
            ]}
            border={border}
          />
        ))}
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('pad', () => {
    const { container } = render(
      <Grommet>
        {[
          'small',
          { vertical: 'small', horizontal: 'medium' },
          {
            header: 'small',
            body: { vertical: 'small', horizontal: 'medium' },
          },
        ].map(pad => (
          <DataTable
            key={JSON.stringify(pad)}
            columns={[
              { property: 'a', header: 'A', footer: 'Total' },
              { property: 'b', header: 'B' },
            ]}
            data={[
              { a: 'one', b: 1 },
              { a: 'two', b: 2 },
            ]}
            pad={pad}
          />
        ))}
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('rowProps', () => {
    const { container } = render(
      <Grommet>
        <DataTable
          columns={[
            { property: 'a', header: 'A', footer: 'Total' },
            { property: 'b', header: 'B' },
          ]}
          data={[
            { a: 'one', b: 1 },
            { a: 'two', b: 2 },
          ]}
          rowProps={{
            one: { background: 'accent-1', border: 'bottom', pad: 'large' },
          }}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('groupBy property', () => {
    const { container, getByText } = render(
      <Grommet>
        <DataTable
          columns={[
            { property: 'a', header: 'A' },
            { property: 'b', header: 'B' },
          ]}
          data={[
            { a: 'one', b: 1.1 },
            { a: 'one', b: 1.2 },
            { a: 'two', b: 2.1 },
            { a: 'two', b: 2.2 },
          ]}
          groupBy={{ property: 'a' }}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();

    const headerCell = getByText('A');
    fireEvent.click(headerCell, {});
    expect(container.firstChild).toMatchSnapshot();
  });

  test('groupBy expand', () => {
    const { container } = render(
      <Grommet>
        <DataTable
          columns={[
            { property: 'a', header: 'A' },
            { property: 'b', header: 'B' },
          ]}
          data={[
            { a: 'one', b: 1.1 },
            { a: 'one', b: 1.2 },
            { a: 'two', b: 2.1 },
            { a: 'two', b: 2.2 },
          ]}
          primaryKey="b"
          groupBy={{ property: 'a', expand: ['one'] }}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('groupBy onExpand', () => {
    const onExpand = jest.fn(groupState => groupState);
    const { getAllByLabelText } = render(
      <Grommet>
        <DataTable
          columns={[
            { property: 'a', header: 'A' },
            { property: 'b', header: 'B' },
          ]}
          data={[
            { a: 'one', b: 1.1 },
            { a: 'one', b: 1.2 },
            { a: 'two', b: 2.1 },
            { a: 'two', b: 2.2 },
          ]}
          primaryKey="b"
          groupBy={{ property: 'a', onExpand }}
        />
      </Grommet>,
    );

    const expandButtons = getAllByLabelText('expand');
    fireEvent.click(expandButtons[1], {});

    expect(onExpand).toBeCalled();
    expect(onExpand.mock.results[0].value).toEqual(['one']);
    expect(onExpand.mock.results[0].value).toMatchSnapshot();
  });

  test('replace', () => {
    const { container } = render(
      <Grommet>
        <DataTable
          columns={[
            { property: 'a', header: 'A' },
            { property: 'b', header: 'B' },
          ]}
          data={[
            { a: 'one', b: 1.1 },
            { a: 'one', b: 1.2 },
            { a: 'two', b: 2.1 },
            { a: 'two', b: 2.2 },
          ]}
          primaryKey="b"
          step={2}
          replace
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
