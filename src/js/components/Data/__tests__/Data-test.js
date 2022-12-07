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

describe('Data', () => {
  test('renders', () => {
    const { container } = render(
      <Grommet>
        <Data data={data} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('toolbar', () => {
    const { getByText, container } = render(
      <Grommet>
        <Data
          data={data}
          properties={{
            name: { label: 'Name' },
            'sub.note': { label: 'Note' },
          }}
          toolbar
        >
          <DataTable />
        </Data>
      </Grommet>,
    );

    expect(getByText('4 items')).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('view', () => {
    const { getByText, container } = render(
      <Grommet>
        <Data
          data={data}
          properties={{
            name: { label: 'Name' },
            'sub.note': { label: 'Note' },
          }}
          view={{ search: '', properties: {} }}
        >
          <DataTable />
        </Data>
      </Grommet>,
    );

    expect(getByText('bb')).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('view search', () => {
    const { getByText, queryByText, container } = render(
      <Grommet>
        <Data
          data={data}
          properties={{
            name: { label: 'Name' },
            'sub.note': { label: 'Note' },
          }}
          view={{ search: 'a' }}
          toolbar
        >
          <DataTable />
        </Data>
      </Grommet>,
    );

    expect(getByText('1 items')).toBeTruthy();
    expect(getByText('aa')).toBeTruthy();
    expect(queryByText('bb')).toBeFalsy();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('view property', () => {
    const { getByText, container } = render(
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

    expect(getByText('1 items')).toBeTruthy();
    expect(getByText('aa')).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('view sort', () => {
    const { getByText, container } = render(
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

    expect(getByText('4 items')).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('view all', () => {
    const { getByText, container } = render(
      <Grommet>
        <Data
          data={data}
          properties={{
            name: { label: 'Name' },
            'sub.note': { label: 'Note' },
          }}
          view={{
            search: 'a',
            properties: { enabled: [true] },
            sort: { property: 'name', direction: 'desc' },
          }}
          toolbar
        >
          <DataTable />
        </Data>
      </Grommet>,
    );

    expect(getByText('1 items')).toBeTruthy();
    expect(getByText('aa')).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('uncontrolled search', () => {
    const { getByRole, getByText, queryByText, container } = render(
      <Grommet>
        <Data
          data={data}
          properties={{ name: { label: 'Name' } }}
          view={{ search: '', properties: {} }}
          toolbar
          updateOn="change"
        >
          <DataTable />
        </Data>
      </Grommet>,
    );

    expect(getByText('4 items')).toBeTruthy();
    expect(getByText('bb')).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.change(getByRole('searchbox'), {
      target: { value: 'a' },
    });
    expect(getByText('1 items')).toBeTruthy();
    expect(queryByText('bb')).toBeFalsy();
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.click(getByText('Clear filters'));
    expect(getByText('4 items')).toBeTruthy();
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
          view={{ search: '', properties: {} }}
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
        search: 'a',
        properties: {},
      }),
    );

    fireEvent.click(getByText('Clear filters'));
    expect(container.firstChild).toMatchSnapshot();
    expect(onView).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        search: '',
        properties: {},
      }),
    );
  });
});
