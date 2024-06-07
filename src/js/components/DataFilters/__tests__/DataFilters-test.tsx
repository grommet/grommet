import React from 'react';
import { act, render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import 'jest-styled-components';

import { Data } from '../../Data';
import { DataTable } from '../../DataTable';
import { Grommet } from '../../Grommet';
import { List } from '../../List';
import { DataFilters } from '..';
import { createPortal, expectPortal } from '../../../utils/portal';

const data = [{ name: 'a' }, { name: 'b' }];

describe('DataFilters', () => {
  window.scrollTo = jest.fn();
  beforeEach(createPortal);

  test('renders', () => {
    const { container } = render(
      <Grommet>
        <Data data={data}>
          <DataFilters />
        </Data>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('drop', async () => {
    const user = userEvent.setup();

    const { container, getByRole } = render(
      <Grommet>
        <Data id="test-data" data={data}>
          <DataFilters drop />
        </Data>
      </Grommet>,
    );

    expect(getByRole('button', { name: 'Open filters' })).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();

    await user.click(getByRole('button', { name: 'Open filters' }));

    // snapshot on drop
    expectPortal('test-data--filters-control').toMatchSnapshot();
  });

  test('drop badge', () => {
    const { container } = render(
      <Grommet>
        <Data data={data} view={{ search: 'a', properties: { name: ['a'] } }}>
          <DataFilters drop />
        </Data>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('layer', async () => {
    const user = userEvent.setup();

    const { container, getByRole } = render(
      <Grommet>
        <Data id="test-data" data={data}>
          <DataFilters layer />
        </Data>
      </Grommet>,
    );

    expect(getByRole('button', { name: 'Open filters' })).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();

    await user.click(getByRole('button', { name: 'Open filters' }));

    // snapshot on layer
    expectPortal('test-data--filters-layer').toMatchSnapshot();
  });

  test('properties array', () => {
    const { container } = render(
      <Grommet>
        <Data data={data} properties={['name']}>
          <DataFilters />
        </Data>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('properties object', () => {
    const { container } = render(
      <Grommet>
        <Data data={data} properties={{ name: {} }}>
          <DataFilters />
        </Data>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should display all filter options regardless of result set', () => {
    const filters = ['a', 'blue', 'b', 'red'];
    const { asFragment } = render(
      <Grommet>
        <Data
          data={[
            { name: filters[0], color: filters[1] },
            { name: filters[2], color: filters[3] },
          ]}
        >
          <DataFilters />
          <List />
        </Data>
      </Grommet>,
    );

    expect(asFragment()).toMatchSnapshot();

    const applyFiltersButton = screen.getByRole('button', {
      name: 'Apply filters',
    });
    const results = screen.getByRole('list');

    // expect all filters to be present
    filters.forEach((filter) => {
      expect(screen.getByRole('checkbox', { name: filter })).toBeTruthy();
    });

    // expect all results to be present
    expect(results).toHaveTextContent('a');
    expect(results).toHaveTextContent('b');
    fireEvent.click(screen.getByRole('checkbox', { name: 'a' }));
    fireEvent.click(applyFiltersButton);

    // expect only 'a' to be present
    expect(results).toHaveTextContent('a');
    expect(results).not.toHaveTextContent('b');
    fireEvent.click(screen.getByRole('checkbox', { name: 'red' }));
    fireEvent.click(applyFiltersButton);

    // expect no results to be present
    expect(results).not.toHaveTextContent('a');
    expect(results).not.toHaveTextContent('b');

    // expect all filters to be present
    filters.forEach((filter) => {
      expect(screen.getByRole('checkbox', { name: filter })).toBeTruthy();
    });
  });

  test('clear', () => {
    const { container } = render(
      <Grommet>
        <Data data={data} view={{ search: 'a', properties: { name: ['a'] } }}>
          <DataFilters />
        </Data>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('sub objects', () => {
    const { container } = render(
      <Grommet>
        <Data
          data={[
            { location: { city: 'Paris', lat: 48 } },
            { location: { city: 'Sydney', lat: -33 } },
          ]}
          properties={{
            'location.city': { label: 'City' },
            'location.lat': { label: 'Latitude', range: { min: -90, max: 90 } },
          }}
          view={{
            properties: {
              'location.city': ['Paris'],
              'location.lat': { min: 10, max: 90 },
            },
          }}
        >
          <DataFilters />
          <DataTable
            columns={[
              { property: 'location.city', header: 'City' },
              { property: 'location.lat', header: 'Latitude' },
            ]}
          />
        </Data>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('sub objects with rangeSelector', () => {
    jest.useFakeTimers();
    const { asFragment } = render(
      <Grommet>
        <Data
          data={[{ location: { lat: 48 } }, { location: { lat: -33 } }]}
          properties={{
            'location.lat': { label: 'Latitude', range: { min: -90, max: 90 } },
          }}
        >
          <DataFilters layer />
        </Data>
      </Grommet>,
    );
    const { getByRole } = screen;

    // find open filters button and click open
    const filterButton = getByRole('button', { name: 'Open filters' });
    expect(filterButton).toBeTruthy();
    fireEvent.click(filterButton);

    // move rangeselector
    const lowerBound = screen.getByRole('slider', { name: 'Lower Bounds' });
    act(() => {
      lowerBound.focus();
    });
    fireEvent.keyDown(lowerBound, { key: 'Right', keyCode: 39 });

    // click Apply Filters button
    const applyFiltersButton = getByRole('button', { name: 'Apply filters' });
    expect(applyFiltersButton).toBeTruthy();
    fireEvent.click(applyFiltersButton);

    // should be 1 filter applied
    const updatedFilterButton = getByRole('button', {
      name: 'Open filters, 1 filter applied',
    });

    expect(updatedFilterButton).toBeTruthy();
    // snapshot on selected filter
    expect(asFragment()).toMatchSnapshot();

    fireEvent.click(updatedFilterButton);
    // allow layer to open
    act(() => {
      jest.advanceTimersByTime(500);
    });
    // move rangeselector back to min
    const updatedLowerBound = screen.getByRole('slider', {
      name: 'Lower Bounds',
    });
    act(() => {
      updatedLowerBound.focus();
    });
    fireEvent.keyDown(updatedLowerBound, { key: 'Left', keyCode: 37 });
    fireEvent.click(getByRole('button', { name: 'Apply filters' }));

    // allow layer to close
    act(() => {
      jest.advanceTimersByTime(500);
    });
    const updatedOpenFiltersButton = getByRole('button', {
      name: 'Open filters',
    });
    // badge should be cleared, so filter button should be in original state
    expect(updatedOpenFiltersButton).toBeTruthy();
  });

  test('should not badge when RangeSelector returns to min/max', () => {
    jest.useFakeTimers();
    const { asFragment } = render(
      <Grommet>
        <Data
          data={[{ location: { lat: 48 } }, { location: { lat: -33 } }]}
          properties={{
            'location.lat': { label: 'Latitude', range: { min: -90, max: 90 } },
          }}
        >
          <DataFilters layer />
        </Data>
      </Grommet>,
    );
    const { getByRole } = screen;

    // find open filters button and click open
    const filterButton = getByRole('button', { name: 'Open filters' });
    expect(filterButton).toBeTruthy();
    fireEvent.click(filterButton);

    // move rangeselector
    const lowerBound = screen.getByRole('slider', { name: 'Lower Bounds' });
    act(() => {
      lowerBound.focus();
    });
    fireEvent.keyDown(lowerBound, { key: 'Right', keyCode: 39 });

    // click Apply Filters button
    const applyFiltersButton = getByRole('button', { name: 'Apply filters' });
    expect(applyFiltersButton).toBeTruthy();
    fireEvent.click(applyFiltersButton);

    // should be 1 filter applied
    const updatedFilterButton = getByRole('button', {
      name: 'Open filters, 1 filter applied',
    });

    fireEvent.click(updatedFilterButton);

    // allow layer animation to finish
    act(() => {
      jest.advanceTimersByTime(500);
    });
    // move rangeselector
    const updatedLowerBound = screen.getByRole('slider', {
      name: 'Lower Bounds',
    });
    act(() => {
      updatedLowerBound.focus();
    });
    fireEvent.keyDown(updatedLowerBound, { key: 'Left', keyCode: 37 });
    fireEvent.click(getByRole('button', { name: 'Apply filters' }));

    // filter button should be at original state, no badge
    expect(getByRole('button', { name: 'Open filters' })).toBeTruthy();
    expect(asFragment()).toMatchSnapshot();
  });
});
