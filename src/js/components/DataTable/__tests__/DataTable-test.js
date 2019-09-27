import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { cleanup, render, fireEvent } from '@testing-library/react';

import { Grommet } from '../../Grommet';
import { DataTable } from '..';

describe('DataTable', () => {
  afterEach(cleanup);

  test('empty', () => {
    const component = renderer.create(
      <Grommet>
        <DataTable />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('basic', () => {
    const component = renderer.create(
      <Grommet>
        <DataTable
          columns={[
            { property: 'a', header: 'A' },
            { property: 'b', header: 'B' },
          ]}
          data={[{ a: 'one', b: 1 }, { a: 'two', b: 2 }]}
        />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('paths', () => {
    const component = renderer.create(
      <Grommet>
        <DataTable
          columns={[
            { property: 'a', header: 'A' },
            { property: 'b.c', header: 'B' },
          ]}
          data={[{ a: 'one', b: { c: 1 } }, { a: 'two', b: { c: 2 } }]}
        />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('primaryKey', () => {
    const component = renderer.create(
      <Grommet>
        <DataTable
          columns={[
            { property: 'a', header: 'A' },
            { property: 'b', header: 'B' },
          ]}
          data={[{ a: 'one', b: 1 }, { a: 'two', b: 2 }]}
          primaryKey="b"
        />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('footer', () => {
    const component = renderer.create(
      <Grommet>
        <DataTable
          columns={[
            { property: 'a', header: 'A', footer: 'Total' },
            { property: 'b', header: 'B' },
          ]}
          data={[{ a: 'one', b: 1 }, { a: 'two', b: 2 }]}
        />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('sort', () => {
    const { container, getByText } = render(
      <Grommet>
        <DataTable
          columns={[
            { property: 'a', header: 'A' },
            { property: 'b', header: 'B' },
          ]}
          data={[{ a: 'zero', b: 0 }, { a: 'one', b: 1 }, { a: 'two', b: 2 }]}
          sortable
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();

    const headerCell = getByText('A');
    fireEvent.click(headerCell, {});
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
    const component = renderer.create(
      <Grommet>
        <DataTable
          columns={[
            { property: 'a', header: 'A' },
            { property: 'b', header: 'B' },
          ]}
          data={[{ a: 'one', b: 1 }, { a: 'two', b: 2 }]}
          resizeable
        />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('aggregate', () => {
    const component = renderer.create(
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
          data={[{ a: 'one', b: 1 }, { a: 'two', b: 2 }]}
        />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
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
    const component = renderer.create(
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
            data={[{ a: 'one', b: 1 }, { a: 'two', b: 2 }]}
            background={background}
          />
        ))}
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('border', () => {
    const component = renderer.create(
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
            data={[{ a: 'one', b: 1 }, { a: 'two', b: 2 }]}
            border={border}
          />
        ))}
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('pad', () => {
    const component = renderer.create(
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
            data={[{ a: 'one', b: 1 }, { a: 'two', b: 2 }]}
            pad={pad}
          />
        ))}
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('rowProps', () => {
    const component = renderer.create(
      <Grommet>
        <DataTable
          columns={[
            { property: 'a', header: 'A', footer: 'Total' },
            { property: 'b', header: 'B' },
          ]}
          data={[{ a: 'one', b: 1 }, { a: 'two', b: 2 }]}
          rowProps={{
            one: { background: 'accent-1', border: 'bottom', pad: 'large' },
          }}
        />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
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
    const component = renderer.create(
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
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
