import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import 'jest-styled-components';

import { Grommet } from '../../Grommet';
import { DataTable } from '../../DataTable';
import { Data } from '..';

const data = [
  { name: 'aa', enabled: true, sub: { note: 'ZZ' } },
  { name: 'bb', enabled: false, sub: { note: 'YY' } },
  { name: 'cc', sub: {} },
  { name: 'dd' },
];

const data2 = [
  { name: 'aa', enabled: true },
  { name: 'bb', enabled: false },
  { name: 'dd' },
];

describe('Data', () => {
  test('renders', () => {
    const { container } = render(
      <Grommet>
        <Data data={data} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('properties', () => {
    const { container } = render(
      <Grommet>
        <Data data={data} properties={{ name: { label: 'Name' } }} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('toolbar', () => {
    const { container } = render(
      <Grommet>
        <Data data={data} toolbar />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('view', () => {
    const { container } = render(
      <Grommet>
        <Data data={data} view={{ search: '', properties: {} }} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('view search', () => {
    const { container } = render(
      <Grommet>
        <Data
          data={data}
          properties={{
            name: { label: 'Name' },
            'sub.note': { label: 'Note' },
          }}
          view={{ search: { text: 'a' } }}
          toolbar
        >
          <DataTable />
        </Data>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('view search property', () => {
    const { container } = render(
      <Grommet>
        <Data
          data={data}
          properties={{
            name: { label: 'Name' },
            'sub.note': { label: 'Note' },
          }}
          view={{ search: { text: 'a', property: 'name' } }}
          toolbar
        >
          <DataTable />
        </Data>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('view search all', () => {
    const { container } = render(
      <Grommet>
        <Data data={data2} view={{ search: { text: 'a' } }} toolbar>
          <DataTable />
        </Data>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('view property', () => {
    const { container } = render(
      <Grommet>
        <Data
          data={data}
          properties={{
            name: { label: 'Name' },
            'sub.note': { label: 'Note' },
          }}
          view={{
            properties: { enabled: [true] },
          }}
          toolbar
        >
          <DataTable />
        </Data>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('view sort', () => {
    const { container } = render(
      <Grommet>
        <Data
          data={data}
          properties={{
            name: { label: 'Name' },
            'sub.note': { label: 'Note' },
          }}
          view={{
            sort: { property: 'sub.note', direction: 'desc' },
          }}
          toolbar
        >
          <DataTable />
        </Data>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('view all', () => {
    const { container } = render(
      <Grommet>
        <Data
          data={data}
          properties={{
            name: { label: 'Name' },
            'sub.note': { label: 'Note' },
          }}
          view={{
            search: { text: 'a' },
            properties: { enabled: [true] },
            sort: { property: 'name', direction: 'desc' },
          }}
          toolbar
        >
          <DataTable />
        </Data>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('uncontrolled search', () => {
    const { getByRole, getByText, queryByText, container } = render(
      <Grommet>
        <Data
          data={data}
          properties={{ name: { label: 'Name' } }}
          view={{ search: { text: '' }, properties: {} }}
          toolbar
          updateOn="change"
        >
          <DataTable />
        </Data>
      </Grommet>,
    );
    expect(getByText('bb')).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.change(getByRole('searchbox'), {
      target: { value: 'a' },
    });
    expect(queryByText('bb')).toBeFalsy();
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByText('Clear filters'));
    expect(getByText('bb')).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('controlled search', () => {
    const onView = jest.fn();
    const { getByRole, getByText, container } = render(
      <Grommet>
        <Data
          data={data}
          properties={{ name: { label: 'Name' } }}
          view={{ search: { text: '' }, properties: {} }}
          toolbar
          updateOn="change"
          onView={onView}
        >
          <DataTable />
        </Data>
      </Grommet>,
    );
    expect(getByText('bb')).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.change(getByRole('searchbox'), {
      target: { value: 'a' },
    });
    expect(getByText('bb')).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();
    expect(onView).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        search: { text: 'a' },
        properties: {},
      }),
    );
    fireEvent.click(getByText('Clear filters'));
    expect(container.firstChild).toMatchSnapshot();
    expect(onView).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        search: { text: '' },
        properties: {},
      }),
    );
  });
});
