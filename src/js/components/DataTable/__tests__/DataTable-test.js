import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { cleanup, render, Simulate } from 'react-testing-library';

import { Grommet } from '../../Grommet';
import { DataTable } from '../';

describe('DataTable', () => {
  afterEach(cleanup);

  test('empty', () => {
    const component = renderer.create(
      <Grommet>
        <DataTable />
      </Grommet>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('basic', () => {
    const component = renderer.create(
      <Grommet>
        <DataTable
          columns={[
            { property: 'a', label: 'A' },
            { property: 'b', label: 'B' },
          ]}
          data={[
            { a: 'one', b: 1 },
            { a: 'two', b: 2 },
          ]}
        />
      </Grommet>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('footer', () => {
    const component = renderer.create(
      <Grommet>
        <DataTable
          columns={[
            { property: 'a', label: 'A', footer: 'Total' },
            { property: 'b', label: 'B' },
          ]}
          data={[
            { a: 'one', b: 1 },
            { a: 'two', b: 2 },
          ]}
        />
      </Grommet>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('sort', () => {
    const { container, getByText } = render(
      <Grommet>
        <DataTable
          columns={[
            { property: 'a', label: 'A' },
            { property: 'b', label: 'B' },
          ]}
          data={[
            { a: 'zero', b: 0 },
            { a: 'one', b: 1 },
            { a: 'two', b: 2 },
          ]}
          sortable={true}
        />
      </Grommet>
    );
    expect(container.firstChild).toMatchSnapshot();

    const headerCell = getByText('A');
    Simulate.click(headerCell, {});
    expect(container.firstChild).toMatchSnapshot();
  });

  test('resizeable', () => {
    const component = renderer.create(
      <Grommet>
        <DataTable
          columns={[
            { property: 'a', label: 'A' },
            { property: 'b', label: 'B' },
          ]}
          data={[
            { a: 'one', b: 1 },
            { a: 'two', b: 2 },
          ]}
          resizeable={true}
        />
      </Grommet>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('aggregate', () => {
    const component = renderer.create(
      <Grommet>
        <DataTable
          columns={[
            { property: 'a', label: 'A' },
            { property: 'b', label: 'B', aggregate: 'sum', footer: { aggregate: true } },
          ]}
          data={[
            { a: 'one', b: 1 },
            { a: 'two', b: 2 },
          ]}
        />
      </Grommet>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('groupBy', () => {
    const { container, getByText } = render(
      <Grommet>
        <DataTable
          columns={[
            { property: 'a', label: 'A' },
            { property: 'b', label: 'B' },
          ]}
          data={[
            { a: 'one', b: 1.1 },
            { a: 'one', b: 1.2 },
            { a: 'two', b: 2.1 },
            { a: 'two', b: 2.2 },
          ]}
          groupBy='a'
        />
      </Grommet>
    );
    expect(container.firstChild).toMatchSnapshot();

    const headerCell = getByText('A');
    Simulate.click(headerCell, {});
    expect(container.firstChild).toMatchSnapshot();
  });
});
