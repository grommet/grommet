import React from 'react';
import 'jest-styled-components';
import { cleanup, render, fireEvent } from '@testing-library/react';

import { Grommet } from '../../Grommet';
import { Box } from '../../Box';
import { Text } from '../../Text';
import { DataTable } from '..';

const DATA = [];
for (let i = 0; i < 95; i += 1) {
  DATA.push({ a: `entry-${i}`, b: i });
}

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

  test('sortable', () => {
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

  test('onSort external', () => {
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
          sort={{ property: 'a', direction: 'asc', external: true }}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();

    const headerCell = getByText('A');
    fireEvent.click(headerCell, {});
    expect(onSort).toBeCalledWith(
      expect.objectContaining({
        property: 'a',
        direction: 'desc',
        external: true,
      }),
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('sort', () => {
    const { container } = render(
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
          sort={{ property: 'a', direction: 'asc' }}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('sort nested object', () => {
    const { container, getByText } = render(
      <Grommet>
        <DataTable
          columns={[
            { property: 'a', header: 'A' },
            {
              property: 'b.value',
              header: 'Value',
              render: datum => datum.b && datum.b.value,
            },
          ]}
          data={[
            { a: 'zero', b: { value: 1 } },
            { a: 'one', b: { value: 2 } },
            { a: 'two', b: { value: 3 } },
          ]}
          sort={{ property: 'b.value', direction: 'asc' }}
        />
      </Grommet>,
    );

    expect(container.querySelectorAll('td').item(0).textContent).toBe('1');
    expect(container.querySelectorAll('td').item(1).textContent).toBe('2');
    expect(container.querySelectorAll('td').item(2).textContent).toBe('3');

    fireEvent.click(getByText('Value'));

    expect(container.querySelectorAll('td').item(0).textContent).toBe('3');
    expect(container.querySelectorAll('td').item(1).textContent).toBe('2');
    expect(container.querySelectorAll('td').item(2).textContent).toBe('1');

    expect(container.firstChild).toMatchSnapshot();
  });

  test('sort nested object with onSort', () => {
    const onSort = jest.fn();
    const { container, getByText } = render(
      <Grommet>
        <DataTable
          columns={[
            { property: 'a', header: 'A' },
            {
              property: 'b.value',
              header: 'Value',
              render: datum => datum.b && datum.b.value,
            },
          ]}
          data={[
            { a: 'zero', b: { value: 1 } },
            { a: 'one', b: { value: 2 } },
            { a: 'two', b: { value: 3 } },
          ]}
          onSort={onSort}
          sort={{ property: 'b.value', direction: 'asc' }}
        />
      </Grommet>,
    );

    expect(container.querySelectorAll('td').item(0).textContent).toBe('1');
    expect(container.querySelectorAll('td').item(1).textContent).toBe('2');
    expect(container.querySelectorAll('td').item(2).textContent).toBe('3');

    fireEvent.click(getByText('Value'));

    expect(onSort).toBeCalledWith(
      expect.objectContaining({ property: 'b.value' }),
    );

    expect(container.querySelectorAll('td').item(0).textContent).toBe('3');
    expect(container.querySelectorAll('td').item(1).textContent).toBe('2');
    expect(container.querySelectorAll('td').item(2).textContent).toBe('1');

    expect(container.firstChild).toMatchSnapshot();
  });

  test('sort external', () => {
    const { container } = render(
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
          sort={{ property: 'a', direction: 'asc', external: true }}
        />
      </Grommet>,
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
    fireEvent.click(container.querySelector('[aria-label="Open search by a"]'));
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

  test('aggregate with nested object', () => {
    const { container, getByText } = render(
      <Grommet>
        <DataTable
          columns={[
            { property: 'a', header: 'A' },
            {
              property: 'obj.value',
              header: 'object',
              aggregate: 'sum',
              footer: { aggregate: true },
            },
            {
              property: 'obj2.value',
              header: 'object 2',
              render: datum => datum.obj2.value,
            },
          ]}
          data={[
            { a: 'one', obj: { value: 1 }, obj2: { value: 10 } },
            { a: 'two', obj: { value: 2 }, obj2: { value: 20 } },
          ]}
        />
      </Grommet>,
    );
    expect(getByText('3')).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('rowDetails', () => {
    const { container, getAllByLabelText } = render(
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
          rowDetails={row => <Box>{row.a}</Box>}
          primaryKey="b"
        />
      </Grommet>,
    );
    const expandButtons = getAllByLabelText('expand');
    fireEvent.click(expandButtons[1], {});
    expect(container.firstChild).toMatchSnapshot();
  });

  test('rowDetails condtional', () => {
    const { container, getAllByLabelText } = render(
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
          rowDetails={row => {
            if (row.b === '1.1') {
              return <Box> {row.a} </Box>;
            }
            return (
              <Box>
                {row.a} : {row.b}{' '}
              </Box>
            );
          }}
          primaryKey="b"
        />
      </Grommet>,
    );
    const expandButtons = getAllByLabelText('expand');
    fireEvent.click(expandButtons[1], {});
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

  test('themeColumnSizes', () => {
    const { container } = render(
      <Grommet>
        <DataTable
          columns={[
            { property: 'a', header: 'A', size: 'medium' },
            { property: 'b', header: 'B', size: 'small' },
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

  test('absoluteColumnSizes', () => {
    const { container } = render(
      <Grommet>
        <DataTable
          columns={[
            { property: 'a', header: 'A', size: '400px' },
            { property: 'b', header: 'B', size: '200px' },
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

  test('relativeColumnSizes', () => {
    const { container } = render(
      <Grommet>
        <DataTable
          columns={[
            { property: 'a', header: 'A', size: '2/3' },
            { property: 'b', header: 'B', size: '1/3' },
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

  test('fill', () => {
    const { container } = render(
      <Grommet>
        {[true, 'horizontal', 'vertical'].map(fill => (
          <DataTable
            key={JSON.stringify(fill)}
            columns={[
              { property: 'a', header: 'A', footer: 'Total' },
              { property: 'b', header: 'B' },
            ]}
            data={[
              { a: 'one', b: 1 },
              { a: 'two', b: 2 },
            ]}
            fill={fill}
          />
        ))}
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('pin', () => {
    const { container } = render(
      <Grommet>
        {[true, 'header', 'footer'].map(pin => (
          <DataTable
            key={JSON.stringify(pin)}
            columns={[
              { property: 'a', header: 'A', footer: 'Total', pin: true },
              { property: 'b', header: 'B' },
            ]}
            data={[
              { a: 'one', b: 1 },
              { a: 'two', b: 2 },
            ]}
            pin={pin}
          />
        ))}
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('pin + background', () => {
    const theme = {
      dataTable: {
        pinned: {
          header: {
            background: {
              color: 'blue',
            },
          },
          footer: {
            background: {
              color: 'green',
            },
          },
        },
      },
    };

    const { container } = render(
      <Grommet theme={theme}>
        {[true, 'header', 'footer'].map(pin => (
          <DataTable
            background={{ pinned: 'red' }}
            key={JSON.stringify(pin)}
            columns={[
              { property: 'a', header: 'A', footer: 'Total', pin: true },
              { property: 'b', header: 'B' },
            ]}
            data={[
              { a: 'one', b: 1 },
              { a: 'two', b: 2 },
            ]}
            pin={pin}
          />
        ))}
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('pin + background context', () => {
    const { container } = render(
      <Grommet>
        {[
          'background-back',
          'background-front',
          { color: 'background-back', dark: true },
        ].map(contextBackground => (
          <Box key={contextBackground} background={contextBackground}>
            <DataTable
              columns={[
                { property: 'a', header: 'A', footer: 'Total', pin: true },
                { property: 'b', header: 'B' },
              ]}
              data={[
                { a: 'one', b: 1 },
                { a: 'two', b: 2 },
              ]}
              pin
            />
          </Box>
        ))}
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('select', () => {
    const onSelect = jest.fn();
    const { container, getByLabelText } = render(
      <Grommet>
        <DataTable
          columns={[{ property: 'a', header: 'A' }]}
          data={[{ a: 'alpha' }, { a: 'beta' }]}
          primaryKey="a"
          select={['alpha']}
          onSelect={onSelect}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByLabelText('select beta'));
    expect(onSelect).toBeCalledWith(expect.arrayContaining(['alpha', 'beta']));
    expect(container.firstChild).toMatchSnapshot();
  });

  test('custom theme', () => {
    const customTheme = {
      dataTable: {
        header: {
          background: 'skyblue',
          border: {
            color: 'brand',
            size: 'medium',
          },
          gap: 'none',
          pad: { horizontal: 'small', vertical: 'xsmall' },
          font: {
            weight: 'bold',
          },
          hover: {
            background: {
              color: 'light-2',
            },
          },
        },
        resize: {
          hover: {
            border: {
              color: 'red',
              side: 'end',
              size: 'xsmall',
            },
          },
        },
      },
    };

    const { container, getByLabelText } = render(
      <Grommet theme={customTheme}>
        <DataTable
          columns={[{ property: 'a', header: 'A' }]}
          data={[{ a: 'alpha' }, { a: 'beta' }]}
          primaryKey="a"
          select={['alpha']}
          sortable
          resizeable
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.mouseOver(getByLabelText('select beta'));
    expect(container.firstChild).toMatchSnapshot();
  });

  test('units', () => {
    const { container } = render(
      <Grommet>
        <DataTable
          columns={[
            { property: 'a', header: 'A', footer: 'Total' },
            { property: 'b', header: 'B', units: '(TiB)' },
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

  test('placeholder', () => {
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
          placeholder="test placeholder"
        />
        <DataTable
          columns={[
            { property: 'a', header: 'A' },
            { property: 'b', header: 'B' },
          ]}
          data={[
            { a: 'one', b: 1 },
            { a: 'two', b: 2 },
          ]}
          placeholder={<Text weight="bold">test placeholder</Text>}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('should paginate', () => {
    const { container, getAllByText } = render(
      <Grommet>
        <DataTable
          columns={[
            { property: 'a', header: 'A' },
            { property: 'b', header: 'B' },
          ]}
          data={DATA}
          paginate
        />
      </Grommet>,
    );

    const results = getAllByText('entry', { exact: false });
    // default DataTable step 50
    expect(results.length).toEqual(50);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('should apply pagination styling', () => {
    const { container } = render(
      <Grommet>
        <DataTable
          columns={[
            { property: 'a', header: 'A' },
            { property: 'b', header: 'B' },
          ]}
          data={DATA}
          paginate={{ background: 'red', margin: 'large' }}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('should show correct item index when "show" is a number', () => {
    const show = 15;
    const { container, getByText } = render(
      <Grommet>
        <DataTable
          columns={[
            { property: 'a', header: 'A' },
            { property: 'b', header: 'B' },
          ]}
          data={DATA}
          paginate
          show={show}
        />
      </Grommet>,
    );

    const result = getByText(`entry-${show}`);
    expect(result).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('should show correct page when "show" is { page: # }', () => {
    const desiredPage = 2;
    const { container } = render(
      <Grommet>
        <DataTable
          columns={[
            { property: 'a', header: 'A' },
            { property: 'b', header: 'B' },
          ]}
          data={DATA}
          paginate
          show={{ page: desiredPage }}
        />
      </Grommet>,
    );

    const activePage = container.querySelector(`[aria-current="page"]`)
      .innerHTML;

    expect(activePage).toEqual(`${desiredPage}`);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render correct num items per page (step)', () => {
    const step = 14;
    const { container, getAllByText } = render(
      <Grommet>
        <DataTable
          columns={[
            { property: 'a', header: 'A' },
            { property: 'b', header: 'B' },
          ]}
          data={DATA}
          paginate
          step={step}
        />
      </Grommet>,
    );

    const results = getAllByText('entry', { exact: false });

    expect(results.length).toEqual(step);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render new data when page changes', () => {
    const { container, getByLabelText } = render(
      <Grommet>
        <DataTable
          columns={[
            { property: 'a', header: 'A' },
            { property: 'b', header: 'B' },
          ]}
          data={DATA}
          paginate
        />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByLabelText('Go to next page'));

    expect(container.firstChild).toMatchSnapshot();
  });
});
