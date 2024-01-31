import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import 'jest-styled-components';

import { Grommet } from '../../Grommet';
import { DataFilter } from '../../DataFilter';
import { DataFilters } from '../../DataFilters';
import { DataTable } from '../../DataTable';
import { Pagination } from '../../Pagination';
import { Toolbar } from '../../Toolbar';
import { Data } from '..';
import { createPortal, expectPortal } from '../../../utils/portal';
const DEBOUNCE_TIMEOUT = 300;

// asserts that AnnounceContext aria-live region and visible DataSummary each have this text
const expectDataSummary = (message: string) =>
  expect(screen.getAllByText(message)).toHaveLength(2);

const data = [
  {
    name: 'aa',
    enabled: true,
    rating: 2.3,
    sub: { note: 'ZZ' },
    tags: ['qa', 'staging', 'prod'],
  },
  {
    name: 'bb',
    enabled: false,
    rating: 4.3,
    sub: { note: 'YY' },
    tags: ['qa', 'staging'],
  },
  { name: 'cc', sub: {}, tags: ['qa'] },
  { name: 'dd' },
];

describe('Data', () => {
  window.scrollTo = jest.fn();
  beforeEach(createPortal);

  test('renders', () => {
    const { container } = render(
      <Grommet>
        <Data data={data} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('toolbar', () => {
    const { container } = render(
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

    expectDataSummary('4 items');
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

    expectDataSummary('1 result of 4 items');
    expect(getByText('aa')).toBeTruthy();
    expect(queryByText('bb')).toBeFalsy();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('view property option', () => {
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

    expectDataSummary('1 result of 4 items');
    expect(getByText('aa')).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('view property range', () => {
    const { getByText, container } = render(
      <Grommet>
        <Data
          data={data}
          properties={{
            name: { label: 'Name' },
            'sub.note': { label: 'Note' },
            rating: { label: 'Rating', range: { min: 0, max: 5 } },
          }}
          view={{
            properties: { rating: { min: 3.0, max: 5.0 } },
          }}
          toolbar
        >
          <DataTable />
        </Data>
      </Grommet>,
    );

    expectDataSummary('1 result of 4 items');
    expect(getByText('bb')).toBeTruthy();
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

    expectDataSummary('4 items');
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

    expectDataSummary('1 result of 4 items');
    expect(getByText('aa')).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('messages', () => {
    const { getByText, container } = render(
      <Grommet>
        <Data
          data={data}
          messages={{
            dataSummary: {
              total: '{total} things',
            },
          }}
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

    expectDataSummary('4 things');
    expect(getByText('aa')).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('uncontrolled search', () => {
    jest.useFakeTimers();
    const { getByRole, getByText, queryByText, container } = render(
      <Grommet>
        <Data
          data={data}
          properties={{ name: { label: 'Name' } }}
          view={{ search: '', properties: {} }}
          toolbar
        >
          <DataTable />
        </Data>
      </Grommet>,
    );

    expectDataSummary('4 items');
    expect(getByText('bb')).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.change(getByRole('searchbox'), {
      target: { value: 'a' },
    });
    act(() => {
      jest.advanceTimersByTime(DEBOUNCE_TIMEOUT);
    });
    expectDataSummary('1 result of 4 items');
    expect(queryByText('bb')).toBeFalsy();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('controlled search', () => {
    jest.useFakeTimers();
    const onView = jest.fn();
    const { getByRole, getByText, container } = render(
      <Grommet>
        <Data
          data={data}
          properties={{ name: { label: 'Name' } }}
          view={{ search: '', properties: {} }}
          toolbar
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

    act(() => {
      jest.advanceTimersByTime(DEBOUNCE_TIMEOUT);
    });
    expect(onView).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        search: 'a',
        properties: {},
      }),
    );
  });

  test('toolbar search', () => {
    const { container } = render(
      <Grommet>
        <Data
          data={data}
          properties={{ name: { label: 'Name' } }}
          view={{
            properties: {},
            search: '',
            sort: { property: 'name', direction: 'asc' },
          }}
          toolbar="search"
        >
          <DataTable />
        </Data>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('toolbar filters', () => {
    const { container } = render(
      <Grommet>
        <Data
          data={data}
          properties={{ name: { label: 'Name' } }}
          view={{
            properties: {},
            search: '',
            sort: { property: 'name', direction: 'asc' },
          }}
          toolbar="filters"
        >
          <DataTable />
        </Data>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('pagination', () => {
    const { container } = render(
      <Grommet>
        <Data
          data={[...data].slice(2, 4)}
          total={data.length}
          properties={{ name: { label: 'Name' } }}
          onView={() => {}}
          view={{ page: 2, step: 2 }}
        >
          <DataTable />
          <Pagination />
        </Data>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('pagination step', () => {
    const { container } = render(
      <Grommet>
        <Data
          data={[...data].slice(2, 4)}
          total={data.length}
          properties={{ name: { label: 'Name' } }}
          onView={() => {}}
        >
          <DataTable />
          <Pagination step={2} page={2} />
        </Data>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('onView', () => {
    const onView = jest.fn();
    const { container } = render(
      <Grommet>
        <Data data={data} onView={onView}>
          <DataFilters />
          <DataTable />
        </Data>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('properties when property is an array', () => {
    const { asFragment } = render(
      <Grommet>
        <Data
          data={data}
          toolbar
          properties={{
            name: { label: 'Name' },
            'sub.note': { label: 'Note' },
            tags: {
              label: 'Tags',
              options: [
                { label: '01 - Development', value: 'dev' },
                { label: '02 - QA', value: 'qa' },
                { label: '03 - Staging', value: 'staging' },
                { label: '04 - Production', value: 'prod' },
              ],
            },
          }}
        >
          <DataTable
            columns={[
              { property: 'name', header: 'Name' },
              { property: 'sub.note', header: 'Note' },
              {
                property: 'tags',
                header: 'Tags',
                render: ({ tags }) => (tags ? tags.join(', ') : null),
              },
            ]}
          />
        </Data>
      </Grommet>,
    );

    expect(asFragment()).toMatchSnapshot();
    const filtersButton = screen.getByRole('button', { name: 'Open filters' });
    expect(filtersButton).toBeTruthy();
    fireEvent.click(filtersButton);
    expect(screen.getByRole('button', { name: 'Apply filters' })).toBeTruthy();
    expectPortal('data--filters-control').toMatchSnapshot();
  });

  test('should include badge based on view', () => {
    render(
      <Grommet>
        <Data
          data={data}
          view={{
            properties: { rating: { min: 3, max: 5 }, enabled: [true] },
          }}
          toolbar="filters"
        >
          <DataTable />
        </Data>
      </Grommet>,
    );

    const filterButton = screen.getByRole('button', {
      name: 'Open filters, 2 filters applied',
    });

    expect(filterButton).toBeTruthy();
  });

  test('should not include properties with badge: false in badge count', () => {
    render(
      <Grommet>
        <Data
          data={data}
          properties={{
            name: {
              badge: false,
            },
            enabled: {},
            rating: {},
          }}
        >
          <Toolbar>
            <DataFilter property="name" />
            <DataFilters layer>
              <DataFilter property="enabled" />
              <DataFilter property="rating" />
            </DataFilters>
          </Toolbar>
        </Data>
      </Grommet>,
    );

    const checkBox = screen.getByText('aa');
    fireEvent.click(checkBox);

    // no badge should be applied, so expect default tip
    const filterButton = screen.getByRole('button', {
      name: 'Open filters',
    });

    expect(filterButton).toBeTruthy();
  });
});
